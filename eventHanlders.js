import { createSticky } from './api/apiStickies';
import {
  addStickyToDom,
  autoGrow,
  dragAndDropSticky,
  handleSaveSticky,
} from './stickies';
import { handleDelete, addToQueue, saveData } from './public/dataManager';
import { handleResizeWindow, handleDragWindow } from './windowActions';
import {
  changeColor,
  resizeSticky,
  showAndHideStickies,
  zIndexManager,
} from './stickies';

const app = document.getElementById('app');
// register even
app.addEventListener('click', (e) => {
  // register event handlers.

  console.log(e.target);
  if (e.target.closest('.card')) {
    zIndexManager(e);
  }
  if (e.target.classList.contains('delete-btn')) {
    handleDelete(e);
  }

  if (e.target.classList.contains('color-picker')) {
    changeColor(e);
  }
});

app.addEventListener('dblclick', (e) => {
  if (e.target.classList.contains('dock-icons')) showAndHideStickies(e);
});

app.addEventListener('contextmenu', async (e) => {
  e.preventDefault();
  console.log('contextmenu');
  if (e.target.classList.contains('dock-icons')) {
    const newItem = await createSticky();
    addStickyToDom(newItem);
  }
});

app.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('card-header')) {
    dragAndDropSticky(e);
  }

  if (e.target.closest('.movable-header')) {
    handleDragWindow(e);
  }

  if (e.target.classList.contains('resizer')) {
    if (e.target.closest('.card')) {
      resizeSticky(e);
    } else {
      handleResizeWindow(e);
    }
  }
});
app.addEventListener('keyup', (e) => {
  if (e.target.closest('.card')) {
    handleSaveSticky(e);
  }
});
app.addEventListener('input', (e) => {
  if (e.target.closest('.card')) {
    autoGrow(e);
  }
});
