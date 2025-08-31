class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private listeners: { [key: string]: ((data: any) => void)[] } = {};

  constructor() {
    this.connect();
  }

  private connect() {
    try {
      // Get the WebSocket URL from environment or construct it
      const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsHost = process.env.NEXT_PUBLIC_WS_HOST || window.location.host;
      const wsUrl = `${wsProtocol}//${wsHost}/ws/notifications/`;
      
      this.ws = new WebSocket(wsUrl);
      
      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        
        // Send authentication token if available
        const token = localStorage.getItem('accessToken');
        if (token) {
          this.send({
            type: 'auth',
            token: token
          });
        }
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        this.ws = null;
        this.scheduleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      
      console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      this.reconnectTimeout = setTimeout(() => {
        this.connect();
      }, delay);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  private handleMessage(data: any) {
    const { type } = data;
    
    // Emit to all listeners for this message type
    if (this.listeners[type]) {
      this.listeners[type].forEach(callback => callback(data));
    }
    
    // Also emit to 'all' listeners
    if (this.listeners['all']) {
      this.listeners['all'].forEach(callback => callback(data));
    }
  }

  public send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  public on(eventType: string, callback: (data: any) => void) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(callback);
  }

  public off(eventType: string, callback: (data: any) => void) {
    if (this.listeners[eventType]) {
      this.listeners[eventType] = this.listeners[eventType].filter(cb => cb !== callback);
    }
  }

  public disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    this.listeners = {};
  }

  public isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}

// Create a singleton instance
export const websocketService = new WebSocketService();

// Types for notification data
export interface NotificationData {
  id: string;
  type: 'deadline' | 'completed' | 'milestone' | 'overdue' | 'info';
  message: string;
  title?: string;
  time: string;
  link?: string;
  is_read: boolean;
  user_id: number;
}

export interface WebSocketMessage {
  type: 'notification' | 'auth' | 'error';
  data?: NotificationData;
  message?: string;
  token?: string;
}