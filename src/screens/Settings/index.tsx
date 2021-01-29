import React from 'react';
import useLanguage from '../../utils/hooks/useLanguage';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';

function Settings() {
  const { t } = useLanguage();
  const history = useHistory();

  function onButtonPressed() {
    history.push('/');
  }

  return (
    <Container maxWidth="lg">
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="column"
      >
        {t('settings')}
        <Button onClick={onButtonPressed} variant="contained" color="primary">
          {t('home')}
        </Button>
      </Box>
    </Container>
  );
}

export default Settings;
