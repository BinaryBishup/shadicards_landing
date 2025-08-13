// Demo chat messages generator for AutoInvitationsSection

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

export function generateDemoMessages(language?: string): ChatMessage[] {
  return [
    {
      id: '1',
      sender: 'bot',
      message: 'Welcome! I can help you create beautiful wedding invitations.',
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: '2',
      sender: 'user',
      message: 'Hi! I need invitations for my wedding on March 15th.',
      timestamp: new Date(Date.now() - 45000)
    },
    {
      id: '3',
      sender: 'bot',
      message: 'Congratulations! 🎉 I\'ll help you create perfect invitations. What\'s the venue?',
      timestamp: new Date(Date.now() - 30000)
    },
    {
      id: '4',
      sender: 'user',
      message: 'The venue is Garden Palace, Downtown. We\'re expecting about 150 guests.',
      timestamp: new Date(Date.now() - 15000)
    },
    {
      id: '5',
      sender: 'bot',
      message: 'Perfect! I\'ll generate personalized invitations for Garden Palace. Would you like to see some design options?',
      timestamp: new Date()
    }
  ];
}