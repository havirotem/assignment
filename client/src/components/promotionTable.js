import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableRow, TableContainer, Checkbox, TableHead } from '@material-ui/core';
import ActionButton from './common/ActionButton';
import Button from './common/Button';

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
    if(scrollContainer.current.scrollTop + scrollContainer.current.offsetHeight >= scrollContainer.current.scrollHeight) {
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
      headRow.push(<TableCell key={key}>{metadata[key].key}</TableCell>);
    });
    return headRow;
  }

  const handleChange = key => {
    if(key === checked) setChecked(null);
    else setChecked(key);
  };

  const RenderRow = (row) => {
    const tableRow = [];
    let id = row._id;
    tableRow.push(
      <TableCell key={id}>
        <Checkbox
          checked={id === checked}
          onChange={() => handleChange(id)}
          value="primary"
        />
      </TableCell>
    );
    Object.keys(row).forEach((key) => {
      if (key !== '_id') {
        tableRow.push( <TableCell key={key}> {(row[key])}</TableCell>);
      }
    });
    tableRow.push( checked === id ?
    <TableCell key='actionButton'><ActionButton rowId = { id } onAction = {onAction} ischecked={checked}/></TableCell> : <TableCell/>
    );
    return tableRow;
   }

  const renderTableContent = () => {
    let promotionList = Object.values(data);
    return promotionList.map((row, index)=>{
     return <TableRow key={row._id}>{RenderRow(row)}</TableRow>
      })
  }

  return (
    <>
    <Button onClick={onGenerate} title='generate new promotions' />
      <Paper className={classes.root}>
        <TableContainer className={classes.container} ref={scrollContainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className={classes.tableHead}>
              {renderTableHeader()}
            </TableHead>
            <TableBody>
              {renderTableContent()}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

export default PromotionTable;
