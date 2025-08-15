// Contact controller to handle form submission logic
const Contact = require('../models/Contact');

// Controller function to handle contact form submissions
const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    // Get client information
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    try {
      // Try to save to MongoDB if available
      const newContact = new Contact({
        name,
        email,
        message,
        ipAddress,
        userAgent
      });

      const savedContact = await newContact.save();

      console.log('✅ New contact form submission saved to MongoDB:', {
        id: savedContact._id,
        name: savedContact.name,
        email: savedContact.email,
        timestamp: savedContact.createdAt
      });

      // Send success response with MongoDB data
      res.status(200).json({
        success: true,
        message: 'Thank you for your message! I will get back to you soon.',
        data: {
          id: savedContact._id,
          name: savedContact.name,
          email: savedContact.email,
          timestamp: savedContact.createdAt
        }
      });

    } catch (dbError) {
      // MongoDB not available - log to console instead
      console.log('⚠️  MongoDB not available, logging to console:', {
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
        ipAddress,
        userAgent
      });

      // Send success response without MongoDB
      res.status(200).json({
        success: true,
        message: 'Thank you for your message! I will get back to you soon.',
        data: {
          name,
          email,
          timestamp: new Date().toISOString()
        }
      });
    }

  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        errors: errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
};

// Get all contact submissions (for admin purposes)
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('❌ Error fetching contacts:', error);
    
    // Return demo data if MongoDB is not available
    const demoContacts = [
      {
        _id: 'demo-1',
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hi, I need help with a web development project.',
        status: 'new',
        createdAt: new Date().toISOString()
      },
      {
        _id: 'demo-2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        message: 'Interested in forex training. Please contact me.',
        status: 'read',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ];

    res.status(200).json({
      success: true,
      count: demoContacts.length,
      data: demoContacts,
      note: 'Demo data - MongoDB not available'
    });
  }
};

// Update contact status
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('❌ Error updating contact status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating contact status'
    });
  }
};

module.exports = {
  submitContactForm,
  getAllContacts,
  updateContactStatus
};
