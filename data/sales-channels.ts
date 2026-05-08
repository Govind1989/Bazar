export interface SalesChannel {
  id: string;
  name: string;
  icon: string;
  status: 'connected' | 'disconnected';
  accountName?: string;
  followers?: string;
  lastSync?: string;
  stats?: {
    label: string;
    value: string;
    change: number;
  }[];
}

export const MOCK_SALES_CHANNELS: SalesChannel[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'Facebook',
    status: 'connected',
    accountName: 'Himalayan Bakery Official',
    followers: '12.4K',
    lastSync: '5 mins ago',
    stats: [
      { label: 'Page Reach', value: '45.2K', change: 12 },
      { label: 'Engagement', value: '3.1K', change: 8 },
      { label: 'Link Clicks', value: '890', change: -3 },
    ]
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'Instagram',
    status: 'connected',
    accountName: '@himalayan_bakery',
    followers: '8.2K',
    lastSync: '1 hour ago',
    stats: [
      { label: 'Impressions', value: '62.1K', change: 24 },
      { label: 'Saves', value: '420', change: 15 },
      { label: 'Direct Messages', value: '48', change: 5 },
    ]
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: 'Music2',
    status: 'connected',
    accountName: 'himalayan.bakery',
    followers: '25.6K',
    lastSync: '2 hours ago',
    stats: [
      { label: 'Video Views', value: '1.2M', change: 145 },
      { label: 'Likes', value: '85K', change: 92 },
      { label: 'Shares', value: '12K', change: 110 },
    ]
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'Youtube',
    status: 'disconnected',
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: 'Twitter',
    status: 'disconnected',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'Linkedin',
    status: 'disconnected',
  }
];
