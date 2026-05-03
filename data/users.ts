export type UserRole = 'SuperAdmin' | 'Vendor' | 'User';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // Plain text for prototype
  name: string;
  roles: UserRole[];
  avatar?: string;
  phone?: string;
  address?: string;
  joinedDate: string;
  loyaltyPoints: number;
  followedVendors: string[]; // Vendor IDs
  preferences?: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    notifications: boolean;
  };
}

export const USERS: User[] = [
  {
    id: 'u1',
    username: 'admin',
    email: 'admin@bazar.com',
    password: 'admin',
    name: 'Super Admin',
    roles: ['SuperAdmin'],
    joinedDate: '2024-01-10',
    loyaltyPoints: 0,
    followedVendors: [],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
  },
  {
    id: 'u2',
    username: 'vendor',
    email: 'vendor@himalaya.com',
    password: 'vendor',
    name: 'Himalayan Vendor',
    roles: ['Vendor'],
    joinedDate: '2024-02-15',
    loyaltyPoints: 450,
    followedVendors: [],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vendor'
  },
  {
    id: 'u3',
    username: 'user',
    email: 'user@example.com',
    password: 'user',
    name: 'Suman Thapa',
    roles: ['User'],
    joinedDate: '2024-03-20',
    loyaltyPoints: 1250,
    followedVendors: ['v1', 'v2'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suman',
    preferences: {
      theme: 'system',
      language: 'Nepali',
      notifications: true
    }
  },
  {
    id: 'u4',
    username: 'multi',
    email: 'multi@example.com',
    password: 'multi',
    name: 'Adarsh Jha',
    roles: ['Vendor', 'User'],
    joinedDate: '2024-04-05',
    loyaltyPoints: 200,
    followedVendors: ['v3'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Adarsh'
  }
];
