import './resizable.css';
import './style.css';
// import data from './data.json'
import { fetchStickies } from './api/apiStickies';
import colors from './colors.json';
import './eventHanlders';
import { addToQueue } from './public/dataManager';
import { generateSticky } from './stickies';

//Great resource for drag and drop: https://devdojo.com/tnylea/how-to-drag-an-element-using-javascript
//On select, pop up 3 colors on the left side and allow a user to change the colores
// import { attachResizers } from './resizer';

// let selected = null;
async function loadInitialData() {
  //1 - Load in data & Add Items
  console.log('loadInitialData');
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
const colorButtons = document.getElementsByClassName('color-picker');

for (let i = 0; i < colorButtons.length; i++) {
  const button = colorButtons[i];
  button.addEventListener('click', (e) => {
    updateButtonColor(e, colorButtons[i]);
  });
}

async function updateButtonColor(e, button) {
  const colorId = e.target.id;
  const colorSettings = colors.find((color) => color.id === colorId);

  try {
    //Need to update the backend and re-render element
    const head = selected.getElementsByClassName('card-header')[0];
    const body = selected.getElementsByClassName('card-body')[0];
    head.style.backgroundColor = colorSettings.colorHeader;
    body.style.backgroundColor = colorSettings.colorBody;

    const id = selected.dataset.id;
    addToQueue(id, 'colors', colorSettings);
  } catch (error) {
    alert('You need to select a card first before updating a color..');
  }
}
