import { openDB } from 'idb';

export interface IData {
  id: string;
  data: unknown;
  timestamp: string; // Add timestamp to IData interface
}

const DATABASE_NAME = 'apiStore';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'apiData';

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(db) {
    db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

export const saveData = async (key: string, data: unknown) => {
  const currentTimestamp = new Date().toISOString();
  const db = await dbPromise;
  const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
  const store = tx.objectStore(OBJECT_STORE_NAME);
  await store.put({ id: key, data: data, timestamp: currentTimestamp }); // Store timestamp with data
  await tx.done;
};

export const loadData = async (key: string, durationInHours = 10) => {
  const db = await dbPromise;
  const tx = db.transaction(OBJECT_STORE_NAME);
  const store = tx.objectStore(OBJECT_STORE_NAME);
  const item = await store.get(key);
  await tx.done;

  if (!item) return null;

  const durationInMs = durationInHours * 60 * 60 * 1000;
  const savedDataTimestamp = new Date(item.timestamp);
  const now = new Date();

  if (now.getTime() - savedDataTimestamp.getTime() > durationInMs) {
    await deleteData(key);
    return null;
  }

  return item.data; // Return only data here
};


export const deleteData = async (key: string) => {
  const db = await dbPromise;
  const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
  const store = tx.objectStore(OBJECT_STORE_NAME);
  await store.delete(key);
  await tx.done;
};

export const updateData = async (key: string, data: unknown) => {
  const currentTimestamp = new Date().toISOString();
  const db = await dbPromise;
  const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
  const store = tx.objectStore(OBJECT_STORE_NAME);
  await store.put({ id: key, data: data, timestamp: currentTimestamp }); // Update timestamp when updating data
  await tx.done;
};
