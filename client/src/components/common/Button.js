import React from 'react';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  generateBotten: {
      margin: theme.spacing(5),
  },
}));


const GeneratePromotionButton = ({ onClick, title }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.generateBotten}>
      <Button variant="contained" color="primary" onClick={onClick}>
        {title}
      </Button>
    </Grid>
  );
}

export default GeneratePromotionButton;
