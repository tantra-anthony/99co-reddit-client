import React, { useMemo, useState } from 'react';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import HotIcon from '@material-ui/icons/Whatshot';
import TopIcon from '@material-ui/icons/Equalizer';
import NewIcon from '@material-ui/icons/NewReleases';
import CardIcon from '@material-ui/icons/ViewStream';
import CompactIcon from '@material-ui/icons/ViewHeadline';
import ClassicIcon from '@material-ui/icons/ViewList';
import DownIcon from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { SubredditContentSortTypes } from '../../services/reddit/subreddit/types';
import RedditButton from '../../components/RedditButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useLanguage from '../../utils/hooks/useLanguage';
import { SubredditDisplayTypes } from './types';

const ITEM_HEIGHT = 48;

interface SubredditFilterCard {
  onChangeSortType: (sort: SubredditContentSortTypes) => void;
  onChangeDisplayType: (type: SubredditDisplayTypes) => void;
  currentSortType: SubredditContentSortTypes;
  currentDisplayType: SubredditDisplayTypes;
}

function SubredditFilterCard(props: SubredditFilterCard) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {
    currentSortType,
    currentDisplayType,
    onChangeSortType,
    onChangeDisplayType,
  } = props;
  const { t } = useLanguage();

  const displayTypes = useMemo(() => {
    return Object.values(SubredditDisplayTypes).map((val) => {
      let Icon = CardIcon;
      switch (val) {
        case SubredditDisplayTypes.CARD: {
          break;
        }
        case SubredditDisplayTypes.CLASSIC: {
          Icon = ClassicIcon;
          break;
        }
        case SubredditDisplayTypes.COMPACT: {
          Icon = CompactIcon;
          break;
        }
        default: {
          break;
        }
      }

      return {
        value: val,
        Icon,
      };
    });
  }, []);

  const selectedIcon = useMemo(() => {
    return displayTypes.reduce(
      (acc, val) => {
        if (val.value === currentDisplayType) {
          return val;
        }

        return acc;
      },
      {
        value: currentDisplayType,
        Icon: HotIcon,
      },
    );
  }, [currentDisplayType]);

  const sortTypes = useMemo(() => {
    return Object.values(SubredditContentSortTypes).map((val) => {
      let Icon = HotIcon;
      switch (val) {
        case SubredditContentSortTypes.HOT: {
          break;
        }
        case SubredditContentSortTypes.NEW: {
          Icon = NewIcon;
          break;
        }
        case SubredditContentSortTypes.TOP: {
          Icon = TopIcon;
          break;
        }
        default: {
          break;
        }
      }

      return {
        value: val,
        Icon,
      };
    });
  }, []);

  function onSortTypeClicked(value: SubredditContentSortTypes) {
    onChangeSortType(value);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  function onMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function onSelectDisplayType(displayType: SubredditDisplayTypes) {
    onChangeDisplayType(displayType);
    handleCloseMenu();
  }

  return (
    <Card variant="outlined">
      <Box
        padding={1.5}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="row">
          {sortTypes.map((obj) => {
            const isSelected = currentSortType === obj.value;
            const iconColor = isSelected ? 'primary' : 'disabled';
            const textColor = isSelected ? 'primary' : 'textSecondary';
            return (
              <Box marginRight={1}>
                <RedditButton
                  variant={isSelected ? 'contained' : 'text'}
                  color="default"
                  compact
                  icon={<obj.Icon color={iconColor} />}
                  onClick={() => onSortTypeClicked(obj.value)}
                >
                  <Typography variant="subtitle2" color={textColor}>
                    <b>{t(`sort_types.${obj.value}`)}</b>
                  </Typography>
                </RedditButton>
              </Box>
            );
          })}
        </Box>
        <Box>
          <RedditButton
            variant="text"
            compact
            color="default"
            onClick={onMenuOpen}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <Box display="flex" alignItems="center">
                <selectedIcon.Icon color="secondary" />
              </Box>
              <Box marginLeft={-0.2} display="flex" alignItems="center">
                <DownIcon color="secondary" fontSize="small" />
              </Box>
            </Box>
          </RedditButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={!!anchorEl}
            elevation={0}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >
            {displayTypes.map((option) => {
              const isSelected = currentDisplayType === option.value;
              return (
                <MenuItem
                  key={option.value}
                  selected={isSelected}
                  onClick={() => onSelectDisplayType(option.value)}
                >
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Box display="flex" alignItems="center" marginRight={1}>
                      <option.Icon
                        color={isSelected ? 'secondary' : 'disabled'}
                      />
                    </Box>
                    <Typography
                      variant="subtitle2"
                      color={isSelected ? 'secondary' : 'textSecondary'}
                    >
                      {t(`display_types.${option.value}`)}
                    </Typography>
                  </Box>
                </MenuItem>
              );
            })}
          </Menu>
        </Box>
      </Box>
    </Card>
  );
}

export default SubredditFilterCard;
