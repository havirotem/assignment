import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, DialogTitle, Dialog, MenuItem } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core';
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
      [theme.breakpoints.up('md')]: {
        width: '25vw',
      },
    },
  })
);

const Form = ( props ) => {
  const {open, items, onClose, metadata, title } = props
  const { handleSubmit, register } = useForm();
  const classes = useStyle();

  const onSubmit = (data) => {
    handleCloseForm(data);
  };

  const handleCloseForm = (data) => {
    onClose(data);
  }

  const createFormContent = (items, metadata) => {
    const itemData = []
    Object.keys(metadata).forEach((key) => {
      itemData.push( metadata[key].type !== 'checkbox' &&  metadata[key].type !== 'button' &&
        <TextField
        key = {metadata[key].key}
        name = {metadata[key].key}
        autoFocus
        fullWidth
        label={metadata[key].key}
        defaultValue = {items[0][metadata[key].key]}
        margin='normal'
        type= {metadata[key].type}
        inputRef={register({ required: false })}
        format="MM/dd/yyyy"
      >
      {
        metadata[key].type === 'select' &&
        (metadata[key].options).map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.value}
        </MenuItem>
      ))
      }
      </TextField>
      )
    })
    return itemData;
  }

  return (
    <Dialog open={open} onClose={handleCloseForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid className={classes.container}>
          <DialogTitle className={classes.header}>{title}</DialogTitle>
          {createFormContent(items, metadata)}
            <Button className={classes.submit}
              type='submit'
              fullWidth
            >
              Submit
            </Button>
        </Grid>
      </form>
    </Dialog>
  );
};

export default Form;
