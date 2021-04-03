import _debounce from 'lodash.debounce';

export function getPicsumImageUri(id: number): string {
  return `https://picsum.photos/id/${id}/200/300`;
}

export function debounce(func: (...args: any) => any, wait: number) {
  return _debounce(func, wait);
}
