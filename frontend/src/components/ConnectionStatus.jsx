// Connection Status component for debugging backend connection
import React, { useState, useEffect } from 'react'
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa'
import axios from 'axios'

const ConnectionStatus = () => {
  const [status, setStatus] = useState('checking') // 'checking', 'connected', 'disconnected'
  const [lastChecked, setLastChecked] = useState(null)

  const checkBackendConnection = async () => {
    try {
      // PRODUCTION: Use environment variable or fallback to your domain
      let backendUrl;
      if (import.meta.env.VITE_API_URL) {
        backendUrl = import.meta.env.VITE_API_URL;
      } else {
        // DEVELOPMENT: Check if we're in development
        const hostname = window.location.hostname
        const port = window.location.port
        
        // Check if we're on localhost or development ports
        if (hostname === 'localhost' || 
            hostname === '127.0.0.1' || 
            port === '5173' || 
            port === '3000' ||
            hostname.startsWith('192.168.') ||  // Local network IP
            hostname.startsWith('10.') ||       // Local network IP
            hostname.startsWith('172.')) {      // Local network IP
          backendUrl = 'http://localhost:10000';
        } else {
          backendUrl = 'https://asacoder-backend.onrender.com';
        }
      }
      
      const response = await axios.get(`${backendUrl}/`, {
        timeout: 5000
      })
      
      if (response.data && response.data.message) {
        setStatus('connected')
        setLastChecked(new Date())
      } else {
        setStatus('disconnected')
      }
    } catch (error) {
      console.log('Backend connection check failed:', error.message)
      setStatus('disconnected')
      setLastChecked(new Date())
    }
  }

  useEffect(() => {
    checkBackendConnection()
    
    // Check connection every 30 seconds
    const interval = setInterval(checkBackendConnection, 30000)
    
    return () => clearInterval(interval)
  }, [])

  // Only show in development mode and when explicitly enabled
  if (import.meta.env.PROD || !import.meta.env.DEV) {
    return null
  }
  
  // You can also manually hide it by setting this to false
  const showDebug = false
  if (!showDebug) {
    return null
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'checking':
        return <FaSpinner className="animate-spin" />
      case 'connected':
        return <FaCheckCircle className="text-green-500" />
      case 'disconnected':
        return <FaTimesCircle className="text-red-500" />
      default:
        return null
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'checking':
        return 'Checking backend...'
      case 'connected':
        return 'Backend connected'
      case 'disconnected':
        return 'Backend disconnected'
      default:
        return 'Unknown status'
    }
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700 z-50">
      <div className="flex items-center space-x-2 text-sm">
        {getStatusIcon()}
        <span className={status === 'connected' ? 'text-green-600' : status === 'disconnected' ? 'text-red-600' : 'text-gray-600'}>
          {getStatusText()}
        </span>
      </div>
      {lastChecked && (
        <div className="text-xs text-gray-500 mt-1">
          Last checked: {lastChecked.toLocaleTimeString()}
        </div>
      )}
    </div>
  )
}

export default ConnectionStatus
