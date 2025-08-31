"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { websocketService, NotificationData } from '@/services/websocketService';
import { notificationService, Notification } from '@/services/notificationService';
import { formatNotificationTime, playNotificationSound } from '@/lib/utils/notificationUtils';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
  testWebSocket: (message: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  // Load initial notifications
  const refreshNotifications = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await notificationService.getNotifications();
      
      // Format the time for existing notifications
      const formattedNotifications = data.map(notification => ({
        ...notification,
        time: formatNotificationTime(notification.created_at || notification.updated_at)
      }));
      
      setNotifications(formattedNotifications);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notifications');
      console.error('Error loading notifications:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId ? { ...n, is_read: true } : n
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
      throw err;
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => 
        prev.map(n => ({ ...n, is_read: true }))
      );
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      throw err;
    }
  };

  // Test WebSocket
  const testWebSocket = async (message: string) => {
    try {
      await notificationService.testWebSocket(message);
    } catch (err) {
      console.error('Error sending test notification:', err);
      throw err;
    }
  };

  // Handle incoming WebSocket notifications
  const handleWebSocketNotification = (data: any) => {
    if (data.type === 'notification' && data.data) {
      const newNotification: Notification = {
        id: data.data.id || Date.now().toString(),
        type: data.data.notification_type || data.data.type || 'info',
        message: data.data.message,
        title: data.data.title,
        time: formatNotificationTime(new Date().toISOString()),
        link: data.data.link,
        is_read: false,
        user_id: data.data.user_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setNotifications(prev => [newNotification, ...prev]);
      
      // Play notification sound
      playNotificationSound();
      
      // Show browser notification if permission is granted
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(newNotification.title || 'New Notification', {
          body: newNotification.message,
          icon: '/favicon.ico',
          tag: newNotification.id, // Prevent duplicate notifications
        });
      }
    }
  };

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Load initial notifications
    refreshNotifications();

    // Set up WebSocket listeners
    websocketService.on('notification', handleWebSocketNotification);
    websocketService.on('all', (data) => {
      console.log('WebSocket message received:', data);
    });

    // Cleanup on unmount
    return () => {
      websocketService.off('notification', handleWebSocketNotification);
    };
  }, []);

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    refreshNotifications,
    testWebSocket,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}