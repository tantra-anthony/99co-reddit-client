import { useLocation } from 'react-router';

function useQuery<T extends DictionaryLike>(): [Partial<T>] {
  const result: Partial<T> = {};
  new URLSearchParams(useLocation().search).forEach((val, key) => {
    Object.assign(result, { [key]: val });
  });
  return [result];
}

export default useQuery;
