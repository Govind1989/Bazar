import { ModulePermission } from "@/types/saas";

export interface PlatformMessage {
  id: string;
  senderId: string;
  recipientId: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface AdminConversation {
  id: string;
  participantName: string;
  participantAvatar: string;
  participantRole: 'VENDOR' | 'USER';
  lastMessage: string;
  unreadCount: number;
  timestamp: string;
  messages: PlatformMessage[];
}

export const ADMIN_CONVERSATIONS: AdminConversation[] = [
  {
    id: 'c1',
    participantName: 'Apple Store NP',
    participantAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Apple',
    participantRole: 'VENDOR',
    lastMessage: 'We need to upgrade our staff limit to 50.',
    unreadCount: 2,
    timestamp: '10:15 AM',
    messages: [
      { id: 'm1', senderId: 'v1', recipientId: 'admin', text: 'Hi, we are seeing a spike in traffic.', timestamp: '2026-05-15T09:00:00Z', status: 'read' },
      { id: 'm2', senderId: 'v1', recipientId: 'admin', text: 'We need to upgrade our staff limit to 50.', timestamp: '2026-05-15T10:15:00Z', status: 'delivered' }
    ]
  },
  {
    id: 'c2',
    participantName: 'Suman Thapa',
    participantAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suman',
    participantRole: 'USER',
    lastMessage: 'When will my dispute #BZ-9920 be resolved?',
    unreadCount: 0,
    timestamp: 'Yesterday',
    messages: [
      { id: 'm3', senderId: 'u3', recipientId: 'admin', text: 'When will my dispute #BZ-9920 be resolved?', timestamp: '2026-05-14T15:30:00Z', status: 'read' }
    ]
  }
];

export interface BroadcastNotification {
  id: string;
  title: string;
  content: string;
  target: 'ALL_USERS' | 'ALL_VENDORS' | 'SELECTED_TIERS';
  targetTiers?: string[];
  sentAt: string;
  deliveredCount: number;
  openRate: number;
}

export const BROADCAST_HISTORY: BroadcastNotification[] = [
  {
    id: 'b1',
    title: 'Platform Maintenance',
    content: 'We will be undergoing scheduled maintenance on Sunday at 02:00 UTC.',
    target: 'ALL_VENDORS',
    sentAt: '2026-05-10T12:00:00Z',
    deliveredCount: 1240,
    openRate: 98.5
  },
  {
    id: 'b2',
    title: 'New AI Features Released!',
    content: 'All Gold and Platinum vendors now have access to autonomous customer chat.',
    target: 'SELECTED_TIERS',
    targetTiers: ['GOLD', 'PLATINUM'],
    sentAt: '2026-05-12T09:00:00Z',
    deliveredCount: 42,
    openRate: 100
  }
];
