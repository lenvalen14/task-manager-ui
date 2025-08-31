"use client"

import { useEffect, useState } from 'react';
import { websocketService } from '@/services/websocketService';

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('connecting');

  useEffect(() => {
    const checkConnection = () => {
      const connected = websocketService.isConnected();
      setIsConnected(connected);
      setConnectionStatus(connected ? 'connected' : 'disconnected');
    };

    // Check connection status periodically
    const interval = setInterval(checkConnection, 1000);
    
    // Initial check
    checkConnection();

    // Listen for WebSocket events
    const handleConnection = () => {
      setIsConnected(true);
      setConnectionStatus('connected');
    };

    const handleDisconnection = () => {
      setIsConnected(false);
      setConnectionStatus('disconnected');
    };

    const handleError = () => {
      setIsConnected(false);
      setConnectionStatus('error');
    };

    // Add event listeners
    websocketService.on('connected', handleConnection);
    websocketService.on('disconnected', handleDisconnection);
    websocketService.on('error', handleError);

    return () => {
      clearInterval(interval);
      websocketService.off('connected', handleConnection);
      websocketService.off('disconnected', handleDisconnection);
      websocketService.off('error', handleError);
    };
  }, []);

  return {
    isConnected,
    connectionStatus,
  };
}