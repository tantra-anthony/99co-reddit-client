import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { lightTheme } from './config/theme';
import { routes } from './config/routes';
import { HashRouter, Route, Switch } from 'react-router-dom';
import AppContainer from './components/AppContainer';
import { loadTranslations } from './services/translation';
import CssBaseline from '@material-ui/core/CssBaseline';

loadTranslations();

const styles = makeStyles((theme) => ({
  app: {
    whiteSpace: 'pre-line',
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
}));

function App() {
  const classes = styles();

  return (
    <div className={classes.app}>
      <ThemeProvider theme={lightTheme()}>
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
