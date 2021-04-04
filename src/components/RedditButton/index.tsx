import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  buttonBase: {
    borderRadius: 100,
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    textTransform: 'none',
  },
  buttonCompact: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
}));

interface RedditButtonProps {
  variant?: 'outlined' | 'contained' | 'text';
  color?: 'primary' | 'secondary' | 'default';
  compact?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

function RedditButton(props: RedditButtonProps) {
  const classes = styles();
  const {
    variant = 'contained',
    children = null,
    color = 'primary',
    compact = false,
    onClick = () => {},
    icon = null,
  } = props;

  return (
    <Button
      size="small"
      color={color}
      onClick={onClick}
      classes={{
        root: clsx(classes.buttonBase, compact && classes.buttonCompact),
      }}
      disableElevation
      variant={variant}
    >
      {icon ? (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Box display="flex" alignItems="center" marginRight={0.8}>
            {icon}
          </Box>
          <div>{children}</div>
        </Box>
      ) : (
        <b>{children}</b>
      )}
    </Button>
  );
}

export default RedditButton;
