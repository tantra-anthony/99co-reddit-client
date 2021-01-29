import { stringify } from 'query-string';

export function toQueryString(query: any): string {
  return `?${stringify(query)}`;
}

export function getPicsumImageUri(id: number): string {
  return `https://picsum.photos/id/${id}/200/300`;
}
