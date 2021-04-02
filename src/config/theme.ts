import { ThemeOptions, createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    custom: {
      default: string;
    };
  }
  interface ThemeOptions {
    custom: {
      default: string;
    };
  }
}

function createAppTheme(options: ThemeOptions) {
  return createMuiTheme({
    ...options,
  });
}

export const lightTheme = () =>
  createAppTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#FF5700',
      },
      secondary: {
        main: '#0079d3',
      },
      background: {
        default: '#f5f5f5',
      },
    },
    custom: {
      default: '#eeeeee',
    },
    typography: {
      fontFamily: "'Open Sans', 'Helvetica', 'Arial', sans-serif",
    },
  });
