import './eventHanlders';
import './resizable.css';
import { setupStickyApp } from './stickies';
import './style.css';

async function initializeApp() {
  //1 - Load in data & Add Items
  console.log('Initializing...');
  setupStickyApp();
}

initializeApp();
