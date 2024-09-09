import { addToQueue } from './public/dataManager';
import { getCenterCoordinates } from './domUtils';
import { resizeWindow } from './resizer';
import colors from './utils/colors.json';

const APP_ID = 'unique-uuid';
const MINIMUM_WIDTH = 200;
const MINIMUM_HEIGHT = 100;

let minimized = false; // Track if the cards are minimized
const originalStyles = new Map();

let newPosX = 0,
  newPosY = 0,
  startPosX = 0,
  startPosY = 0;
var prevSelected = null;
let currentZIndex = 1000; // Starting point for z-index values

function generateSticky(item) {
  item.body = JSON.parse(item.body);
  item.colors = JSON.parse(item.colors);
  item.position = JSON.parse(item.position);
  item.size = JSON.parse(item.size);
  item.size.width = Math.max(item.size.width, MINIMUM_WIDTH);
  item.size.height = Math.max(item.size.height, MINIMUM_HEIGHT);

  const element = `<div  class="card resizable" data-appId=${APP_ID} style="left:${item.position.x}px;top:${item.position.y}px; width: ${item.size.width}px; height: ${item.size.height}px;" data-id=${item.$id}>
    <div class="resizers"  data-id=${item.$id}>
                            <div  class="card-header" style="background-color:${item.colors.colorHeader};z-index="998"; data-id=${item.$id} ">
                              <svg style="z-index="1001"; id="delete-${item.$id}" data-id=${item.$id} class="delete-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" stroke="#000000" fill="none" stroke-width="1.5"><path d="m6 8 .668 8.681c.148 1.924.222 2.885.84 3.423.068.06.14.115.217.165.685.449 1.63.26 3.522-.118.36-.072.54-.108.721-.111h.064c.182.003.361.039.72.11 1.892.379 2.838.568 3.523.12.076-.05.15-.106.218-.166.617-.538.691-1.5.84-3.423L18 8"></path><path stroke-linecap="round" d="m10.151 12.5.245 3.492M13.849 12.5l-.245 3.492M4 8s4.851 1 8 1 8-1 8-1M8 5l.447-.894A2 2 0 0 1 10.237 3h3.527a2 2 0 0 1 1.789 1.106L16 5"></path></svg>
                            </div>
                            <div class="card-body"  style="background-color:${item.colors.colorBody}">
                              <textarea data-id=${item.$id} style="color:${item.colors.colorText}">${item.body}</textarea>
                            </div>
          <div class="resizer ${item.$id} top-left" data-id=${item.$id}></div>
          <div class="resizer ${item.$id} bottom-right" data-id=${item.$id}></div>
          <div class="resizer ${item.$id} top-right" data-id=${item.$id}></div>
          <div class="resizer ${item.$id} bottom-left" data-id=${item.$id}></div>
        </div>
                          </div>`;
  return element;
}

function showAndHideContextMenu() {}
// eventHandlers

async function showAndHideStickies(e) {
  const dockIcon = e.target;
  const { left: iconLeft, top: iconTop } = getCenterCoordinates(dockIcon);

  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    const cardRect = card.getBoundingClientRect();
    const cardLeft = cardRect.left + cardRect.width / 2;
    const cardTop = cardRect.top + cardRect.height / 2;

    if (!minimized) {
      if (!originalStyles.has(card)) {
        originalStyles.set(card, []);
      }
      originalStyles.get(card).push({
        transform: card.style.transform,
        opacity: card.style.opacity,
        left: cardRect.left,
        top: cardRect.top,
      });

      const deltaX = iconLeft - cardLeft;
      const deltaY = iconTop - cardTop;
      card.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0)`;
      card.style.opacity = '0';
    } else {
      // Restore cards
      const states = originalStyles.get(card);

      if (states && states.length) {
        const lastState = states.pop(); // Get the last saved state
        card.style.transform = lastState.transform || '';
        card.style.opacity = lastState.opacity || '1';
        card.style.left = `${lastState.left}px` || '';
        card.style.top = `${lastState.top}px` || '';
      }
    }
  });

  minimized = !minimized; // Toggle the minimized state
}

function zIndexManager(e) {
  const selected = e.target.closest('.card');
  if (selected !== prevSelected) {
    selected.style.zIndex = ++currentZIndex;
    prevSelected = selected;
    console.log(prevSelected);
  }
}
// let startPosX, startPosY, newPosX, newPosY;
async function resizeSticky(e) {
  const { id, lastSize } = await resizeWindow(e, {
    minWidth: MINIMUM_WIDTH,
    minHeight: MINIMUM_HEIGHT,
  });
  addToQueue(id, 'size', lastSize);
}
function dragSticky(e) {
  e.preventDefault();
  console.log('dragSticky called');

  // Get initial mouse position
  startPosX = e.clientX;
  startPosY = e.clientY;

  // Find the card that was clicked
  let selected = e.target.closest('.card');
  if (!selected) return;

  zIndexManager(e);

  // Add mousemove and mouseup event listeners
  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', mouseUp);

  // Mouse move handler
  function mouseMove(e) {
    console.log('mousemove called');

    // Calculate new positions based on movement
    newPosX = startPosX - e.clientX;
    newPosY = startPosY - e.clientY;

    // Update starting positions for the next move event
    startPosX = e.clientX;
    startPosY = e.clientY;

    // Set the new position of the card
    selected.style.top = `${selected.offsetTop - newPosY}px`;
    selected.style.left = `${selected.offsetLeft - newPosX}px`;
  }

  // Mouse up handler (end dragging)
  function mouseUp(e) {
    console.log('mouse up called');

    // Store the last position of the card
    const id = selected.dataset.id;
    const lastPosition = {
      x: selected.style.left.replace('px', ''),
      y: selected.style.top.replace('px', ''),
    };
    addToQueue(id, 'position', lastPosition);

    // Remove the event listeners
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
  }
}

async function changeColor(e) {
  const colorId = e.target.id;
  const colorSettings = colors.find((color) => color.id === colorId);

  try {
    //Need to update the backend and re-render element
    console.log(prevSelected);
    const head = prevSelected.querySelector('.card-header');
    const body = prevSelected.querySelector('.card-body');

    head.style.backgroundColor = colorSettings.colorHeader;
    body.style.backgroundColor = colorSettings.colorBody;
    const id = prevSelected.dataset.id;
    addToQueue(id, 'colors', colorSettings);
  } catch (error) {
    console.log(error);
  }
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

export {
  generateSticky,
  dragSticky,
  resizeSticky,
  showAndHideStickies,
  zIndexManager,
  changeColor,
  prevSelected,
};
