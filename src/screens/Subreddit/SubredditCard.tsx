import React, { useMemo } from 'react';
import useAppSelector from '../../utils/hooks/useAppSelector';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import UpvoteIcon from '@material-ui/icons/ArrowDropUp';
import CommentIcon from '@material-ui/icons/ChatBubble';
import DownvoteIcon from '@material-ui/icons/ArrowDropDown';
import ShareIcon from '@material-ui/icons/Share';
import SaveIcon from '@material-ui/icons/Bookmark';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import HideIcon from '@material-ui/icons/Block';
import ReportIcon from '@material-ui/icons/Flag';
import { SubredditDisplayTypes } from './types';
import {
  formatNumber,
  getDateFromNow,
  unescapeString,
} from '../../utils/common';
import { ReactComponent as PinLogo } from '../../assets/icons/pin.svg';
import Hidden from '@material-ui/core/Hidden';
import useTheming from '../../utils/hooks/useTheming';
import useLanguage from '../../utils/hooks/useLanguage';
import clsx from 'clsx';
import RedditButton from '../../components/RedditButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useAppDispatch from '../../utils/hooks/useAppDispatch';
import {
  clearThreadVote,
  downvoteThread,
  upvoteThread,
} from '../../store/threads';

const styles = makeStyles((theme) => ({
  pointsContainer: {
    backgroundColor: theme.custom.dropback.card,
    minWidth: 42,
    maxWidth: 42,
  },
  pointyCard: {
    borderRadius: 0,
  },
  pointsCompactContainer: {
    minWidth: 90,
    maxWidth: 90,
  },
  pinnedText: {
    fontSize: 10,
    lineHeight: 1,
  },
  authorText: {
    fontSize: 10,
  },
  titleText: {
    fontWeight: 600,
  },
  actionIcons: {
    fontSize: 16,
  },
  actionText: {
    fontSize: 11,
  },
}));

interface SubredditCardProps {
  threadId: string;
  display: SubredditDisplayTypes;
  top?: boolean;
}

