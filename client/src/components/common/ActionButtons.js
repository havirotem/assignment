import React from 'react';
import { MenuItem } from '@material-ui/core';

const ActionButtons = ({ rowId, onAction }) => {
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

  const createMenu = () => {
    const menuItems = []
    Object.keys(menuAction).forEach((menuitem) => {
      menuItems.push(
        <MenuItem
          key={[menuitem].name}
          onClick={() => onAction(menuAction[menuitem].name,rowId)}
        >
          {menuAction[menuitem].title}
        </MenuItem>)
    })
    return menuItems;
  }

  return (
    <>
      {createMenu()}
    </>
  );
}

export default ActionButtons;
