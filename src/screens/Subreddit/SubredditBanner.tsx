import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { extractSubredditImage } from '../../utils/common';

const styles = makeStyles((theme) => ({
  bannerImageContainer: {
    width: '100%',
    height: 228,
    overflow: 'hidden',
    objectFit: 'cover',
  },
  bannerImage: {
    objectFit: 'cover',
    width: '100%',
    height: 228,
  },
}));

interface SubredditBannerProps {
  bannerImageUrl?: string;
}

function SubredditBanner(props: SubredditBannerProps) {
  const { bannerImageUrl } = props;
  const classes = styles();

  const backgroundUrl = extractSubredditImage(bannerImageUrl);

  return (
    <div className={classes.bannerImageContainer}>
      <img src={backgroundUrl} className={classes.bannerImage} />
    </div>
  );
}

export default SubredditBanner;
