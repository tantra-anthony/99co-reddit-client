import React, { useEffect, useMemo } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { lightTheme, darkTheme } from './config/theme';
import { routes } from './config/routes';
import { HashRouter, Route, Switch } from 'react-router-dom';
import AppContainer from './components/AppContainer';
import { loadTranslations } from './services/translation';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useDispatch } from 'react-redux';
import {
  rehydrateSubredditDisplayPreference,
  rehydrateThemePreference,
} from './store/ui';
import { setThemePreference } from './services/ui';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemePreference } from './store/ui/types';
import useAppSelector from './utils/hooks/useAppSelector';

loadTranslations();

const styles = makeStyles((theme) => ({
  app: {
    whiteSpace: 'pre-line',
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
}));

function App() {
  const theme = useAppSelector((state) => state.ui.theme);
  const classes = styles();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const dispatch = useDispatch();

  const preferenceWithoutSaved: ThemePreference = prefersDarkMode
    ? 'dark'
    : 'light';

  const preferredTheme = useMemo(() => {
    return theme === 'dark' ? darkTheme() : lightTheme();
  }, [theme]);

  useEffect(() => {
    dispatch(rehydrateThemePreference(preferenceWithoutSaved));
    dispatch(rehydrateSubredditDisplayPreference());
  }, [dispatch, preferenceWithoutSaved]);

  useEffect(() => {
    if (theme) {
      setThemePreference(theme);
    }
  }, [theme]);

  return (
    <div className={classes.app}>
      <ThemeProvider theme={preferredTheme}>
        <CssBaseline />
        <AppContainer>
          <HashRouter>
            <Switch>
              {routes.map((options) => (
                <Route
                  key={options.key}
                  exact={!!options.exact}
                  path={options.path || options.link}
                  component={options.component}
                />
              ))}
            </Switch>
          </HashRouter>
        </AppContainer>
      </ThemeProvider>
    </div>
  );
}

export default App;
