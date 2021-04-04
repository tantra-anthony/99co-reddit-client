import _debounce from 'lodash.debounce';
import numeral from 'numeral';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import _unescape from 'lodash.unescape';

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

export function getDateFromNow(date?: number | string) {
  dayjs.extend(relativeTime);
  return dayjs(date).fromNow();
}

export function unescapeString(string: string) {
  return _unescape(string);
}
