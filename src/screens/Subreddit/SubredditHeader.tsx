import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RedditButton from '../../components/RedditButton';
import useLanguage from '../../utils/hooks/useLanguage';
import { extractSubredditImage } from '../../utils/common';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheming from '../../utils/hooks/useTheming';

const styles = makeStyles((theme) => ({
  subredditIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.palette.common.white,
  },
}));

interface SubredditHeaderProps {
  iconImageUrl?: string;
  displayName?: string;
  displayNamePrefixed?: string;
}

function SubredditHeader(props: SubredditHeaderProps) {
  const classes = styles();
  const { t } = useLanguage();
  const theme = useTheming();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { iconImageUrl, displayName, displayNamePrefixed } = props;

  const iconUrl = extractSubredditImage(iconImageUrl);

  const direction = isSmDown ? 'column' : 'row';
  const align = isSmDown ? 'center' : 'flex-end';

  return (
    <Box
      display="flex"
      width="100%"
      flexDirection={direction}
      alignItems={align}
    >
      <Box marginRight={isSmDown ? 0 : 2} marginBottom={isSmDown ? 1 : 0}>
        <img
          className={classes.subredditIcon}
          src={iconUrl}
          width={80}
          height={80}
        />
      </Box>
      <Box display="flex" flexDirection={isSmDown ? 'column' : 'row'}>
        <Box
          marginBottom={isSmDown ? 1.5 : 0.5}
          display="flex"
          alignItems={isSmDown ? 'center' : 'flex-start'}
          flexDirection="column"
        >
          <Typography variant="h5">
            <b>{displayName}</b>
          </Typography>
          <Typography variant="body2">{displayNamePrefixed}</Typography>
        </Box>
        <Box
          marginLeft={isSmDown ? 0 : 3}
          display={isSmDown ? 'flex' : undefined}
          justifyContent={isSmDown ? 'center' : 'flex-start'}
        >
          <RedditButton>{t('button.join')}</RedditButton>
        </Box>
      </Box>
    </Box>
  );
}

export default SubredditHeader;
