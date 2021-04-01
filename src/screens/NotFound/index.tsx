import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import { ReactComponent as NotFoundLogo } from '../../assets/icons/notfound.svg';
import useLanguage from '../../utils/hooks/useLanguage';

const styles = makeStyles((theme) => ({
  pageContainer: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
  },
  oopsText: {
    marginBottom: theme.spacing(1),
  },
  text: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  button: {
    marginTop: theme.spacing(2),
  },
  buttonContainer: {
    [theme.breakpoints.down('xs')]: {
      alignSelf: 'center',
      justifySelf: 'center',
    },
  },
  contentContainer: {
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
    },
  },
  grid: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function NotFound() {
  const classes = styles();
  const { t } = useLanguage();
  const theme = useTheme();

  return (
    <Container maxWidth="md" classes={{ root: classes.pageContainer }}>
      <CssBaseline />
      <Grid
        direction="row"
        container
        justify="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item>
          <NotFoundLogo width={theme.spacing(25)} height={theme.spacing(25)} />
        </Grid>
        <Grid item>
          <Grid
            classes={{ root: classes.contentContainer }}
            container
            direction="column"
          >
            <Grid item>
              <Typography
                className={clsx(classes.oopsText, classes.text)}
                variant="h4"
                color="primary"
              >
                {t('not_found.oops')}
              </Typography>
              <Typography className={classes.text} variant="body2">
                {t('not_found.title')}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NotFound;
