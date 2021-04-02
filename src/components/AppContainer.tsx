import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const styles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
}));

interface AppContainerProps {
  children: React.ReactNode;
}

function AppContainer(props: AppContainerProps) {
  const { children } = props;
  const classes = styles();

  return <div className={classes.container}>{children}</div>;
}

export default AppContainer;
