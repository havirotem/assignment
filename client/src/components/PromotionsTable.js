import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableRow, TableContainer, Checkbox, TableHead, CircularProgress } from '@material-ui/core';
import ActionButtons from './common/ActionButtons';
import GenerateButton from './common/Button';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 800,
  },
});

export const PromotionTable = (props) => {
  const { data, metadata, isLoading, onAction, onGenerate, currentPage,  pagesCount, onFetchNextPages } = props;
  const classes = useStyles();
  const [checked, setChecked] = useState(null);
  const scrollContainer = useRef(null);

  const handleScroll = () => {
    if (currentPage >= pagesCount || isLoading) return;
    if (scrollContainer.current.scrollTop + scrollContainer.current.offsetHeight >= scrollContainer.current.scrollHeight) {
      onFetchNextPages();
    }
  }

  useEffect(() => {
    scrollContainer.current.addEventListener('scroll', handleScroll);
    return () => scrollContainer.current.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const renderTableHeader = () => {
    const headRow = []
     Object.keys(metadata).forEach((key) => {
      headRow.push(
        <TableCell
          key={key}
        >{metadata[key].key}
        </TableCell>);
    });
    return headRow;
  }

  const handleChange = key => {
    if (key === checked) setChecked(null);
    else setChecked(key);
  };

  const RenderRow = (row) => {
    const tableRow = [];
    const id = row._id;
    tableRow.push(
      <TableCell key={id}>
        <Checkbox key='checkbox'
          checked={id === checked}
          onChange={() => handleChange(id)}
          value="primary"
        />
      </TableCell>
    );
    Object.keys(row).forEach((key) => {
      if (key !== '_id') {
        tableRow.push(
          <TableCell
            key={key}>{(row[key])}
          </TableCell>);
      }
    });
    tableRow.push( checked === id ?
      <TableCell
        key='actionButton'>
          <ActionButtons
            rowId={id}
            onAction={onAction}
            ischecked={checked}/>
      </TableCell> : <TableCell/>
    );
    return tableRow;
  }

  const renderTableContent = () => {
    let promotionList = Object.values(data);
    return promotionList.map((row, index) => {
      return (
        <TableRow
          key={row._id}>{RenderRow(row)}
        </TableRow>
      )
    })
  }

  return (
    <>
    <GenerateButton
      onClick={onGenerate}
      title='Generate new promotions'
    />
    <Paper
      key='paper'
      className={classes.root}>
        <TableContainer
          key='table-conatiner'
          className={classes.container}
          ref={scrollContainer}>
          <Table
            key ='promotion-table'
            stickyHeader
            aria-label='promotion-table'>
            <TableHead key='table-head'>
              {renderTableHeader()}
            </TableHead>
            <TableBody key='table-body' >
            {renderTableContent()}
          </TableBody>
        </Table>
      </TableContainer>
      { isLoading && <CircularProgress />}
    </Paper>
    </>
  );
}

export default PromotionTable;
