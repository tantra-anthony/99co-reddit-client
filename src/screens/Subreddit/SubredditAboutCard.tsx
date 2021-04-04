import React from 'react';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useLanguage from '../../utils/hooks/useLanguage';
import { formatDate, formatNumber } from '../../utils/common';

const styles = makeStyles((theme) => ({
  header: {
    width: '100%',
    backgroundColor: theme.palette.primary.main,
  },
  headerText: {
    color: theme.palette.common.white,
  },
}));

interface SubredditAboutCardProps {
  description?: string;
  subscribers?: number;
  subscribersActive?: number;
  created?: number;
}

function SubredditAboutCard(props: SubredditAboutCardProps) {
  const { description, subscribers, subscribersActive, created } = props;
  const { t } = useLanguage();
  const classes = styles();

  return (
    <Card variant="outlined">
      <Box padding={1.5} className={classes.header}>
        <Typography className={classes.headerText} variant="body2">
          <b>{t('about_community')}</b>
        </Typography>
      </Box>
      <Box padding={1.5}>
        <Box marginBottom={1}>
          <Typography variant="body2">{description}</Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          marginBottom={2.5}
        >
          <Box flex={1}>
            <Typography variant="body2">
              <b>{formatNumber(subscribers, '0.0a')}</b>
            </Typography>
            <Typography variant="caption">{t('subscribers')}</Typography>
          </Box>
          <Box flex={1}>
            <Typography variant="body2">
              <b>{formatNumber(subscribersActive, '0.0a')}</b>
            </Typography>
            <Typography variant="caption">{t('active')}</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="body2">
            {t('created_at_time', {
              time: formatDate(created, 'MMMM D, YYYY'),
            })}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default SubredditAboutCard;
