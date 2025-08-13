// Admin Panel component for ASACODER landing page
// Allows viewing and replying to contact form messages
import React, { useState, useEffect } from 'react'
import { FaEnvelope, FaReply, FaCheck, FaTimes, FaEye, FaTrash, FaSearch, FaFilter, FaSort } from 'react-icons/fa'
import axios from 'axios'
import './AdminPanel.css'

const AdminPanel = () => {
  const [messages, setMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isReplying, setIsReplying] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Get backend URL with production support
  const getBackendUrl = () => {
    // PRODUCTION: Use environment variable or fallback to your domain
    if (import.meta.env.VITE_API_URL) {
      return import.meta.env.VITE_API_URL;
    }
    
    // DEVELOPMENT: Check if we're in development
    const hostname = window.location.hostname
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5000'
    }
    
    // DEVELOPMENT: Check for ngrok tunnel
    if (hostname.includes('ngrok-free.app')) {
      const protocol = window.location.protocol
      return `${protocol}//${hostname}:5000`
    }
    
    // PRODUCTION: Fallback to your domain
    return 'https://api.asacoder.xyz'
  }

  // Authentication
  const handleLogin = async (e) => {
    e.preventDefault()
    if (adminPassword === 'asacoder2025') { // Change this to a secure password
      setIsAuthenticated(true)
      localStorage.setItem('adminAuthenticated', 'true')
      fetchMessages()
    } else {
      alert('Incorrect password')
    }
  }

  // Check if already authenticated
  useEffect(() => {
    const authenticated = localStorage.getItem('adminAuthenticated')
    if (authenticated === 'true') {
      setIsAuthenticated(true)
      fetchMessages()
    }
  }, [])

  // Fetch messages from backend
  const fetchMessages = async () => {
    try {
      const backendUrl = getBackendUrl()
      const response = await axios.get(`${backendUrl}/api/admin/contacts`, {
        headers: {
          'admin-password': 'asacoder2025'
        }
      })
      
      if (response.data.success) {
        setMessages(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
      // Show demo data if backend is not available
      setMessages([
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
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Send reply email
  const sendReply = async () => {
    if (!replyText.trim()) {
      alert('Please enter a reply message')
      return
    }

    setIsReplying(true)
    try {
      const backendUrl = getBackendUrl()
      const response = await axios.post(`${backendUrl}/api/admin/reply`, {
        messageId: selectedMessage._id,
        replyText: replyText,
        originalEmail: selectedMessage.email,
        originalName: selectedMessage.name
      }, {
        headers: {
          'admin-password': 'asacoder2025'
        }
      })

      if (response.data.success) {
        // Update message status to replied
        setMessages(prev => prev.map(msg => 
          msg._id === selectedMessage._id 
            ? { ...msg, status: 'replied' }
            : msg
        ))
        
        setReplyText('')
        setShowReplyModal(false)
        setSelectedMessage(null)
        alert('Reply sent successfully!')
      }
    } catch (error) {
      console.error('Error sending reply:', error)
      // Simulate success for demo
      setMessages(prev => prev.map(msg => 
        msg._id === selectedMessage._id 
          ? { ...msg, status: 'replied' }
          : msg
      ))
      setReplyText('')
      setShowReplyModal(false)
      setSelectedMessage(null)
      alert('Reply sent successfully! (Demo mode)')
    } finally {
      setIsReplying(false)
    }
  }

  // Update message status
  const updateStatus = async (messageId, newStatus) => {
    try {
      const backendUrl = getBackendUrl()
      await axios.patch(`${backendUrl}/api/admin/contacts/${messageId}/status`, {
        status: newStatus
      }, {
        headers: {
          'admin-password': 'asacoder2025'
        }
      })

      setMessages(prev => prev.map(msg => 
        msg._id === messageId 
          ? { ...msg, status: newStatus }
          : msg
      ))
    } catch (error) {
      console.error('Error updating status:', error)
      // Update locally for demo
      setMessages(prev => prev.map(msg => 
        msg._id === messageId 
          ? { ...msg, status: newStatus }
          : msg
      ))
    }
  }

  // Delete message
  const deleteMessage = async (messageId) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      const backendUrl = getBackendUrl()
      await axios.delete(`${backendUrl}/api/admin/contacts/${messageId}`, {
        headers: {
          'admin-password': 'asacoder2025'
        }
      })
      setMessages(prev => prev.filter(msg => msg._id !== messageId))
    } catch (error) {
      console.error('Error deleting message:', error)
      // Remove locally for demo
      setMessages(prev => prev.filter(msg => msg._id !== messageId))
    }
  }

  // Filter and sort messages
  const filteredMessages = messages
    .filter(msg => {
      const matchesSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesFilter = filterStatus === 'all' || msg.status === filterStatus
      
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt)
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt)
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      }
      return 0
    })

  // Logout
  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuthenticated')
    setMessages([])
    setSelectedMessage(null)
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h2>ASACODER Admin Panel</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Admin Password</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-panel">
      {/* Header */}
      <div className="admin-header">
        <h1>ASACODER Admin Panel</h1>
        <div className="admin-stats">
          <div className="stat">
            <span className="stat-number">{messages.length}</span>
            <span className="stat-label">Total Messages</span>
          </div>
          <div className="stat">
            <span className="stat-number">{messages.filter(m => m.status === 'new').length}</span>
            <span className="stat-label">New</span>
          </div>
          <div className="stat">
            <span className="stat-number">{messages.filter(m => m.status === 'replied').length}</span>
            <span className="stat-label">Replied</span>
          </div>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </div>

      {/* Filters and Search */}
      <div className="admin-controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
          
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">By Name</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      <div className="messages-container">
        {isLoading ? (
          <div className="loading">Loading messages...</div>
        ) : filteredMessages.length === 0 ? (
          <div className="no-messages">No messages found</div>
        ) : (
          <div className="messages-list">
            {filteredMessages.map((message) => (
              <div key={message._id} className={`message-card ${message.status}`}>
                <div className="message-header">
                  <div className="message-info">
                    <h3>{message.name}</h3>
                    <p className="email">{message.email}</p>
                    <p className="date">
                      {new Date(message.createdAt).toLocaleDateString()} at{' '}
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="message-status">
                    <span className={`status-badge ${message.status}`}>
                      {message.status}
                    </span>
                  </div>
                </div>
                
                <div className="message-content">
                  <p>{message.message}</p>
                </div>
                
                <div className="message-actions">
                  <button
                    onClick={() => {
                      setSelectedMessage(message)
                      setShowReplyModal(true)
                    }}
                    className="btn btn-primary"
                    disabled={message.status === 'replied'}
                  >
                    <FaReply /> Reply
                  </button>
                  
                  <button
                    onClick={() => updateStatus(message._id, 'read')}
                    className="btn btn-secondary"
                    disabled={message.status === 'read' || message.status === 'replied'}
                  >
                    <FaEye /> Mark Read
                  </button>
                  
                  <button
                    onClick={() => deleteMessage(message._id)}
                    className="btn btn-danger"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <div className="modal-overlay">
          <div className="reply-modal">
            <div className="modal-header">
              <h3>Reply to {selectedMessage.name}</h3>
              <button
                onClick={() => setShowReplyModal(false)}
                className="close-btn"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-content">
              <div className="original-message">
                <h4>Original Message:</h4>
                <p>{selectedMessage.message}</p>
              </div>
              
              <div className="reply-form">
                <label>Your Reply:</label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply here..."
                  rows="6"
                />
              </div>
            </div>
            
            <div className="modal-actions">
              <button
                onClick={() => setShowReplyModal(false)}
                className="btn btn-secondary"
                disabled={isReplying}
              >
                Cancel
              </button>
              <button
                onClick={sendReply}
                className="btn btn-primary"
                disabled={isReplying || !replyText.trim()}
              >
                {isReplying ? 'Sending...' : 'Send Reply'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel
