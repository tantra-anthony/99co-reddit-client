import React, { useEffect, useMemo } from 'react';
import useLanguage from '../../utils/hooks/useLanguage';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useHistory, useParams } from 'react-router-dom';
import { SubredditContentSortTypes } from '../../services/reddit/subreddit/types';

interface SubredditParams {
  name: string;
  sort: SubredditContentSortTypes;
}

function Subreddit() {
  const { name, sort } = useParams<SubredditParams>();
  const { t } = useLanguage();
  const history = useHistory();

  const sortType = useMemo(() => {
    if (Object.values(SubredditContentSortTypes).includes(sort)) {
      return sort;
    }

    // defaults to hot
    return SubredditContentSortTypes.HOT;
  }, [sort]);

  useEffect(() => {
    // TODO: fetch subreddit here;
  }, [name, sortType]);

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

export default Subreddit;
