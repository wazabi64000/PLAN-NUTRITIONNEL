/**
 * IndexedDB — stockage local offline-first
 */

const DB_NAME = 'meal-planner';
const DB_VERSION = 1;

/** @type {IDBDatabase | null} */
let db = null;

function openDB() {
  return new Promise((resolve, reject) => {
    if (db) return resolve(db);
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const database = req.result;
      if (!database.objectStoreNames.contains('daily')) {
        database.createObjectStore('daily', { keyPath: 'date' });
      }
      if (!database.objectStoreNames.contains('shopping')) {
        database.createObjectStore('shopping', { keyPath: 'id' });
      }
      if (!database.objectStoreNames.contains('settings')) {
        database.createObjectStore('settings', { keyPath: 'key' });
      }
    };
    req.onsuccess = () => {
      db = req.result;
      resolve(db);
    };
    req.onerror = () => reject(req.error);
  });
}

function tx(store, mode = 'readonly') {
  return openDB().then((database) => database.transaction(store, mode).objectStore(store));
}

export async function getDaily(date) {
  const store = await tx('daily');
  return new Promise((resolve, reject) => {
    const req = store.get(date);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

export async function saveDaily(data) {
  const store = await tx('daily', 'readwrite');
  return new Promise((resolve, reject) => {
    const req = store.put(data);
    req.onsuccess = () => resolve(data);
    req.onerror = () => reject(req.error);
  });
}

export async function getOrCreateDaily(date, prefix = '') {
  const key = prefix ? `${prefix}${date}` : date;
  let d = await getDaily(key);
  if (!d) {
    d = {
      date: key,
      waterMl: 0,
      mealsDone: { breakfast: false, lunch: false, snack: false, dinner: false },
    };
    await saveDaily(d);
  }
  return d;
}

export async function getShoppingChecks(week, namespace = 'week') {
  const store = await tx('shopping');
  return new Promise((resolve, reject) => {
    const req = store.get(`${namespace}-${week}`);
    req.onsuccess = () => resolve(req.result?.checked || {});
    req.onerror = () => reject(req.error);
  });
}

export async function saveShoppingChecks(week, checked, namespace = 'week') {
  const store = await tx('shopping', 'readwrite');
  return new Promise((resolve, reject) => {
    const req = store.put({ id: `${namespace}-${week}`, checked });
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function getSetting(key, fallback = null) {
  // Prefer localStorage for settings (sync + simple)
  const ls = localStorage.getItem(`mp_${key}`);
  if (ls !== null) {
    try {
      return JSON.parse(ls);
    } catch {
      return ls;
    }
  }
  const store = await tx('settings');
  return new Promise((resolve) => {
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result?.value ?? fallback);
    req.onerror = () => resolve(fallback);
  });
}

export async function setSetting(key, value) {
  localStorage.setItem(`mp_${key}`, JSON.stringify(value));
  const store = await tx('settings', 'readwrite');
  return new Promise((resolve, reject) => {
    const req = store.put({ key, value });
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function resetAllData() {
  localStorage.clear();
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const stores = ['daily', 'shopping', 'settings'];
    const transaction = database.transaction(stores, 'readwrite');
    stores.forEach((name) => transaction.objectStore(name).clear());
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function initDB() {
  await openDB();
  // Ensure cycle start date
  const start = await getSetting('cycleStart');
  if (!start) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    await setSetting('cycleStart', today.toISOString());
  }
  if ((await getSetting('goal')) === null) await setSetting('goal', 'seche');
  if ((await getSetting('theme')) === null) await setSetting('theme', 'dark');
}
