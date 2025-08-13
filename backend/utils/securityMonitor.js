// Security monitoring system for ASACODER landing page
// Tracks and logs security events, suspicious activities, and potential threats

const fs = require('fs');
const path = require('path');

class SecurityMonitor {
  constructor() {
    this.logFile = path.join(__dirname, '../logs/security.log');
    this.suspiciousIPs = new Map();
    this.failedAttempts = new Map();
    this.blockedIPs = new Set();
    
    // Ensure logs directory exists
    const logsDir = path.dirname(this.logFile);
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
  }

  // Log security event
  logEvent(type, details, req = null) {
    const timestamp = new Date().toISOString();
    const ip = req ? this.getClientIP(req) : 'unknown';
    const userAgent = req ? req.headers['user-agent'] : 'unknown';
    
    const logEntry = {
      timestamp,
      type,
      ip,
      userAgent,
      details,
      url: req ? req.originalUrl : 'unknown',
      method: req ? req.method : 'unknown'
    };

    const logLine = `[${timestamp}] ${type.toUpperCase()}: ${JSON.stringify(logEntry)}\n`;
    
    // Write to log file
    fs.appendFileSync(this.logFile, logLine);
    
    // Console output for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔒 SECURITY: ${type.toUpperCase()} - ${ip} - ${details}`);
    }
  }

  // Get client IP address
  getClientIP(req) {
    return req.headers['x-forwarded-for'] || 
           req.headers['x-real-ip'] || 
           req.connection.remoteAddress || 
           req.socket.remoteAddress || 
           'unknown';
  }

  // Track failed login attempts
  trackFailedLogin(ip, reason = 'Invalid credentials') {
    const attempts = this.failedAttempts.get(ip) || 0;
    this.failedAttempts.set(ip, attempts + 1);
    
    this.logEvent('failed_login', {
      reason,
      attempts: attempts + 1,
      ip
    });

    // Block IP after 5 failed attempts
    if (attempts + 1 >= 5) {
      this.blockIP(ip, 'Too many failed login attempts');
    }
  }

  // Track suspicious activity
  trackSuspiciousActivity(ip, activity, req = null) {
    const count = this.suspiciousIPs.get(ip) || 0;
    this.suspiciousIPs.set(ip, count + 1);
    
    this.logEvent('suspicious_activity', {
      activity,
      count: count + 1,
      ip
    }, req);

    // Block IP after 10 suspicious activities
    if (count + 1 >= 10) {
      this.blockIP(ip, 'Too many suspicious activities');
    }
  }

  // Block IP address
  blockIP(ip, reason) {
    this.blockedIPs.add(ip);
    this.logEvent('ip_blocked', {
      reason,
      ip,
      blockedUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    });
  }

  // Check if IP is blocked
  isIPBlocked(ip) {
    return this.blockedIPs.has(ip);
  }

  // Track rate limit violations
  trackRateLimitViolation(ip, endpoint, req = null) {
    this.logEvent('rate_limit_violation', {
      endpoint,
      ip
    }, req);
  }

  // Track potential SQL injection attempts
  trackSQLInjectionAttempt(ip, payload, req = null) {
    this.trackSuspiciousActivity(ip, 'SQL Injection attempt', req);
    this.logEvent('sql_injection_attempt', {
      payload: payload.substring(0, 100), // Truncate for security
      ip
    }, req);
  }

  // Track potential XSS attempts
  trackXSSAttempt(ip, payload, req = null) {
    this.trackSuspiciousActivity(ip, 'XSS attempt', req);
    this.logEvent('xss_attempt', {
      payload: payload.substring(0, 100), // Truncate for security
      ip
    }, req);
  }

  // Track file upload attempts
  trackFileUploadAttempt(ip, filename, fileType, fileSize, req = null) {
    this.logEvent('file_upload_attempt', {
      filename,
      fileType,
      fileSize,
      ip
    }, req);
  }

  // Track admin actions
  trackAdminAction(ip, action, details, req = null) {
    this.logEvent('admin_action', {
      action,
      details,
      ip
    }, req);
  }

  // Track successful logins
  trackSuccessfulLogin(ip, userType = 'admin', req = null) {
    this.logEvent('successful_login', {
      userType,
      ip
    }, req);
    
    // Reset failed attempts for this IP
    this.failedAttempts.delete(ip);
  }

  // Track logout events
  trackLogout(ip, userType = 'admin', req = null) {
    this.logEvent('logout', {
      userType,
      ip
    }, req);
  }

  // Track data access
  trackDataAccess(ip, dataType, recordCount, req = null) {
    this.logEvent('data_access', {
      dataType,
      recordCount,
      ip
    }, req);
  }

  // Track data modification
  trackDataModification(ip, dataType, action, recordId, req = null) {
    this.logEvent('data_modification', {
      dataType,
      action,
      recordId,
      ip
    }, req);
  }

  // Generate security report
  generateSecurityReport() {
    const report = {
      timestamp: new Date().toISOString(),
      blockedIPs: Array.from(this.blockedIPs),
      suspiciousIPs: Object.fromEntries(this.suspiciousIPs),
      failedAttempts: Object.fromEntries(this.failedAttempts),
      summary: {
        totalBlockedIPs: this.blockedIPs.size,
        totalSuspiciousIPs: this.suspiciousIPs.size,
        totalFailedAttempts: Array.from(this.failedAttempts.values()).reduce((a, b) => a + b, 0)
      }
    };

    return report;
  }

  // Clean up old data (run periodically)
  cleanup() {
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    
    // Clean up failed attempts older than 24 hours
    for (const [ip, timestamp] of this.failedAttempts.entries()) {
      if (timestamp < oneDayAgo) {
        this.failedAttempts.delete(ip);
      }
    }
    
    // Clean up suspicious IPs older than 24 hours
    for (const [ip, timestamp] of this.suspiciousIPs.entries()) {
      if (timestamp < oneDayAgo) {
        this.suspiciousIPs.delete(ip);
      }
    }
    
    // Clean up blocked IPs older than 24 hours
    for (const ip of this.blockedIPs) {
      // This is a simplified cleanup - in production you'd store timestamps
      // For now, we'll keep blocked IPs for 24 hours
    }
  }

  // Middleware to check for blocked IPs
  checkBlockedIP(req, res, next) {
    const ip = this.getClientIP(req);
    
    if (this.isIPBlocked(ip)) {
      this.logEvent('blocked_request', {
        reason: 'IP is blocked',
        ip
      }, req);
      
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    
    next();
  }

  // Middleware to detect suspicious patterns
  detectSuspiciousPatterns(req, res, next) {
    const ip = this.getClientIP(req);
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /union\s+select/i,
      /drop\s+table/i,
      /delete\s+from/i,
      /insert\s+into/i,
      /update\s+set/i,
      /eval\s*\(/i,
      /document\./i,
      /window\./i
    ];

    const checkObject = (obj) => {
      for (let key in obj) {
        if (typeof obj[key] === 'string') {
          for (let pattern of suspiciousPatterns) {
            if (pattern.test(obj[key])) {
              this.trackSuspiciousActivity(ip, `Suspicious pattern detected: ${pattern.source}`, req);
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
  }
}

// Create singleton instance
const securityMonitor = new SecurityMonitor();

// Cleanup every hour
setInterval(() => {
  securityMonitor.cleanup();
}, 60 * 60 * 1000);

module.exports = securityMonitor;