function SubredditCard(props: SubredditCardProps) {
  const { display, top = false } = props;
  const { t } = useLanguage();
  const classes = styles();
  const { palette, breakpoints } = useTheming();
  const isSmDown = useMediaQuery(breakpoints.down('sm'));
  const { threadId } = props;
  const dispatch = useAppDispatch();
  const thread = useAppSelector((state) => state.threads.entities[threadId]);

  const { score, stickied, author, created_utc, title, num_comments, upvoted } =
    thread || {};

  function onUpvotePressed() {
    if (typeof upvoted === 'boolean' && upvoted) {
      dispatch(clearThreadVote(threadId));
      return;
    }
    dispatch(upvoteThread(threadId));
  }

  function onDownvotePressed() {
    if (typeof upvoted === 'boolean' && !upvoted) {
      dispatch(clearThreadVote(threadId));
      return;
    }
    dispatch(downvoteThread(threadId));
  }

  const upvotes = useMemo(() => {
    if (score) {
      let finalScore = score;
      if (typeof upvoted === 'boolean') {
        finalScore = finalScore + (upvoted ? 1 : -1);
      }
      return finalScore > 1000 ? formatNumber(finalScore, '0.0a') : finalScore;
    }

    return 0;
  }, [score, upvoted]);

  const comments = useMemo(() => {
    if (num_comments) {
      return num_comments > 1000
        ? formatNumber(num_comments, '0.0a')
        : num_comments;
    }

    return 0;
  }, [num_comments]);

  const isCard = display === SubredditDisplayTypes.CARD;
  const isCompact = display === SubredditDisplayTypes.COMPACT;
  const isClassic = display === SubredditDisplayTypes.CLASSIC;
  const isPointy = !isCard && !top;

  const createdDate = useMemo(() => {
    return created_utc ? getDateFromNow(created_utc * 1000) : '';
  }, [created_utc]);

  const hasVote = typeof upvoted === 'boolean';
  const isUpvoted = hasVote && upvoted;
  const isDownvoted = hasVote && !upvoted;
  const upvoteTextColor = hasVote
    ? isUpvoted
      ? 'primary'
      : 'secondary'
    : 'textPrimary';

  return (
    <Card
      variant="outlined"
      classes={{ root: clsx(isPointy && classes.pointyCard) }}
    >
      <Box
        justifyContent="space-between"
        display="flex"
        flexDirection="row"
        paddingRight={0.8}
      >
        <Box display="flex" flexDirection="row">
          <Hidden smDown>
            <Box
              paddingX={0.25}
              className={clsx(
                classes.pointsContainer,
                isCompact && classes.pointsCompactContainer,
              )}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Box
                display="flex"
                flexDirection={isCompact ? 'row' : 'column'}
                alignItems="center"
                justifyContent="flex-start"
              >
                <IconButton
                  onClick={onUpvotePressed}
                  disableRipple
                  color={isUpvoted ? 'primary' : 'default'}
                  disableFocusRipple
                  disableTouchRipple
                  size="small"
                >
                  <UpvoteIcon />
                </IconButton>
                <Box marginY={-1}>
                  <Typography variant="caption" color={upvoteTextColor}>
                    <b>{upvotes}</b>
                  </Typography>
                </Box>
                <IconButton
                  onClick={onDownvotePressed}
                  disableRipple
                  color={isDownvoted ? 'secondary' : 'default'}
                  disableFocusRipple
                  disableTouchRipple
                  size="small"
                >
                  <DownvoteIcon />
                </IconButton>
              </Box>
            </Box>
          </Hidden>
          <Box
            padding={1}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            {stickied && isCard ? (
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                marginBottom={2}
              >
                <Box marginRight={1}>
                  <PinLogo fill={palette.success.main} width={16} height={16} />
                </Box>
                <Typography
                  variant="overline"
                  color="textSecondary"
                  classes={{ root: classes.pinnedText }}
                >
                  <b>{t('pinned_by_moderators')}</b>
                </Typography>
              </Box>
            ) : null}
            {isCard && (
              <Box marginBottom={0.8}>
                <Typography
                  color="textSecondary"
                  classes={{ root: classes.authorText }}
                >
                  {t('posted_by_name_date', {
                    date: createdDate,
                    name: `u/${author}`,
                  })}
                </Typography>
              </Box>
            )}
            <Box marginBottom={!isCard ? 0.3 : 0.8}>
              <Typography classes={{ root: classes.titleText }} variant="body1">
                {unescapeString(title || '')}
              </Typography>
            </Box>
            {!isCard && (
              <Box
                marginBottom={isCompact ? 0 : 0.8}
                display="flex"
                flexDirection="row"
                alignItems="center"
              >
                <Typography
                  color="textSecondary"
                  classes={{ root: classes.authorText }}
                >
                  {t('posted_by_name_date', {
                    date: createdDate,
                    name: `u/${author}`,
                  })}
                </Typography>
                {stickied && (
                  <Box marginLeft={1}>
                    <PinLogo
                      fill={palette.success.main}
                      width={12}
                      height={12}
                    />
                  </Box>
                )}
              </Box>
            )}
            {!isCompact && (
              <Box display="flex" flexDirection="row">
                {isSmDown && (
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <IconButton
                      onClick={onUpvotePressed}
                      disableRipple
                      disableFocusRipple
                      disableTouchRipple
                      size="small"
                    >
                      <UpvoteIcon />
                    </IconButton>
                    <Box>
                      <Typography variant="caption">
                        <b>{upvotes}</b>
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={onDownvotePressed}
                      disableRipple
                      disableFocusRipple
                      disableTouchRipple
                      size="small"
                    >
                      <DownvoteIcon />
                    </IconButton>
                  </Box>
                )}
                <RedditButton variant="text" color="default" compact>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box display="flex" alignItems="center" marginRight={0.4}>
                      <CommentIcon
                        color="disabled"
                        classes={{ root: classes.actionIcons }}
                      />
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Typography
                        classes={{ root: classes.actionText }}
                        color="textSecondary"
                      >
                        <b>{t('number_comments', { number: comments })}</b>
                      </Typography>
                    </Box>
                  </Box>
                </RedditButton>
                {!isSmDown && (
                  <>
                    <RedditButton variant="text" color="default" compact>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          marginRight={0.4}
                        >
                          <ShareIcon
                            color="disabled"
                            classes={{ root: classes.actionIcons }}
                          />
                        </Box>
                        <Box display="flex" alignItems="center">
                          <Typography
                            classes={{ root: classes.actionText }}
                            color="textSecondary"
                          >
                            <b>{t('share')}</b>
                          </Typography>
                        </Box>
                      </Box>
                    </RedditButton>
                    <RedditButton variant="text" color="default" compact>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          marginRight={0.4}
                        >
                          <SaveIcon
                            color="disabled"
                            classes={{ root: classes.actionIcons }}
                          />
                        </Box>
                        <Box display="flex" alignItems="center">
                          <Typography
                            classes={{ root: classes.actionText }}
                            color="textSecondary"
                          >
                            <b>{t('save')}</b>
                          </Typography>
                        </Box>
                      </Box>
                    </RedditButton>
                    {isCard && (
                      <Box display="flex" alignItems="center">
                        <IconButton size="small">
                          <MoreIcon
                            color="disabled"
                            classes={{ root: classes.actionIcons }}
                          />
                        </IconButton>
                      </Box>
                    )}
                    {isClassic && (
                      <>
                        <RedditButton variant="text" color="default" compact>
                          <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Box
                              display="flex"
                              alignItems="center"
                              marginRight={0.4}
                            >
                              <HideIcon
                                color="disabled"
                                classes={{ root: classes.actionIcons }}
                              />
                            </Box>
                            <Box display="flex" alignItems="center">
                              <Typography
                                classes={{ root: classes.actionText }}
                                color="textSecondary"
                              >
                                <b>{t('hide')}</b>
                              </Typography>
                            </Box>
                          </Box>
                        </RedditButton>
                        <RedditButton variant="text" color="default" compact>
                          <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Box
                              display="flex"
                              alignItems="center"
                              marginRight={0.4}
                            >
                              <ReportIcon
                                color="disabled"
                                classes={{ root: classes.actionIcons }}
                              />
                            </Box>
                            <Box display="flex" alignItems="center">
                              <Typography
                                classes={{ root: classes.actionText }}
                                color="textSecondary"
                              >
                                <b>{t('report')}</b>
                              </Typography>
                            </Box>
                          </Box>
                        </RedditButton>
                      </>
                    )}
                  </>
                )}
              </Box>
            )}
          </Box>
        </Box>
        {isCompact && (
          <Box display="flex" flexDirection="row">
            <RedditButton variant="text" color="default" compact>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <Box display="flex" alignItems="center" marginRight={0.4}>
                  <CommentIcon
                    color="disabled"
                    classes={{ root: classes.actionIcons }}
                  />
                </Box>
                <Box display="flex" alignItems="center">
                  <Typography
                    classes={{ root: classes.actionText }}
                    color="textSecondary"
                  >
                    <b>{comments}</b>
                  </Typography>
                </Box>
              </Box>
            </RedditButton>

            <Box display="flex" alignItems="center">
              <IconButton size="small">
                <MoreIcon
                  color="disabled"
                  classes={{ root: classes.actionIcons }}
                />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
    </Card>
  );
}

export default SubredditCard;
