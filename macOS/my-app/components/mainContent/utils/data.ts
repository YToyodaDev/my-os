import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faApple } from '@fortawesome/free-brands-svg-icons'; // Import your icons or replace as needed

export type MenuData = {
  id: number;
  name: string;
  icon?: IconDefinition; // Replace `any` with the actual type if known
  children?: MenuData[];
};

// Updated menu data arrays with unique IDs
export const appleMenuItems: MenuData[] = [
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

export const finder: MenuData[] = [
  { id: 10, name: 'About Finder' },
  { id: 15, name: 'hr' },
  { id: 11, name: 'Settings' },
  { id: 16, name: 'hr' },
  { id: 12, name: 'App Store' },
  { id: 17, name: 'hr' },
  { id: 13, name: 'Force Quit' },
  { id: 14, name: 'Sleep' },
];

export const fileMenuItems: MenuData[] = [
  { id: 19, name: 'New File' },
  { id: 20, name: 'Open' },
  { id: 21, name: 'Save' },
  { id: 22, name: 'Save As' },
  { id: 23, name: 'Print' },
  { id: 24, name: 'Close' },
  { id: 25, name: 'Exit' },
];

export const editMenuItems: MenuData[] = [
  { id: 26, name: 'Undo' },
  { id: 27, name: 'Redo' },
  { id: 28, name: 'Cut' },
  { id: 29, name: 'Copy' },
  { id: 30, name: 'Paste' },
  { id: 31, name: 'Find' },
  { id: 32, name: 'Replace' },
  { id: 33, name: 'Select All' },
];

export const viewMenuItems: MenuData[] = [
  { id: 34, name: 'Zoom In' },
  { id: 35, name: 'Zoom Out' },
  { id: 36, name: 'Fullscreen' },
  { id: 37, name: 'Split View' },
  { id: 38, name: 'Show Sidebar' },
  { id: 39, name: 'Hide Sidebar' },
];

// Create the left menu data using the MenuData type with nested items
export const applicationMenuData: MenuData[] = [
  {
    id: 40,
    name: 'Apple',
    icon: faApple,
    children: appleMenuItems,
  },
  { id: 99, name: 'hr' },
  {
    id: 41,
    name: 'Finder',
    children: finder,
  },
  {
    id: 42,
    name: 'File',
    children: [
      {
        id: 43,
        name: 'New',
        children: [
          { id: 44, name: 'New Document' },
          { id: 45, name: 'New Folder' },
        ],
      },
      { id: 46, name: 'Open' },
      { id: 47, name: 'Save' },
      { id: 48, name: 'Print' },
    ],
  },
  {
    id: 49,
    name: 'Edit',
    children: editMenuItems,
  },
  {
    id: 50,
    name: 'View',
    children: viewMenuItems,
  },
  {
    id: 51,
    name: 'Go',
    children: [
      { id: 52, name: 'Back' },
      { id: 53, name: 'Forward' },
      { id: 54, name: 'Refresh' },
      { id: 55, name: 'Home' },
    ],
  },
  {
    id: 56,
    name: 'Window',
    children: [
      { id: 57, name: 'Minimize' },
      { id: 58, name: 'Zoom' },
      { id: 59, name: 'Bring All to Front' },
    ],
  },
  {
    id: 60,
    name: 'Help',
    children: [
      { id: 61, name: 'Help Center' },
      { id: 62, name: 'Report a Problem' },
      { id: 63, name: 'Give Feedback' },
    ],
  },
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
