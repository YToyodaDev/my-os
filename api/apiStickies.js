import { db } from '../databases';
import { v4 as uuidv4 } from 'uuid';

const defaultData = {
  body: JSON.stringify(''),
  position: JSON.stringify({
    x: 10,
    y: 50,
  }),
  size: JSON.stringify({
    width: 200,
    height: 200,
  }),
  colors: JSON.stringify({
    colorHeader: '#FFEFBE',
    colorBody: '#FFF5DF',
    colorText: '#18181A',
  }),
};

async function fetchStickies() {
  //1 - Load in data & Add Items
  const data = await db.notes.list();
  console.log(data);
  if (data.total === 0) return null;

  return data;
}
async function createSticky() {
  const payload = defaultData;

  const id = uuidv4();
  const response = await db.notes.create(payload, id);
  payload['$id'] = id;
  return payload;
}
async function updateStickies(id, payload) {
  await db.notes.update(id, payload);
  console.log('updated');
}
async function deleteSticky(id) {
  await db.notes.delete(id);
}

export { createSticky, fetchStickies, updateStickies, deleteSticky };
