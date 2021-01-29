import { useTheme, Theme } from '@material-ui/core';

function useTheming(): Theme {
  const theme = useTheme();
  return theme;
}

export default useTheming;
