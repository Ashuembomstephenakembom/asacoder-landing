// Input validation middleware for ASACODER landing page
// Uses express-validator to validate and sanitize all inputs

const { body, param, query, validationResult } = require('express-validator');

// Validation result handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

// Contact form validation rules
const validateContactForm = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s\-'\.]+$/)
    .withMessage('Name can only contain letters, spaces, hyphens, apostrophes, and periods')
    .escape(),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .isLength({ max: 254 })
    .withMessage('Email address is too long'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 10000 })
    .withMessage('Message must be between 10 and 10,000 characters')
    .escape(),
  
  handleValidationErrors
];

// Admin authentication validation
const validateAdminAuth = [
  body('password')
    .trim()
    .isLength({ min: 8, max: 128 })
    .withMessage('Password must be between 8 and 128 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  handleValidationErrors
];

// Admin reply validation
const validateAdminReply = [
  body('messageId')
    .trim()
    .isMongoId()
    .withMessage('Invalid message ID'),
  
  body('replyText')
    .trim()
    .isLength({ min: 5, max: 10000 })
    .withMessage('Reply must be between 5 and 10,000 characters')
    .escape(),
  
  body('originalEmail')
    .trim()
    .isEmail()
    .withMessage('Invalid original email address')
    .normalizeEmail(),
  
  body('originalName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Original name must be between 1 and 100 characters')
    .escape(),
  
  handleValidationErrors
];

// Status update validation
const validateStatusUpdate = [
  param('id')
    .isMongoId()
    .withMessage('Invalid message ID'),
  
  body('status')
    .trim()
    .isIn(['new', 'read', 'replied'])
    .withMessage('Status must be new, read, or replied'),
  
  handleValidationErrors
];

// Search and filter validation
const validateSearchParams = [
  query('search')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search term must be between 1 and 100 characters')
    .escape(),
  
  query('status')
    .optional()
    .trim()
    .isIn(['all', 'new', 'read', 'replied'])
    .withMessage('Invalid status filter'),
  
  query('sort')
    .optional()
    .trim()
    .isIn(['newest', 'oldest', 'name'])
    .withMessage('Invalid sort option'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  handleValidationErrors
];

// Bulk action validation
const validateBulkAction = [
  body('action')
    .trim()
    .isIn(['mark-read', 'mark-replied', 'delete'])
    .withMessage('Invalid action'),
  
  body('messageIds')
    .isArray({ min: 1, max: 50 })
    .withMessage('Message IDs must be an array with 1-50 items'),
  
  body('messageIds.*')
    .isMongoId()
    .withMessage('Invalid message ID in array'),
  
  handleValidationErrors
];

// Email validation
const validateEmail = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .isLength({ max: 254 })
    .withMessage('Email address is too long'),
  
  handleValidationErrors
];

// Phone validation
const validatePhone = [
  body('phone')
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number')
    .isLength({ min: 10, max: 15 })
    .withMessage('Phone number must be between 10 and 15 digits'),
  
  handleValidationErrors
];

// URL validation
const validateURL = [
  body('url')
    .trim()
    .isURL({ protocols: ['http', 'https'] })
    .withMessage('Please provide a valid URL')
    .isLength({ max: 2048 })
    .withMessage('URL is too long'),
  
  handleValidationErrors
];

// File upload validation
const validateFileUpload = [
  body('file')
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error('No file uploaded');
      }
      
      // Check file size (5MB limit)
      if (req.file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB');
      }
      
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(req.file.mimetype)) {
        throw new Error('Invalid file type. Only JPEG, PNG, GIF, and PDF files are allowed');
      }
      
      return true;
    }),
  
  handleValidationErrors
];

// Pagination validation
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  handleValidationErrors
];

// Date range validation
const validateDateRange = [
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),
  
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date')
    .custom((endDate, { req }) => {
      if (req.query.startDate && new Date(endDate) <= new Date(req.query.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Sanitize common inputs
const sanitizeInputs = [
  body('*').trim().escape(),
  query('*').trim().escape(),
  param('*').trim().escape(),
  
  (req, res, next) => {
    // Remove any undefined or null values
    const cleanObject = (obj) => {
      for (let key in obj) {
        if (obj[key] === undefined || obj[key] === null || obj[key] === '') {
          delete obj[key];
        } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          cleanObject(obj[key]);
        }
      }
    };
    
    cleanObject(req.body);
    cleanObject(req.query);
    cleanObject(req.params);
    
    next();
  }
];

module.exports = {
  validateContactForm,
  validateAdminAuth,
  validateAdminReply,
  validateStatusUpdate,
  validateSearchParams,
  validateBulkAction,
  validateEmail,
  validatePhone,
  validateURL,
  validateFileUpload,
  validatePagination,
  validateDateRange,
  sanitizeInputs,
  handleValidationErrors
};
