import { baseQueryWithAuth } from './baseQuery';

export interface Notification {
  id: string;
  type: 'deadline' | 'completed' | 'milestone' | 'overdue' | 'info';
  message: string;
  title?: string;
  time: string;
  link?: string;
  is_read: boolean;
  user_id: number;
  created_at: string;
  updated_at: string;
}

class NotificationService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_URL_SERVER || '';
  }

  async getNotifications(): Promise<Notification[]> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${this.baseUrl}/api/notifications/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }

    const data = await response.json();
    return data.results || data;
  }

  async markAsRead(notificationId: string): Promise<void> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${this.baseUrl}/api/notifications/${notificationId}/mark_as_read/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to mark notification as read');
    }
  }

  async markAllAsRead(): Promise<void> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${this.baseUrl}/api/notifications/mark_all_as_read/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to mark all notifications as read');
    }
  }

  async testWebSocket(message: string): Promise<void> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${this.baseUrl}/api/notifications/test_websocket/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to send test notification');
    }
  }
}

export const notificationService = new NotificationService();