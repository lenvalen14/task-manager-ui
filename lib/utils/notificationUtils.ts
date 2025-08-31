import { formatDistanceToNow } from 'date-fns';

export function formatNotificationTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    return 'Unknown time';
  }
}

export function getNotificationIcon(type: string) {
  const iconMap = {
    deadline: '⏰',
    completed: '✅',
    milestone: '🎯',
    overdue: '🚨',
    info: 'ℹ️',
  };
  
  return iconMap[type as keyof typeof iconMap] || '📢';
}

export function playNotificationSound() {
  // Create a simple notification sound
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  } catch (error) {
    console.log('Could not play notification sound:', error);
  }
}