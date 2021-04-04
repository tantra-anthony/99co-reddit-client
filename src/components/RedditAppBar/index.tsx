import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import RedditButton from '../RedditButton';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import useLanguage from '../../utils/hooks/useLanguage';
import useTheming from '../../utils/hooks/useTheming';
import { useHistory } from 'react-router';
import SubredditSearchBar from '../SubredditSearchBar';

const ITEM_HEIGHT = 48;

const options = ['settings.title'];

const styles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: theme.palette.background.default,
  },
  logo: {
    cursor: 'pointer',
  },
  search: {
    flex: 1,
    maxWidth: 690,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    borderColor: 'black',
    borderWidth: 100,
    backgroundColor:
      theme.palette.type === 'light'
        ? fade(theme.palette.grey[300], 0.4)
        : theme.palette.grey[800],
    '&:hover': {
      backgroundColor:
        theme.palette.type === 'light'
          ? theme.palette.background.default
          : fade(theme.palette.grey[800], 0.8),
    },
    '&:focus': {
      backgroundColor:
        theme.palette.type === 'light'
          ? fade(theme.palette.grey[400], 0.25)
          : theme.palette.grey[700],
      borderColor: theme.palette.primary.main,
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '100%',
    },
  },
}));

function RedditAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = styles();
  const { palette } = useTheming();
  const { t } = useLanguage();
  const history = useHistory();

  function handleMenuClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function onMenuPressed() {
    history.push('/settings');
  }

  function onLogoPressed() {
    history.push('/');
  }

  function onSubmitSubredditSearch(name: string) {
    if (name) {
      history.push(`/r/${name}/hot`);
    }
  }

  function onChangeSubredditName(name: string) {
    // do something
  }

  return (
    <AppBar position="sticky">
      <Toolbar variant="dense" classes={{ root: classes.toolbar }}>
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            onClick={onLogoPressed}
            className={classes.logo}
          >
            <Box marginRight={1}>
              <Logo fill={palette.primary.main} width={30} height={30} />
            </Box>
            <Typography color="textPrimary">{t('app_name')}</Typography>
          </Box>
          <Hidden smDown>
            <div className={classes.search}>
              <SubredditSearchBar
                size="small"
                onSubmit={onSubmitSubredditSearch}
                onChangeSubreddit={onChangeSubredditName}
              />
            </div>
            <Box display="flex" flexDirection="row">
              <Box marginRight={2}>
                <RedditButton variant="outlined" color="secondary">
                  {t('log_in')}
                </RedditButton>
              </Box>
              <Box marginRight={1}>
                <RedditButton variant="contained" color="secondary">
                  {t('sign_up')}
                </RedditButton>
              </Box>
              <Box marginRight={4}>
                <IconButton
                  size="small"
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  onClick={handleMenuClick}
                >
                  <PersonIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={!!anchorEl}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: '20ch',
                    },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem key={option} onClick={onMenuPressed}>
                      {t(option)}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>
          </Hidden>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default RedditAppBar;
