import './resizable.css';
import './style.css';
import { fetchStickies } from './api/apiStickies';
import './eventHanlders';
import { addToQueue } from './public/dataManager';
import { generateSticky } from './stickies';

async function loadInitialData() {
  //1 - Load in data & Add Items
  console.log('Loading Data');
  const stickies = await fetchStickies();

  if (!stickies || !stickies.total) return null;
  stickies.documents.forEach((i) => {
    addStickyToDom(i);
  });
}

export function addStickyToDom(item) {
  const newSticky = generateSticky(item);

  app.insertAdjacentHTML('beforeend', newSticky);

  const textArea = document.querySelector(
    `.card-body textarea[data-id="${item.$id}"]`
  );
  textArea.addEventListener('input', autoGrow);
  textArea.addEventListener('keyup', () => {
    addToQueue(textArea.dataset.id, 'body', textArea.value);
  });
  autoGrow.call(textArea);
}

function autoGrow() {
  this.style.height = 'auto'; // Reset the height
  this.style.height = this.scrollHeight + 'px'; // Set the new height
}

loadInitialData();

//4 - Changing card colors
