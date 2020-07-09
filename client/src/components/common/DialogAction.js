import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@material-ui/core';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = responsiveFontSizes(createMuiTheme());

export const useStyle = makeStyles(() =>
  createStyles({
    submit: {
      flexGrow: 1,
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FE6B8B 30%)',
      borderRadius: 3,
      color: 'white',
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff',
    },
    container: {
      flexWrap: 'wrap',
      padding: theme.spacing(2),
    },
  })
);

const DialogAction = ( props ) => {
  const { open, onClose, content, title } = props;
  const classes = useStyle();

  const handleCloseDialog = () => {
    onClose(false);
  };

  return (
    <>
      <Dialog
        onClose={handleCloseDialog}
        aria-labelledby="action-dialog"
        open={open}>
        <Grid className={classes.container}>
          <DialogTitle
            className={classes.header}
            id="action-dialog-title">
            {title}
          </DialogTitle>
          <DialogContent dividers>
            {content}
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={handleCloseDialog}
              color="primary">
              Exit
            </Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </>
  );
}

export default DialogAction;
