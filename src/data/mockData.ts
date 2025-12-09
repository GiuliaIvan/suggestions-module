import { Suggestion, SuggestionsSettings } from '../types';

/** Mock suggestions data matching Vipps MobilePay patterns */
export const mockSuggestions: Suggestion[] = [
  {
    id: '1',
    name: 'Anna Solvang',
    type: 'person',
    initials: 'AS',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=112&h=112&fit=crop&crop=face',
    phoneNumber: '+47 912 34 567',
    isPinned: true,
    isHidden: false,
    pinnedAt: new Date('2024-11-15'),
    lastInteraction: new Date('2024-12-08'),
  },
  {
    id: '2',
    name: 'Daily Coffee',
    type: 'merchant',
    initials: 'DC',
    isPinned: true,
    isHidden: false,
    pinnedAt: new Date('2024-10-20'),
    whySuggested: {
      reason: 'You visit this café every Friday morning',
      shortReason: 'Friday regular',
    },
    lastInteraction: new Date('2024-12-06'),
  },
  {
    id: '3',
    name: 'Erik Olsen',
    type: 'person',
    initials: 'EO',
    phoneNumber: '+47 923 45 678',
    isPinned: false,
    isHidden: false,
    whySuggested: {
      reason: 'You paid Erik 450 kr last week',
      shortReason: 'Paid last week',
    },
    lastInteraction: new Date('2024-12-01'),
  },
  {
    id: '4',
    name: 'Ida Kjær Hansen',
    type: 'person',
    initials: 'IK',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=112&h=112&fit=crop&crop=face',
    phoneNumber: '+47 934 56 789',
    isPinned: false,
    isHidden: false,
    whySuggested: {
      reason: 'Ida requested money from you yesterday',
      shortReason: 'Request yesterday',
    },
    lastInteraction: new Date('2024-12-08'),
  },
  {
    id: '5',
    name: 'Jerry Larsen',
    type: 'person',
    initials: 'JL',
    phoneNumber: '+47 945 67 890',
    isPinned: false,
    isHidden: false,
    whySuggested: {
      reason: 'You and Jerry split bills often',
      shortReason: 'Often split bills',
    },
    lastInteraction: new Date('2024-11-28'),
  },
  {
    id: '6',
    name: 'Selma Kvist',
    type: 'person',
    initials: 'SK',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=112&h=112&fit=crop&crop=face',
    phoneNumber: '+47 956 78 901',
    isPinned: false,
    isHidden: false,
    whySuggested: {
      reason: 'Selma is in your contacts and uses Vipps',
      shortReason: 'In your contacts',
    },
    lastInteraction: new Date('2024-11-20'),
  },
  {
    id: '7',
    name: 'Burger Joint',
    type: 'merchant',
    initials: 'BJ',
    isPinned: false,
    isHidden: false,
    whySuggested: {
      reason: 'You ordered from Burger Joint 3 times this month',
      shortReason: '3x this month',
    },
    lastInteraction: new Date('2024-12-05'),
  },
  {
    id: '8',
    name: 'Martin Steen',
    type: 'person',
    initials: 'MS',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=112&h=112&fit=crop&crop=face',
    phoneNumber: '+47 967 89 012',
    isPinned: false,
    isHidden: false,
    whySuggested: {
      reason: 'Martin sent you 80 kr today',
      shortReason: 'Received today',
    },
    lastInteraction: new Date('2024-12-09'),
  },
  {
    id: '9',
    name: 'Grocery Store',
    type: 'merchant',
    initials: 'GS',
    isPinned: false,
    isHidden: false,
    whySuggested: {
      reason: 'Nearby merchant you\'ve paid before',
      shortReason: 'Nearby',
    },
    lastInteraction: new Date('2024-12-07'),
  },
  {
    id: '10',
    name: 'Daniel Lorentzen',
    type: 'person',
    initials: 'DL',
    phoneNumber: '+47 978 90 123',
    isPinned: false,
    isHidden: false,
    whySuggested: {
      reason: 'Daniel is a frequent contact',
      shortReason: 'Frequent contact',
    },
    lastInteraction: new Date('2024-11-15'),
  },
];

/** Hidden suggestions */
export const mockHiddenSuggestions: Suggestion[] = [
  {
    id: 'h1',
    name: 'Old Colleague',
    type: 'person',
    initials: 'OC',
    isPinned: false,
    isHidden: true,
    hiddenAt: new Date('2024-11-15'),
  },
  {
    id: 'h2',
    name: 'Random Shop',
    type: 'merchant',
    initials: 'RS',
    isPinned: false,
    isHidden: true,
    hiddenAt: new Date('2024-10-28'),
  },
];

/** Default settings */
export const defaultSettings: SuggestionsSettings = {
  isEnabled: true,
  pinnedPosition: 'above',
  showPeople: true,
  showMerchants: true,
  prioritizeRecent: true,
};

