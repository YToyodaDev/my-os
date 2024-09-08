import { deleteSticky, updateStickies } from '../api/apiStickies';
import { db } from '../databases';

const toBeSaved = {};
const payload = {};

async function saveData() {
  delete toBeSaved['undefined'];
  Object.keys(toBeSaved).forEach(function (id) {
    console.log('toBeSaved:', toBeSaved);

    toBeSaved[id]?.['body'] !== undefined &&
      (payload['body'] = toBeSaved[id].body);
    toBeSaved[id]?.['position'] !== undefined &&
      (payload['position'] = toBeSaved[id].position);
    toBeSaved[id]?.['colors'] !== undefined &&
      (payload['colors'] = toBeSaved[id].colors);
    toBeSaved[id]?.['size'] !== undefined &&
      (payload['size'] = toBeSaved[id].size);

    updateStickies(id, payload);

    delete toBeSaved[id];
  });
}

async function addToQueue(id, key, value) {
  // key in an object literal when assiging, so we have to wrap it with brackets
  toBeSaved[id]
    ? (toBeSaved[id][key] = JSON.stringify(value))
    : (toBeSaved[id] = { [key]: JSON.stringify(value) });
}

async function handleDelete(event) {
  const btn = event.target; // Refers to deleteBtn
  console.log(event.target);
  const id = btn.dataset.id;
  const thisSticky = btn.closest('.resizable');

  delete toBeSaved[id];
  await db.notes.delete(id);

  thisSticky.remove(); // Removes the card
}

setInterval(saveData, 5000);

export { saveData, handleDelete, addToQueue };
