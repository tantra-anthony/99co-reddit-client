import React, { useState } from 'react';
import useLanguage from '../../utils/hooks/useLanguage';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import useTheming from '../../utils/hooks/useTheming';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SubredditSearchBar from '../../components/SubredditSearchBar';

const styles = makeStyles(() => ({
  pageContainer: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function Home() {
  const [subredditName, setSubredditName] = useState<string>('');
  const { breakpoints, palette } = useTheming();
  const isSmDown = useMediaQuery(breakpoints.down('sm'));
  const classes = styles();
  const { t } = useLanguage();
  const history = useHistory();

  function onSubmit(name: string) {
    if (!subredditName) {
      return;
    }

    history.push(`/r/${subredditName}/hot`);
  }

  function onGoPressed() {
    onSubmit(subredditName);
  }

  return (
    <Container
      className={classes.pageContainer}
      classes={{ root: classes.pageContainer }}
      maxWidth="sm"
    >
      <Box
        justifyContent="center"
        display="flex"
        width="100%"
        flexDirection="column"
      >
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginBottom={2}
        >
          <Logo fill={palette.primary.main} width={100} height={100} />
        </Box>
        <Box width="100%" display="flex" justifyContent="center">
          {t('home')}
        </Box>
        <Box marginY={2}>
          <SubredditSearchBar
            onChangeSubreddit={setSubredditName}
            onSubmit={onSubmit}
          />
          {/* <Autocomplete
            freeSolo
            inputValue={subredditName}
            onChange={onSubredditNameChange}
            onInputChange={onSubredditNameChange}
            options={subredditSuggestions}
            renderInput={renderAutocompleteInput}
          /> */}
        </Box>
        <Box
          width="100%"
          alignItems="center"
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            fullWidth={isSmDown}
            onClick={onGoPressed}
            disabled={!subredditName}
            variant="contained"
            color="primary"
          >
            {t('button.go')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
