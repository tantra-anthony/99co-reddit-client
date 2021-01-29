import React from 'react';
import useLanguage from '../../utils/hooks/useLanguage';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';

function Home() {
  const { t } = useLanguage();
  const history = useHistory();

  function onButtonPressed() {
    history.push('/settings');
  }

  return (
    <Container maxWidth="lg">
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="column"
      >
        {t('home')}
        <Button onClick={onButtonPressed} variant="contained" color="primary">
          {t('settings')}
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
