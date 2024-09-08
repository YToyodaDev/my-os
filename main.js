import './style.css';
import './resizable.css';
// import data from './data.json'
import colors from './colors.json';
import { db } from './databases';
import { v4 as uuidv4 } from 'uuid';
import { createSticky, fetchStickies } from './api/apiStickies';
import { generateSticky } from './stickies';
import { handleDelete, addToQueue, saveData } from './public/dataManager';
import './eventHanlders';

//Great resource for drag and drop: https://devdojo.com/tnylea/how-to-drag-an-element-using-javascript
//On select, pop up 3 colors on the left side and allow a user to change the colores
// import { attachResizers } from './resizer';

let newPosX = 0,
  newPosY = 0,
  startPosX = 0,
  startPosY = 0;
let selected = null;

async function loadInitialData() {
  //1 - Load in data & Add Items
  console.log('loadInitialData');
  const stickies = await fetchStickies();

  if (!stickies || !stickies.total) return null;
  stickies.documents.forEach((i) => {
    addStickyToDom(i);
  });

  //Set selected element on first load
  selected = document.querySelectorAll('.card-header')[0].parentElement;
}

function addStickyToDom(item) {
  const newSticky = generateSticky(item);

  app.insertAdjacentHTML('beforeend', newSticky);

  //2 - Add event listeners - 2.1 - Delete button Moved to evenHanlder.js

  //2 - Add event listeners - 2.2 - Mouse down event for drag
  const cardHeader = document.querySelector(
    `.card-header[data-id="${item.$id}"]`
  );
  cardHeader.addEventListener('mousedown', mouseDown);
  // 3 - atacch resizers
  const resizableDiv = document.querySelector(
    `.resizable[data-id="${item.$id}"]`
  );
  attachResizers(resizableDiv, item.$id);

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

function mouseMove(e) {
  // calculate the new position
  newPosX = startPosX - e.clientX;
  newPosY = startPosY - e.clientY;

  // with each move we also want to update the start X and Y
  startPosX = e.clientX;
  startPosY = e.clientY;

  // set the element's new position:
  selected.style.top = selected.offsetTop - newPosY + 'px';
  selected.style.left = selected.offsetLeft - newPosX + 'px';
}

function mouseDown(e) {
  e.preventDefault();
  let items = document.querySelectorAll('.card-header');
  const item = e.target;

  startPosX = e.clientX;
  startPosY = e.clientY;

  selected = e.target.parentElement.parentElement;
  //Move element to front end others back
  items.forEach(function (item) {
    item.parentElement.parentElement.style.zIndex = 0;
  });

  selected.style.zIndex = 999;

  //Add, event on mouse down, then remove it on mouse up
  document.addEventListener('mousemove', mouseMove);

  //NOT SURE IF THIS SHOULD BE ADDED HERE.
  document.addEventListener('mouseup', function () {
    console.log('mouse up called');
    const id = selected.dataset.id;
    const lastPosition = {
      x: selected.style.left.replace('px', ''),
      y: selected.style.top.replace('px', ''),
    };
    addToQueue(id, 'position', lastPosition);

    document.removeEventListener('mousemove', mouseMove);
  });
}

loadInitialData();

//4 - Changing card colors
const colorButtons = document.getElementsByClassName('color');

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

//5 - Add Item
const addBtn = document.getElementById('add-btn');
let minimized = false; // Track if the cards are minimized

addBtn.addEventListener('click', async (e) => {
  const cards = document.querySelectorAll('.card');

  const iconRect = addBtn.getBoundingClientRect();
  const iconLeft = iconRect.left + iconRect.width / 2;
  const iconTop = iconRect.top + iconRect.height / 2;

  cards.forEach((card) => {
    const cardRect = card.getBoundingClientRect();
    const cardLeft = cardRect.left + cardRect.width / 2;
    const cardTop = cardRect.top + cardRect.height / 2;

    if (!minimized) {
      // Minimize cards
      // console.log({card.style.transform, } card.style.opacity);
      card.dataset.originalTransform = card.style.transform; // Save original transform
      card.dataset.originalOpacity = '1'; // Save original opacity
      card.dataset.originalPosition = `${cardRect.left},${cardRect.top}`; // Save original position
      const deltaX = iconLeft - cardLeft;
      const deltaY = iconTop - cardTop;
      card.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0)`;
      card.style.opacity = '0';
    } else {
      // Restore cards
      const [originalLeft, originalTop] =
        card.dataset.originalPosition.split(',');
      card.style.transform = card.dataset.originalTransform || ''; // Restore original transform
      card.style.opacity = card.dataset.originalOpacity || '1'; // Restore original opacity
      card.style.left = `${originalLeft}px`;
      card.style.top = `${originalTop}px`;
    }
  });

  minimized = !minimized; // Toggle the minimized state
});

// Optional: Hide the menu if clicked outside
document.addEventListener('click', function (event) {
  var menu = document.getElementById('custom-menu');
  var button = document.getElementById('add-btn');
  if (
    menu.style.display === 'block' &&
    !button.contains(event.target) &&
    !menu.contains(event.target)
  ) {
    menu.style.display = 'none';
  }
});
// Sticky Menu
addBtn.addEventListener('contextmenu', async (e) => {
  //1 - Create new data data & Add Item
  e.preventDefault();
  const payload = await createSticky();
  addStickyToDom(payload);

  //2 - Add event listener
  let items = document.querySelectorAll('.card-header');
  const item = items[items.length - 1];
  selected = item.parentElement;
  item.addEventListener('mousedown', mouseDown);

  //3 - Style cards
  const textArea = item.parentElement.querySelectorAll('textarea')[0];
  textArea.addEventListener('input', autoGrow);
  textArea.addEventListener('keyup', () => {
    addToQueue(textArea.dataset.id, 'body', textArea.value);
  });
  autoGrow.call(textArea);
});

function attachResizers(element, id) {
  const resizers = document.querySelectorAll(`.resizer[data-id="${id}"]`);
  console.log({ element, id, resizers });
  // const resizers = document.querySelectorAll(`.resizer`);
  const minimum_size = 100;
  let original_offSetWidth = 0; // the element width
  let original_offSetHeight = 0; // the element height
  let original_offSetLeft = 0; // the element position from left
  let original_offSetTop = 0; // the element position from top
  let original_mouse_x = 0; // the mouse position from left
  let original_mouse_y = 0; // the mouse position from top
  resizers.forEach((resizer) => {
    resizer.addEventListener('mousedown', function (e) {
      e.preventDefault();
      original_offSetWidth = parseFloat(
        getComputedStyle(element, null)
          .getPropertyValue('width')
          .replace('px', '')
      );
      original_offSetHeight = parseFloat(
        getComputedStyle(element, null)
          .getPropertyValue('height')
          .replace('px', '')
      );
      original_offSetLeft = element.getBoundingClientRect().left;
      original_offSetTop = element.getBoundingClientRect().top;
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    });
    function resize(e) {
      if (resizer.classList.contains('bottom-right')) {
        const width = original_offSetWidth + (e.pageX - original_mouse_x);
        const height = original_offSetHeight + (e.pageY - original_mouse_y);
        if (width > minimum_size) {
          element.style.width = width + 'px';
        }
        if (height > minimum_size) {
          element.style.height = height + 'px';
        }
      } else if (resizer.classList.contains('bottom-left')) {
        const height = original_offSetHeight + (e.pageY - original_mouse_y);
        const width = original_offSetWidth - (e.pageX - original_mouse_x);
        if (height > minimum_size) {
          element.style.height = height + 'px';
        }
        if (width > minimum_size) {
          element.style.width = width + 'px';
          element.style.left =
            original_offSetLeft + (e.pageX - original_mouse_x) + 'px';
        }
      } else if (resizer.classList.contains('top-right')) {
        const width = original_offSetWidth + (e.pageX - original_mouse_x);
        const height = original_offSetHeight - (e.pageY - original_mouse_y);
        if (width > minimum_size) {
          element.style.width = width + 'px';
        }
        if (height > minimum_size) {
          element.style.height = height + 'px';
          element.style.top =
            original_offSetTop + (e.pageY - original_mouse_y) + 'px';
        }
      } else {
        const width = original_offSetWidth - (e.pageX - original_mouse_x);
        const height = original_offSetHeight - (e.pageY - original_mouse_y);
        if (width > minimum_size) {
          element.style.width = width + 'px';
          element.style.left =
            original_offSetLeft + (e.pageX - original_mouse_x) + 'px';
        }
        if (height > minimum_size) {
          element.style.height = height + 'px';
          element.style.top =
            original_offSetTop + (e.pageY - original_mouse_y) + 'px';
        }
      }
      const lastSize = {
        width: element.style.width.replace('px', ''),
        height: element.style.height.replace('px', ''),
      };
      addToQueue(id, 'size', lastSize);
    }

    function stopResize() {
      console.log('stopresize called');
      window.removeEventListener('mousemove', resize);
    }
  });
}
