import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  button: {
    borderRadius: 100,
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    textTransform: 'none',
  },
}));

interface RedditButtonProps {
  variant?: 'outlined' | 'contained';
  color?: 'primary' | 'secondary';
  children?: React.ReactNode;
}

function RedditButton(props: RedditButtonProps) {
  const classes = styles();
  const { variant = 'contained', children = null, color = 'primary' } = props;

  return (
    <Button
      size="small"
      color={color}
      classes={{ root: classes.button }}
      disableElevation
      variant={variant}
    >
      <b>{children}</b>
    </Button>
  );
}

export default RedditButton;
