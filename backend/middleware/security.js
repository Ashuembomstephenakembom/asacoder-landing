// Security middleware for ASACODER landing page
// Protects against various types of attacks and vulnerabilities

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const morgan = require('morgan');
const cors = require('cors');

// Rate limiting configuration
const createRateLimiters = () => {
  // General API rate limiter
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
      error: 'Too many requests from this IP, please try again later.',
      retryAfter: '15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        message: 'Too many requests from this IP, please try again later.',
        retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
      });
    }
  });

  // Stricter limiter for contact form
  const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // limit each IP to 5 contact submissions per hour
    message: {
      error: 'Too many contact form submissions, please try again later.',
      retryAfter: '1 hour'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        message: 'Too many contact form submissions, please try again later.',
        retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
      });
    }
  });

  // Very strict limiter for admin login
  const adminLoginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // limit each IP to 3 login attempts per 15 minutes
    message: {
      error: 'Too many login attempts, please try again later.',
      retryAfter: '15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        message: 'Too many login attempts, please try again later.',
        retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
      });
    }
  });

  // Lenient limiter for admin panel operations (after login)
  const adminPanelLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // allow 100 requests per 15 minutes for admin operations
    message: {
      error: 'Too many admin requests, please slow down.',
      retryAfter: '15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        message: 'Too many admin requests, please slow down.',
        retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
      });
    }
  });

  // Slow down requests
  const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 50, // allow 50 requests per 15 minutes, then...
    delayMs: () => 500 // begin adding 500ms of delay per request above 50
  });

  return {
    apiLimiter,
    contactLimiter,
    adminLoginLimiter,
    adminPanelLimiter,
    speedLimiter
  };
};

// CORS configuration with security
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or some mobile browsers)
    if (!origin) {
      console.log('Allowing request with no origin (mobile/app)');
      return callback(null, true);
    }
    
    const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  'https://asacoder.xyz',
  'https://www.asacoder.xyz',
  'https://api.asacoder.xyz',
  'https://*.vercel.app', // Allow Vercel preview URLs
  'https://asacoder-landing.vercel.app', // Your specific Vercel domain

    ];
    
    // Check if origin is in allowed list or is a localhost URL
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.includes('*')) {
        // Handle wildcard patterns
        const pattern = allowedOrigin.replace('*', '.*');
        return new RegExp(pattern).test(origin);
      }
      return allowedOrigin === origin;
    });
    
    // Also allow any localhost URLs for development
    const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');
    
    if (isAllowed || isLocalhost) {
      console.log('CORS allowed origin:', origin);
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'admin-password',
    'X-API-Key'
  ],
  exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset']
};

// Helmet configuration for security headers
const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.googletagmanager.com", "https://www.google-analytics.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://www.google-analytics.com"],
      frameSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
});

// Request logging
const requestLogger = morgan('combined', {
  skip: (req, res) => res.statusCode < 400,
  stream: {
    write: (message) => {
      console.log(`[${new Date().toISOString()}] ${message.trim()}`);
    }
  }
});

// Security middleware setup
const setupSecurity = (app) => {
  const limiters = createRateLimiters();

  // Basic security headers
  app.use(helmetConfig);
  
  // CORS protection
  app.use(cors(corsOptions));
  
  // Request logging
  app.use(requestLogger);
  
  // Rate limiting
  app.use('/api/', limiters.apiLimiter);
  app.use('/api/contact/submit', limiters.contactLimiter);
  app.use('/api/admin/login', limiters.adminLoginLimiter); // Only apply strict limit to login
  app.use('/api/admin', limiters.adminPanelLimiter); // Apply lenient limit to other admin routes
  app.use(limiters.speedLimiter);
  
  // Data sanitization
  app.use(mongoSanitize()); // Prevent NoSQL injection
  app.use(xss()); // Prevent XSS attacks
  
  // Parameter pollution protection
  app.use(hpp({
    whitelist: ['name', 'email', 'message', 'phone', 'subject'] // Allow these parameters to be duplicated
  }));

  // Additional security headers
  app.use((req, res, next) => {
    // Remove server information
    res.removeHeader('X-Powered-By');
    
    // Add security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    
    next();
  });

  // Error handling for security violations
  app.use((err, req, res, next) => {
    if (err.type === 'entity.too.large') {
      return res.status(413).json({
        success: false,
        message: 'Request entity too large'
      });
    }
    
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({
        success: false,
        message: 'Invalid JSON payload'
      });
    }
    
    next(err);
  });
};

// Input validation middleware
const validateInput = (req, res, next) => {
  // Skip validation for contact form submissions (handled by express-validator)
  if (req.path === '/api/contact/submit' && req.method === 'POST') {
    return next();
  }

  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /eval\s*\(/i,
    /document\./i,
    /window\./i,
    /alert\s*\(/i,
    /confirm\s*\(/i,
    /prompt\s*\(/i,
    /\$\(/i,
    /union\s+select/i,
    /drop\s+table/i,
    /delete\s+from/i,
    /insert\s+into/i,
    /update\s+set/i
  ];

  const checkObject = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === 'string') {
        for (let pattern of suspiciousPatterns) {
          if (pattern.test(obj[key])) {
            return false;
          }
        }
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (!checkObject(obj[key])) {
          return false;
        }
      }
    }
    return true;
  };

  if (!checkObject(req.body) || !checkObject(req.query) || !checkObject(req.params)) {
    return res.status(400).json({
      success: false,
      message: 'Suspicious input detected'
    });
  }

  next();
};

// Request size limiting
const limitRequestSize = (req, res, next) => {
  const maxSize = 1024 * 1024; // 1MB
  
  if (req.headers['content-length'] && parseInt(req.headers['content-length']) > maxSize) {
    return res.status(413).json({
      success: false,
      message: 'Request too large'
    });
  }
  
  next();
};

module.exports = {
  setupSecurity,
  validateInput,
  limitRequestSize,
  createRateLimiters
};
