export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  participantRole: 'Vendor' | 'User';
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  messages: Message[];
}

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv1',
    participantId: 'u3',
    participantName: 'Suman Thapa',
    participantRole: 'User',
    lastMessage: 'Is the sourdough available today?',
    lastTimestamp: '10:30 AM',
    unreadCount: 1,
    messages: [
      { id: 'm1', senderId: 'u3', text: 'Hi, I saw your bakery on Bazar!', timestamp: 'Yesterday, 9:00 AM', isRead: true },
      { id: 'm2', senderId: 'v2', text: 'Hello Suman! Welcome to Himalayan Bakery.', timestamp: 'Yesterday, 9:05 AM', isRead: true },
      { id: 'm3', senderId: 'u3', text: 'Is the sourdough available today?', timestamp: '10:30 AM', isRead: false },
    ]
  },
  {
    id: 'conv2',
    participantId: 'v1',
    participantName: 'Apple Store NP',
    participantRole: 'Vendor',
    lastMessage: 'Your refund has been processed.',
    lastTimestamp: 'Yesterday',
    unreadCount: 0,
    messages: [
      { id: 'm4', senderId: 'u3', text: 'I have an issue with my recent order.', timestamp: 'Oct 20, 2:00 PM', isRead: true },
      { id: 'm5', senderId: 'v1', text: 'We are sorry to hear that. What seems to be the problem?', timestamp: 'Oct 20, 2:10 PM', isRead: true },
      { id: 'm6', senderId: 'v1', text: 'Your refund has been processed.', timestamp: 'Yesterday', isRead: true },
    ]
  },
  {
    id: 'conv3',
    participantId: 'u4',
    participantName: 'Adarsh Jha',
    participantRole: 'User',
    lastMessage: 'When will the new MacBooks arrive?',
    lastTimestamp: 'Oct 22',
    unreadCount: 0,
    messages: [
      { id: 'm7', senderId: 'u4', text: 'Hi, I am interested in the new M3 models.', timestamp: 'Oct 22', isRead: true },
      { id: 'm8', senderId: 'v1', text: 'Hello Adarsh! They will be in stock by next week.', timestamp: 'Oct 22', isRead: true },
      { id: 'm9', senderId: 'u4', text: 'When will the new MacBooks arrive?', timestamp: 'Oct 22', isRead: true },
    ]
  }
];
