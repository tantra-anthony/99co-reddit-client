import React, { useEffect, useState } from 'react';
import useLanguage from '../../utils/hooks/useLanguage';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import RedditButton from '../../components/RedditButton';
import { RootState } from '../../store';
import { connect, ConnectedProps } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemePreference } from '../../store/ui/types';
import { changeThemePreference } from '../../store/ui';
import useAppDispatch from '../../utils/hooks/useAppDispatch';
import useAppSelector from '../../utils/hooks/useAppSelector';

const styles = makeStyles(() => ({
  pageContainer: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function Settings() {
  const theme = useAppSelector((state) => state.ui.theme);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferenceWithoutSaved: ThemePreference = prefersDarkMode
    ? 'dark'
    : 'light';
  const currentTheme = theme || preferenceWithoutSaved;

  const [isNightMode, setIsNightMode] = useState<boolean>(
    currentTheme === 'dark',
  );
  const classes = styles();
  const { t } = useLanguage();
  const history = useHistory();
  const dispatch = useAppDispatch();

  function onGoBack() {
    history.goBack();
  }

  function handleNightModeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = e.target;
    setIsNightMode(checked);
  }

  useEffect(() => {
    dispatch(changeThemePreference(isNightMode ? 'dark' : 'light'));
  }, [isNightMode]);

  return (
    <Container
      className={classes.pageContainer}
      classes={{ root: classes.pageContainer }}
      maxWidth="xs"
    >
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        width="100%"
        flexDirection="column"
      >
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>{t('settings.night_mode')}</Typography>
          <Switch
            size="small"
            color="primary"
            checked={isNightMode}
            onChange={handleNightModeChange}
          />
        </Box>
        <Box marginTop={4}>
          <RedditButton onClick={onGoBack} variant="outlined" color="primary">
            {t('not_found.go_back')}
          </RedditButton>
        </Box>
      </Box>
    </Container>
  );
}

export default Settings;
