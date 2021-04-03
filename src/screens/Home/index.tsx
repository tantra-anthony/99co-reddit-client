import React, { useCallback, useState } from 'react';
import useLanguage from '../../utils/hooks/useLanguage';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import useTheming from '../../utils/hooks/useTheming';
import Autocomplete, {
  AutocompleteRenderInputParams,
} from '@material-ui/lab/Autocomplete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { debounce } from '../../utils/common';
import { searchSubreddit } from '../../services/reddit/subreddit';

const styles = makeStyles(() => ({
  pageContainer: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const initialSuggestions = [
  'gifs',
  'holdmybeer',
  'StartledCats',
  'Pyongyang',
  'DotA2',
];

function Home() {
  const [subredditName, setSubredditName] = useState<string>('');
  const [subredditSuggestions, setSubredditSuggestions] = useState<string[]>(
    initialSuggestions,
  );
  const { breakpoints, palette } = useTheming();
  const isSmDown = useMediaQuery(breakpoints.down('sm'));
  const classes = styles();
  const { t } = useLanguage();
  const history = useHistory();

  function onGoPressed() {
    if (!subredditName) {
      return;
    }

    history.push(`/r/${subredditName}/hot`);
  }

  function onGoKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const { key } = e;
    // TODO: create enum for this
    if (key === 'Enter') {
      onGoPressed();
    }
  }

  function onSubredditNameChange(_: any, newValue: string | null) {
    if (typeof newValue === 'string') {
      setSubredditName(newValue);
      onChangeSubredditNameDebounced(newValue);
    }
  }

  const updateSubredditSuggestions = useCallback((value: string) => {
    if (!value) {
      setSubredditSuggestions(initialSuggestions);
      return;
    }

    searchSubreddit(value, 5).then((results) => {
      const hasMoreThanOne = results.data.dist > 0;
      if (hasMoreThanOne) {
        const suggestions = results.data.children.map(
          (sub) => sub.data.display_name,
        );
        setSubredditSuggestions(suggestions);
        return;
      }

      setSubredditSuggestions(initialSuggestions);
    });
  }, []);

  const onChangeSubredditNameDebounced = useCallback(
    debounce(updateSubredditSuggestions, 500),
    [updateSubredditSuggestions],
  );

  function renderAutocompleteInput(params: AutocompleteRenderInputParams) {
    return (
      <TextField
        {...params}
        variant="outlined"
        color="primary"
        fullWidth
        placeholder={t('search_subreddit')}
        onKeyDown={onGoKeyDown}
      />
    );
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
          <Autocomplete
            freeSolo
            inputValue={subredditName}
            onChange={onSubredditNameChange}
            onInputChange={onSubredditNameChange}
            options={subredditSuggestions}
            renderInput={renderAutocompleteInput}
          />
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
