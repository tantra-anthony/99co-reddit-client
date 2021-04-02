import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

export default useAppDispatch;
