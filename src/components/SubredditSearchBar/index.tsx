import React, { useCallback, useState } from 'react';
import Autocomplete, {
  AutocompleteRenderInputParams,
} from '@material-ui/lab/Autocomplete';
import { searchSubreddit } from '../../services/reddit/subreddit';
import TextField from '@material-ui/core/TextField';
import { debounce } from '../../utils/common';
import { useHistory } from 'react-router';
import useLanguage from '../../utils/hooks/useLanguage';

const initialSuggestions = [
  'gifs',
  'holdmybeer',
  'StartledCats',
  'Pyongyang',
  'DotA2',
];

interface SubredditSearchBarProps {
  onSubmit: (subreddit: string) => void;
  onChangeSubreddit: (name: string) => void;
}

function SubredditSearchBar(props: SubredditSearchBarProps) {
  const { onSubmit, onChangeSubreddit } = props;
  const [subredditName, setSubredditName] = useState<string>('');
  const [subredditSuggestions, setSubredditSuggestions] = useState<string[]>(
    initialSuggestions,
  );
  const { t } = useLanguage();

  function onSubredditNameChange(_: any, newValue: string | null) {
    if (typeof newValue === 'string') {
      setSubredditName(newValue);
      onChangeSubreddit(newValue);
      onChangeSubredditNameDebounced(newValue);
    }
  }

  function onGoKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const { key } = e;
    // TODO: create enum for this
    if (key === 'Enter' && subredditName) {
      onSubmit(subredditName);
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
    <Autocomplete
      freeSolo
      inputValue={subredditName}
      onChange={onSubredditNameChange}
      onInputChange={onSubredditNameChange}
      options={subredditSuggestions}
      renderInput={renderAutocompleteInput}
    />
  );
}

export default SubredditSearchBar;
