import _debounce from 'lodash.debounce';
import numeral from 'numeral';
import dayjs from 'dayjs';

export function getPicsumImageUri(id: number): string {
  return `https://picsum.photos/id/${id}/200/300`;
}

export function debounce(func: (...args: any) => any, wait: number) {
  return _debounce(func, wait);
}

export function extractSubredditImage(url?: string) {
  if (url) {
    return url.split('?')[0];
  }

  return undefined;
}

export function formatNumber(number?: number | string, format: string = '0,0') {
  return numeral(number).format(format);
}

export function formatDate(
  date?: number | string,
  format: string = 'DD MM YYYY',
) {
  return dayjs(date).format(format);
}
