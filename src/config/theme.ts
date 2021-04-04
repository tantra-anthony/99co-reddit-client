import { ThemeOptions, createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    custom: {
      default: string;
      dropback: {
        card: string;
      };
    };
  }
  interface ThemeOptions {
    custom: {
      default: string;
      dropback: {
        card: string;
      };
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
      dropback: {
        card: 'rgba(237, 239, 241, 0.8)',
      },
    },
    typography: {
      fontFamily: "'Open Sans', 'Helvetica', 'Arial', sans-serif",
    },
  });

export const darkTheme = () =>
  createAppTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#FF5700',
      },
      secondary: {
        main: '#d7dadc',
      },
    },
    custom: {
      default: '#eeeeee',
      dropback: {
        card: '#343536',
      },
    },
    typography: {
      fontFamily: "'Open Sans', 'Helvetica', 'Arial', sans-serif",
    },
  });
