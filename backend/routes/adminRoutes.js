const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const { 
  validateAdminReply, 
  validateStatusUpdate, 
  validateSearchParams, 
  validateBulkAction,
  sanitizeInputs 
} = require('../middleware/validation');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'stephen@asaofficial.org',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Middleware to check admin authentication (simple password check)
const authenticateAdmin = (req, res, next) => {
  const adminPassword = req.headers['admin-password'];
  
  if (!adminPassword || adminPassword !== 'asacoder2025') {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized access'
    });
  }
  
  next();
};

// GET /api/admin/contacts - Get all contact messages
router.get('/contacts', authenticateAdmin, sanitizeInputs, validateSearchParams, async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (!Contact.db || !Contact.db.db) {
      // Return demo data if database is not available
      const demoMessages = [
        {
          _id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Hi, I need help with a web development project.',
          status: 'new',
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          message: 'Interested in forex training. Please contact me.',
          status: 'read',
          createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          _id: '3',
          name: 'Mike Johnson',
          email: 'mike@example.com',
          message: 'Looking for digital marketing services for my business.',
          status: 'replied',
          createdAt: new Date(Date.now() - 172800000).toISOString()
        }
      ];
      
      return res.json({
        success: true,
        data: demoMessages,
        total: demoMessages.length
      });
    }

    const { status, search, sort = 'newest', limit = 50 } = req.query;
    
    // Build query
    let query = {};
    
    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Build sort object
    let sortObject = {};
    switch (sort) {
      case 'newest':
        sortObject = { createdAt: -1 };
        break;
      case 'oldest':
        sortObject = { createdAt: 1 };
        break;
      case 'name':
        sortObject = { name: 1 };
        break;
      default:
        sortObject = { createdAt: -1 };
    }
    
    const messages = await Contact.find(query)
      .sort(sortObject)
      .limit(parseInt(limit))
      .lean();
    
    res.json({
      success: true,
      data: messages,
      total: messages.length
    });
    
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact messages'
    });
  }
});

// GET /api/admin/contacts/:id - Get specific contact message
router.get('/contacts/:id', authenticateAdmin, async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }
    
    res.json({
      success: true,
      data: message
    });
    
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact message'
    });
  }
});

// PATCH /api/admin/contacts/:id/status - Update message status
router.patch('/contacts/:id/status', authenticateAdmin, sanitizeInputs, validateStatusUpdate, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be new, read, or replied'
      });
    }
    
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }
    
    res.json({
      success: true,
      data: message,
      message: 'Status updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating message status'
    });
  }
});

// DELETE /api/admin/contacts/:id - Delete contact message
router.delete('/contacts/:id', authenticateAdmin, async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting contact message'
    });
  }
});

// POST /api/admin/reply - Send reply email
router.post('/reply', authenticateAdmin, sanitizeInputs, validateAdminReply, async (req, res) => {
  try {
    const { messageId, replyText, originalEmail, originalName } = req.body;
    
    if (!messageId || !replyText || !originalEmail) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
    
    // Find the original message
    const originalMessage = await Contact.findById(messageId);
    if (!originalMessage) {
      return res.status(404).json({
        success: false,
        message: 'Original message not found'
      });
    }
    
    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'stephen@asaofficial.org',
      to: originalEmail,
      subject: 'Re: Your message to ASACODER',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">ASACODER</h1>
            <p style="margin: 10px 0 0 0;">Digital Solutions</p>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${originalName || 'there'},</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Thank you for reaching out to us. Here is our response to your message:
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;">
              <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${replyText}</p>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              If you have any further questions, please don't hesitate to contact us again.
            </p>
            
            <div style="background: #e9ecef; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Your Original Message:</h3>
              <p style="color: #666; line-height: 1.6; margin: 0; font-style: italic;">${originalMessage.message}</p>
            </div>
          </div>
          
          <div style="background: #333; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0 0 10px 0;"><strong>ASACODER</strong></p>
            <p style="margin: 0 0 5px 0;">📧 stephen@asaofficial.org</p>
            <p style="margin: 0 0 5px 0;">📱 +237 653 180 273</p>
            <p style="margin: 0;">📍 Cameroon</p>
          </div>
        </div>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    // Update message status to replied
    await Contact.findByIdAndUpdate(messageId, { 
      status: 'replied',
      repliedAt: new Date()
    });
    
    res.json({
      success: true,
      message: 'Reply sent successfully'
    });
    
  } catch (error) {
    console.error('Error sending reply:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending reply email'
    });
  }
});

// GET /api/admin/stats - Get admin dashboard statistics
router.get('/stats', authenticateAdmin, async (req, res) => {
  try {
    const totalMessages = await Contact.countDocuments();
    const newMessages = await Contact.countDocuments({ status: 'new' });
    const readMessages = await Contact.countDocuments({ status: 'read' });
    const repliedMessages = await Contact.countDocuments({ status: 'replied' });
    
    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentMessages = await Contact.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });
    
    res.json({
      success: true,
      data: {
        total: totalMessages,
        new: newMessages,
        read: readMessages,
        replied: repliedMessages,
        recent: recentMessages
      }
    });
    
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics'
    });
  }
});

// POST /api/admin/bulk-action - Bulk actions (mark as read, delete multiple)
router.post('/bulk-action', authenticateAdmin, sanitizeInputs, validateBulkAction, async (req, res) => {
  try {
    const { action, messageIds } = req.body;
    
    if (!action || !messageIds || !Array.isArray(messageIds)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request parameters'
      });
    }
    
    let result;
    
    switch (action) {
      case 'mark-read':
        result = await Contact.updateMany(
          { _id: { $in: messageIds } },
          { status: 'read' }
        );
        break;
        
      case 'mark-replied':
        result = await Contact.updateMany(
          { _id: { $in: messageIds } },
          { status: 'replied' }
        );
        break;
        
      case 'delete':
        result = await Contact.deleteMany({ _id: { $in: messageIds } });
        break;
        
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid action'
        });
    }
    
    res.json({
      success: true,
      message: `Bulk action '${action}' completed successfully`,
      affected: result.modifiedCount || result.deletedCount
    });
    
  } catch (error) {
    console.error('Error performing bulk action:', error);
    res.status(500).json({
      success: false,
      message: 'Error performing bulk action'
    });
  }
});

module.exports = router;
