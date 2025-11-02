import React, { useEffect } from 'react';
import axios from 'axios';

const ApiStatus = ({ status, onStatusChange }) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/health`, {
          timeout: 5000
        });
        
        if (response.status === 200) {
          onStatusChange('online');
        } else {
          onStatusChange('offline');
        }
      } catch (error) {
        console.error('API Health check failed:', error);
        onStatusChange('offline');
      }
    };

    checkApiStatus();
    // Check API status every 30 seconds
    const interval = setInterval(checkApiStatus, 30000);

    return () => clearInterval(interval);
  }, [API_BASE_URL, onStatusChange]);

  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          message: 'API is online and ready',
          className: 'online'
        };
      case 'offline':
        return {
          message: 'API is offline - check if backend is running',
          className: 'offline'
        };
      default:
        return {
          message: 'Checking API status...',
          className: 'checking'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`api-status ${config.className}`}>
      <span className={`status-indicator ${config.className}`}></span>
      <span>{config.message}</span>
    </div>
  );
};

export default ApiStatus;