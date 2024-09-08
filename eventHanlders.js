import { handleDelete, addToQueue, saveData } from './public/dataManager';
import { dragSticky } from './stickies';

const app = document.getElementById('app');
// register even
app.addEventListener('click', (e) => {
  // register event handlers.

  if (e.target.classList.contains('delete-btn')) {
    handleDelete(e);
  }
  if (e.target.classList.contains('card-header')) {
    dragSticky(e);
  }
});

// app.addEventListener('contextmenu', (e) => {
//   e.preventDefault();

//   console.log('contextmenu triggered by:', e.target);
// });
// app.addEventListener('mousedown', (e) => {
//   console.log('mousedown triggered by:', e.target);
// });
// app.addEventListener('mouseup', (e) => {
//   event.preventDefault(); // Prevents default actions but doesn't stop the click event entirely.
//   event.stopPropagation();
//   console.log('mouseup triggered by:', e.target);
// });
