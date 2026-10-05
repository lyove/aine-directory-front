export function getStorage<T>(key: string, defaultValue: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error('Failed to set storage:', key);
  }
}

export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    console.error('Failed to remove storage:', key);
  }
}

export function clearStorage(): void {
  try {
    localStorage.clear();
  } catch {
    console.error('Failed to clear storage');
  }
}