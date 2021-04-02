import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Hidden from '@material-ui/core/Hidden';
import RedditButton from '../RedditButton';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import useLanguage from '../../utils/hooks/useLanguage';
import useTheming from '../../utils/hooks/useTheming';

const ITEM_HEIGHT = 48;

const options = ['night_mode'];

const styles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: theme.palette.background.default,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.grey[300], 0.4),
    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.grey[400], 0.25),
      borderColor: theme.palette.primary.main,
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    fontSize: 14,
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function RedditAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = styles();
  const { palette } = useTheming();
  const { t } = useLanguage();

  function handleMenuClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <AppBar position="sticky">
      <Toolbar variant="dense" classes={{ root: classes.toolbar }}>
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <Box marginRight={1}>
              <Logo fill={palette.primary.main} width={30} height={30} />
            </Box>
            <Typography color="textPrimary">{t('app_name')}</Typography>
          </Box>
          <Hidden smDown>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon color="disabled" />
              </div>
              <InputBase
                placeholder={t('search')}
                classes={{
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
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
                    <MenuItem key={option} onClick={handleClose}>
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
