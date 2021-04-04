import React, { useEffect, useMemo, useState } from 'react';
import useLanguage from '../../utils/hooks/useLanguage';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Hidden from '@material-ui/core/Hidden';
import { Helmet } from 'react-helmet';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { SubredditContentSortTypes } from '../../services/reddit/subreddit/types';
import { makeStyles } from '@material-ui/core/styles';
import RedditAppBar from '../../components/RedditAppBar';
import useAppDispatch from '../../utils/hooks/useAppDispatch';
import { getSubredditInfo } from '../../store/subreddits';
import { LoaderWithoutProps } from '../Loader';
import useAppSelector from '../../utils/hooks/useAppSelector';
import { extractSubredditImage } from '../../utils/common';
import RedditButton from '../../components/RedditButton';
import SubredditBanner from './SubredditBanner';
import SubredditHeader from './SubredditHeader';
import SubredditAboutCard from './SubredditAboutCard';
import SubredditFilterCard from './SubredditFilterCard';
import { SubredditDisplayTypes } from './types';

const styles = makeStyles((theme) => ({
  subredditTitleContainer: {},
  contentContainer: {
    display: 'flex',
    width: '100%',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.background.default
        : theme.palette.secondary.main,
  },
}));

interface SubredditParams {
  name: string;
  sort: SubredditContentSortTypes;
}

function Subreddit() {
  const classes = styles();
  const [currDisplayType, setCurrDisplayType] = useState<SubredditDisplayTypes>(
    SubredditDisplayTypes.CARD,
  );
  const [hasInit, setHasInit] = useState<boolean>(false);
  const [isSubredditExists, setIsSubredditExists] = useState<boolean>(false);
  const { name, sort } = useParams<SubredditParams>();
  const subreddit = useAppSelector((state) => state.subreddits.entities[name]);
  const { t } = useLanguage();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const sortType = useMemo(() => {
    if (Object.values(SubredditContentSortTypes).includes(sort)) {
      return sort;
    }

    // defaults to hot
    return SubredditContentSortTypes.HOT;
  }, [sort]);

  useEffect(() => {
    // TODO: fetch subreddit here;
    setHasInit(false);
    dispatch(getSubredditInfo(name)).then(({ payload }) => {
      setIsSubredditExists(!!payload);
      setHasInit(true);
    });
  }, [name, sortType]);

  if (hasInit && !isSubredditExists) {
    return <Redirect to="/404" />;
  }

  function onChangeDisplayType(disp: SubredditDisplayTypes) {
    setCurrDisplayType(disp);
  }

  function onChangeSortType(type: SubredditContentSortTypes) {
    history.push(`/r/${name}/${type}`);
  }

  return (
    <div>
      <Helmet>
        <title>{`r/${name}`}</title>
      </Helmet>
      <RedditAppBar />
      {!hasInit ? (
        <LoaderWithoutProps />
      ) : (
        <>
          <SubredditBanner
            bannerImageUrl={subreddit?.banner_background_image}
          />
          <Container maxWidth="md">
            <Box
              marginTop={-2}
              paddingBottom={4}
              className={classes.subredditTitleContainer}
            >
              <SubredditHeader
                iconImageUrl={subreddit?.icon_img}
                displayName={subreddit?.display_name}
                displayNamePrefixed={subreddit?.display_name_prefixed}
              />
            </Box>
          </Container>
          <div className={classes.contentContainer}>
            <Container maxWidth="md">
              <Box paddingY={4} className={classes.subredditTitleContainer}>
                <Grid container spacing={3} direction="row">
                  <Grid item sm={12} md={8}>
                    <Hidden smDown>
                      <SubredditFilterCard
                        currentDisplayType={currDisplayType}
                        currentSortType={sort}
                        onChangeDisplayType={onChangeDisplayType}
                        onChangeSortType={onChangeSortType}
                      />
                    </Hidden>
                  </Grid>
                  <Hidden smDown>
                    <Grid item sm={12} md={4}>
                      <SubredditAboutCard
                        description={subreddit?.public_description}
                        subscribers={subreddit?.subscribers}
                        subscribersActive={subreddit?.accounts_active}
                        created={subreddit ? subreddit.created * 1000 : 0}
                      />
                    </Grid>
                  </Hidden>
                </Grid>
              </Box>
            </Container>
          </div>
        </>
      )}
    </div>
  );
}

export default Subreddit;
