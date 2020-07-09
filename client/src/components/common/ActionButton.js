import React, { useState} from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ActionButton = ({ rowId, onAction }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, isOpen] = useState(false);
  const menuAction = [
    {
      title: 'Edit',
      name: 'edit',
    },
    {
      title: 'Delete',
      name: 'delete',
    },
    {
      title: 'Duplicate',
      name: 'duplicate',
    },
  ]

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    isOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const createMenu = () => {
    const menuItems = []
    Object.keys(menuAction).forEach((menuitem) => {
      menuItems.push(<MenuItem onClick={() => onAction(menuAction[menuitem].name,rowId)}>{menuAction[menuitem].title}</MenuItem>)
    })
    return menuItems;
  }

  return (
    <div>
      <Button aria-controls="menu" aria-haspopup="true" onClick={handleClick} open={open}>
      <MoreVertIcon />
      </Button>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {createMenu()}
      </Menu>
    </div>
  );
}

export default ActionButton;
