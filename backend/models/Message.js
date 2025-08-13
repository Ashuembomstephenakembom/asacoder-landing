// Message model for storing contact form submissions
// This will be used if we decide to store messages in a database

class Message {
  constructor(name, email, message) {
    this.name = name;
    this.email = email;
    this.message = message;
    this.timestamp = new Date();
  }

  // Method to validate the message data
  validate() {
    const errors = [];
    
    if (!this.name || this.name.trim().length === 0) {
      errors.push('Name is required');
    }
    
    if (!this.email || !this.isValidEmail(this.email)) {
      errors.push('Valid email is required');
    }
    
    if (!this.message || this.message.trim().length === 0) {
      errors.push('Message is required');
    }
    
    return errors;
  }

  // Helper method to validate email format
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

module.exports = Message;
