import React, { useEffect, useMemo, useState } from 'react';
import useLanguage from '../../utils/hooks/useLanguage';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
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
import SubredditBanner from './SubredditBanner';
import SubredditHeader from './SubredditHeader';
import SubredditAboutCard from './SubredditAboutCard';
import SubredditFilterCard from './SubredditFilterCard';
import { SubredditDisplayTypes } from './types';
import {
  getInitialThreadsForSubreddit,
  getSubsequentThreadsForSubreddit,
} from '../../store/threads';
import SubredditCard from './SubredditCard';
import { changeSubredditDisplayPreference } from '../../store/ui';
import { setSubredditDisplayPreference } from '../../services/ui';
import useTheming from '../../utils/hooks/useTheming';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import InfiniteScroll from 'react-infinite-scroll-component';

const styles = makeStyles((theme) => ({
  subredditTitleContainer: {},
  contentContainer: {
    display: 'flex',
    width: '100%',
  },
  headerContainer: {
    backgroundColor: theme.palette.background.paper,
  },
  cardSpacing: {
    width: '100%',
    height: theme.spacing(1),
  },
  contentNoPadding: {
    // paddingRight: 0,
    // paddingLeft: 0,
  },
  loadMoreContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
  },
}));

interface SubredditParams {
  name: string;
  sort: SubredditContentSortTypes;
}

const CHILD_PER_FETCH = 10;

function LoadingMore() {
  const classes = styles();
  const { t } = useLanguage();

  return (
    <div className={classes.loadMoreContainer}>{`${t('loading')}...`}</div>
  );
}

function Subreddit() {
  const classes = styles();
  const dispType = useAppSelector((state) => state.ui.displayType);
  const [currDisplayType, setCurrDisplayType] = useState<SubredditDisplayTypes>(
    dispType,
  );
  const [hasInit, setHasInit] = useState<boolean>(false);
  const [isSubredditExists, setIsSubredditExists] = useState<boolean>(false);
  const [initialFetched, setInitialFetched] = useState<boolean>(false);
  const { name, sort } = useParams<SubredditParams>();
  const currentAfter = useAppSelector((state) => {
    const list = state.subreddits[sort];
    return list.length > 0 ? list[list.length - 1] : undefined;
  });
  const subreddit = useAppSelector((state) => state.subreddits.entities[name]);
  const history = useHistory();
  const { breakpoints } = useTheming();
  const isSmDown = useMediaQuery(breakpoints.down('sm'));
  const dispatch = useAppDispatch();

  const sortType = useMemo(() => {
    if (Object.values(SubredditContentSortTypes).includes(sort)) {
      return sort;
    }

    // defaults to hot
    return SubredditContentSortTypes.HOT;
  }, [sort]);

  const threadIds = useAppSelector((state) => state.subreddits[sortType]);
  const isCard = currDisplayType === SubredditDisplayTypes.CARD;
  const containerMaxWidth = isCard ? 'md' : 'xl';
  const threadsGridSize = isCard ? 8 : 9;
  const aboutGridSize = isCard ? 4 : 3;

  function loadNext() {
    if (!initialFetched) {
      return;
    }

    dispatch(
      getSubsequentThreadsForSubreddit({
        subreddit: name,
        sort: sortType,
        limit: CHILD_PER_FETCH,
        after: currentAfter,
      }),
    );
  }

  useEffect(() => {
    setSubredditDisplayPreference(currDisplayType);
    dispatch(changeSubredditDisplayPreference(currDisplayType));
  }, [currDisplayType, dispatch]);

  useEffect(() => {
    // TODO: fetch subreddit here;
    setHasInit(false);
    dispatch(getSubredditInfo(name)).then(({ payload }) => {
      setIsSubredditExists(!!payload);
      setHasInit(true);
      dispatch(
        getInitialThreadsForSubreddit({
          subreddit: name,
          sort: sortType,
          limit: CHILD_PER_FETCH,
        }),
      ).then(() => {
        setInitialFetched(true);
      });
    });
  }, [name, sortType, dispatch]);

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
          <div className={classes.headerContainer}>
            <Container maxWidth={containerMaxWidth}>
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
          </div>
          <div className={classes.contentContainer}>
            <Container
              classes={{ root: clsx(isSmDown && classes.contentNoPadding) }}
              maxWidth={containerMaxWidth}
            >
              <Box paddingY={2} className={classes.subredditTitleContainer}>
                <Grid container spacing={3} direction="row">
                  <Grid item sm={12} md={threadsGridSize}>
                    <Box marginBottom={2}>
                      <SubredditFilterCard
                        currentDisplayType={currDisplayType}
                        currentSortType={sort}
                        onChangeDisplayType={onChangeDisplayType}
                        onChangeSortType={onChangeSortType}
                      />
                    </Box>
                    <InfiniteScroll
                      dataLength={threadIds.length}
                      next={loadNext}
                      hasMore
                      loader={<LoadingMore />}
                    >
                      {threadIds.map((id, idx) => (
                        <div>
                          <SubredditCard
                            threadId={id}
                            top={idx === 0}
                            display={currDisplayType}
                          />
                          {isCard && <div className={classes.cardSpacing} />}
                        </div>
                      ))}
                    </InfiniteScroll>
                  </Grid>
                  <Hidden smDown>
                    <Grid item sm={12} md={aboutGridSize}>
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
