import { handleDelete, addToQueue, saveData } from './public/dataManager';
import { dragSticky, showAndHideStickies } from './stickies';

const app = document.getElementById('app');
// register even
app.addEventListener('click', (e) => {
  // register event handlers.
  console.log('click');
  if (e.target.classList.contains('delete-btn')) {
    handleDelete(e);
  }
});
app.addEventListener('dblclick', (e) => {
  if (e.target.classList.contains('dock-icons')) showAndHideStickies(e);
});

app.addEventListener('contextmenu', async (e) => {
  e.preventDefault();
  console.log('contextmenu');
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
app.addEventListener('mousedown', (e) => {
  // register event handlers.
  console.log('mousedown');

  if (e.target.classList.contains('card-header')) {
    dragSticky(e);
  }
});
