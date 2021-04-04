import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RedditButton from '../../components/RedditButton';
import useLanguage from '../../utils/hooks/useLanguage';
import { extractSubredditImage } from '../../utils/common';

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
  const { iconImageUrl, displayName, displayNamePrefixed } = props;

  const iconUrl = extractSubredditImage(iconImageUrl);

  return (
    <Grid container direction="row">
      <Grid item>
        <Box display="flex" flexDirection="row" alignItems="flex-end">
          <Grid container alignItems="flex-end" direction="row">
            <Grid item md={12} lg={3}>
              <Box marginRight={2}>
                <img
                  className={classes.subredditIcon}
                  src={iconUrl}
                  width={80}
                  height={80}
                />
              </Box>
            </Grid>
            <Grid item md={12} lg={9}>
              <Box marginRight={2} display="flex" flexDirection="row">
                <Box marginBottom={0.5}>
                  <Typography variant="h5">
                    <b>{displayName}</b>
                  </Typography>
                  <Typography variant="body2">{displayNamePrefixed}</Typography>
                </Box>
                <Box marginLeft={3}>
                  <RedditButton>{t('button.join')}</RedditButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SubredditHeader;
