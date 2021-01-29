import React from 'react';
import { LoadingComponentProps } from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import { css } from '@emotion/core';
import GridLoader from 'react-spinners/GridLoader';
import useTheming from '../../utils/hooks/useTheming';

const styles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
  },
  loader: {
    display: 'block',
  },
}));

const loaderOverride = css`
  display: block;
`;

interface LoaderProps extends LoadingComponentProps {}

function Loader(props: LoaderProps) {
  const classes = styles();
  const { palette } = useTheming();

  return (
    <div className={classes.container}>
      <div>
        <GridLoader
          css={loaderOverride}
          color={palette.primary.main}
          size={12}
          loading
        />
      </div>
    </div>
  );
}

export default Loader;
