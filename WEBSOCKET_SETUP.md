# WebSocket Notification Setup

This document explains how to set up and use the WebSocket notification system.

## Setup

1. **Environment Configuration**
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_URL_SERVER=http://localhost:8000
   NEXT_PUBLIC_WS_HOST=localhost:8000  # Optional, defaults to window.location.host
   ```

2. **Backend Requirements**
   Make sure your Django backend has:
   - Django Channels configured
   - WebSocket routing at `/ws/notifications/`
   - Authentication middleware for WebSocket connections

## Features

### Real-time Notifications
- Automatic WebSocket connection on dashboard load
- Real-time notification updates
- Browser notification support (with permission)
- Sound notifications for new messages
- Connection status indicator

### Header Bell Icon
- Shows unread notification count
- Red badge appears when there are unread notifications
- Updates in real-time via WebSocket

### Notification Page
- Real-time notification list
- Mark individual notifications as read
- Mark all notifications as read
- Test WebSocket connection feature
- Connection status indicator
- Refresh notifications manually

## Components

### WebSocket Service (`/services/websocketService.ts`)
- Handles WebSocket connection management
- Automatic reconnection with exponential backoff
- Event-based message handling
- Authentication token support

### Notification Service (`/services/notificationService.ts`)
- REST API calls for notification CRUD operations
- Mark as read functionality
- Test WebSocket endpoint integration

### Notification Context (`/lib/contexts/NotificationContext.tsx`)
- Global state management for notifications
- WebSocket event handling
- Browser notification integration
- Sound notification support

### Custom Hooks
- `useNotifications()`: Access notification state and actions
- `useWebSocket()`: Monitor WebSocket connection status

## Usage

### Testing WebSocket Connection
1. Go to `/dashboard/notifications`
2. Use the "Test WebSocket Connection" section
3. Enter a test message and click "Send Test"
4. The notification should appear in real-time

### Backend Integration
The frontend expects WebSocket messages in this format:
```json
{
  "type": "notification",
  "data": {
    "id": "notification_id",
    "notification_type": "info",
    "message": "Your notification message",
    "title": "Notification Title",
    "link": "/optional/link",
    "user_id": 123
  }
}
```

## Troubleshooting

1. **Connection Issues**
   - Check if Django Channels is running
   - Verify WebSocket URL configuration
   - Check browser console for errors

2. **Authentication Issues**
   - Ensure access token is stored in localStorage
   - Verify backend WebSocket authentication middleware

3. **Notification Not Appearing**
   - Check browser notification permissions
   - Verify WebSocket message format
   - Check console for JavaScript errors