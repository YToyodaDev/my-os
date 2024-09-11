import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faApple } from '@fortawesome/free-brands-svg-icons';
export type MenuData = {
  id: number;
  name?: string;
  icon?: IconDefinition;

  children?: MenuData[];
};

export const appMenuItems: MenuData[] = [
  { id: 1, name: 'About Finder' },
  { id: 2, name: 'hr' },
  { id: 3, name: 'Settings' },
  { id: 4, name: 'App Store' },
  { id: 5, name: 'hr' },
  { id: 6, name: 'Force Quit' },
  { id: 7, name: 'hr' },
  { id: 8, name: 'Sleep' },
  { id: 9, name: 'Restart' },
  { id: 10, name: 'Shut Down...' },
  { id: 11, name: 'hr' },
  { id: 12, name: 'Lock Screen' },
  { id: 13, name: 'Log Out User...' },
];
export const some: MenuData[] = [
  { id: 1, name: 'About Finder' },
  { id: 2, name: 'hr' },
  { id: 3, name: 'Settings' },
  { id: 4, name: 'App Store' },
  { id: 5, name: 'hr' },
  { id: 6, name: 'Force Quit' },
  { id: 7, name: 'hr' },
  { id: 8, name: 'Sleep' },
  { id: 9, name: 'Restart' },
  { id: 10, name: 'Shut Down...' },
  { id: 11, name: 'hr' },
  { id: 12, name: 'Lock Screen' },
  { id: 13, name: 'Log Out User...' },
];

// Sample menu data array
export const appleMenuItems: MenuData[] = [
  { id: 1, name: 'About This Mac' },
  { id: 2, name: 'hr' },
  { id: 3, name: 'System Settings' },
  { id: 4, name: 'App Store' },
  { id: 5, name: 'hr' },
  { id: 6, name: 'Force Quit' },
  { id: 7, name: 'hr' },
  { id: 8, name: 'Sleep' },
  { id: 9, name: 'Restart' },
  { id: 10, name: 'Shut Down...' },
  { id: 11, name: 'hr' },
  { id: 12, name: 'Lock Screen' },
  { id: 13, name: 'Log Out User...' },
];

// Create the left menu data using the MenuData type
export const applicationMenuData: MenuData[] = [
  {
    id: 0,
    name: 'Apple',
    icon: faApple,
    children: appleMenuItems, // Assign appleMenuItems as children to the Apple menu
  },
  { id: 1, name: 'Finder' },
  { id: 2, name: 'File' },
  { id: 3, name: 'Edit' },
  { id: 4, name: 'View' },
  { id: 5, name: 'Go' },
  { id: 6, name: 'Window' },
  { id: 7, name: 'Help' },
];

export type StatusBarItem = {
  id: number;
  name: string;
  url: string;
};

// Create the right status bar data using the StatusBarItem type
export const statusBarData: StatusBarItem[] = [
  { id: 1, name: 's1', url: '/images/statusicons/1.png' },
  { id: 2, name: 's2', url: '/images/statusicons/2.png' },
  { id: 3, name: 's3', url: '/images/statusicons/3.png' },
  { id: 4, name: 's4', url: '/images/statusicons/4.png' },
  { id: 5, name: 's5', url: '/images/statusicons/5.png' },
  { id: 6, name: 's6', url: '/images/statusicons/6.png' },
  { id: 7, name: 's7', url: '/images/statusicons/7.png' },
];
export interface Folder {
  src: string;
  alt: string;
  text: string;
  link: string;
}

export const folders: Folder[] = [
  {
    src: '/images/folder.png',
    alt: 'folder',
    text: 'SelfDrivingCar',
    link: '/nested-nav',
  },
  {
    src: '/images/folder.png',
    alt: 'folder',
    text: 'twelve-grid',
    link: '/twelve-grid',
  },
  {
    src: '/images/folder.png',
    alt: 'folder',
    text: 'glass effect',
    link: '/glass-effect',
  },
  {
    src: '/images/folder.png',
    alt: 'folder',
    text: 'Documents',
    link: '/documents',
  },
];
