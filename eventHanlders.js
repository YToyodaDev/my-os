import { createSticky } from './api/apiStickies';
import { addStickyToDom } from './stickies';
import { handleDelete, addToQueue, saveData } from './public/dataManager';
import { resizeWindow } from './resizer';
import {
  changeColor,
  dragSticky,
  resizeSticky,
  showAndHideStickies,
  zIndexManager,
} from './stickies';

const app = document.getElementById('app');
// register even
app.addEventListener('click', (e) => {
  // register event handlers.
  console.log('click');
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
  // register event handlers.
  console.log('mousedown');

  if (e.target.classList.contains('card-header')) {
    dragSticky(e);
  }
  if (e.target.classList.contains('resizer')) {
    console.log('resizer');
    resizeSticky(e);
  }
});
