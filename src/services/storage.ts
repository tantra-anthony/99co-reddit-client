type StorageStrategy = 'local' | 'session';

export function getItemFromStorage(
  key: string,
  strategy: StorageStrategy = 'local',
): string | null {
  const transport: Storage =
    strategy === 'local' ? localStorage : sessionStorage;
  return transport.getItem(key);
}

export function setItemInStorage(
  key: string,
  value: any,
  strategy: StorageStrategy = 'local',
): void {
  const transport: Storage =
    strategy === 'local' ? localStorage : sessionStorage;
  if (typeof value === 'string') {
    transport.setItem(key, value);
    return;
  }

  try {
    const finalValue = JSON.stringify(value);
    transport.setItem(key, finalValue);
  } catch (e) {
    // ignore
  }
}
