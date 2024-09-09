import { addToQueue } from './public/dataManager';
import { getCenterCoordinates } from './domUtils';
import { handleResizeWindow, handleDragWindow } from './windowActions';
import colors from './utils/colors.json';
import { fetchStickies } from './api/apiStickies';

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

export async function setupStickyApp() {
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
  // textArea.addEventListener('input', autoGrow);
  // autoGrow.call(textArea);
}

function autoGrow(e) {
  console.log(e.target);
  e.target.style.height = 'auto'; // Reset the height
  e.target.style.height = e.target.scrollHeight + 'px'; // Set the new height
}
function handleSaveSticky(e) {
  const card = e.target.closest('.card');
  addToQueue(card.dataset.id, 'body', e.target.value);
}
function generateSticky(item) {
  item.body = JSON.parse(item.body);
  item.colors = JSON.parse(item.colors);
  item.position = JSON.parse(item.position);
  item.size = JSON.parse(item.size);
  item.size.width = Math.max(item.size.width, MINIMUM_WIDTH);
  item.size.height = Math.max(item.size.height, MINIMUM_HEIGHT);

  const element = `<div  class="card resizable movable" data-appId=${APP_ID} style="left:${item.position.x}px;top:${item.position.y}px; width: ${item.size.width}px; height: ${item.size.height}px;" data-id=${item.$id}>

                            <div  class="card-header" style="background-color:${item.colors.colorHeader};z-index="998"; data-id=${item.$id} ">
                              <svg style="z-index="1001"; id="delete-${item.$id}" data-id=${item.$id} class="delete-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" stroke="#000000" fill="none" stroke-width="1.5"><path d="m6 8 .668 8.681c.148 1.924.222 2.885.84 3.423.068.06.14.115.217.165.685.449 1.63.26 3.522-.118.36-.072.54-.108.721-.111h.064c.182.003.361.039.72.11 1.892.379 2.838.568 3.523.12.076-.05.15-.106.218-.166.617-.538.691-1.5.84-3.423L18 8"></path><path stroke-linecap="round" d="m10.151 12.5.245 3.492M13.849 12.5l-.245 3.492M4 8s4.851 1 8 1 8-1 8-1M8 5l.447-.894A2 2 0 0 1 10.237 3h3.527a2 2 0 0 1 1.789 1.106L16 5"></path></svg>
                            </div>
                            <div class="card-body"  style="background-color:${item.colors.colorBody}">
                              <textarea data-id=${item.$id} style="color:${item.colors.colorText}">${item.body}</textarea>
                            </div>
                                <div class="resizers">
          <div class="resizer top"></div>
          <div class="resizer bottom"></div>          
          <div class="resizer left" ></div>
          <div class="resizer right" ></div>

          <div class="resizer top-left"></div>
          <div class="resizer bottom-right"></div>
          <div class="resizer top-right" ></div>
          <div class="resizer bottom-left" ></div>
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

async function zIndexManager(e) {
  const selected = e.target.closest('.card');

  selected.style.zIndex = ++currentZIndex;
  prevSelected = selected;
  console.log(prevSelected);
}

async function resizeSticky(e) {
  zIndexManager(e);
  const { id, lastSize } = await handleResizeWindow(e, {
    minWidth: MINIMUM_WIDTH,
    minHeight: MINIMUM_HEIGHT,
  });
  addToQueue(id, 'size', lastSize);
}

async function dragSticky(e) {
  zIndexManager(e);
  const { id, lastPosition } = await handleDragWindow(e);
  addToQueue(id, 'position', lastPosition);
}

function changeColor(e) {
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

export {
  autoGrow,
  handleSaveSticky,
  generateSticky,
  resizeSticky,
  showAndHideStickies,
  zIndexManager,
  changeColor,
  dragSticky as dragAndDropSticky,
  prevSelected,
};
