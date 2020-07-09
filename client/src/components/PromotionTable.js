import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableRow, TableContainer, Checkbox, TableHead } from '@material-ui/core';
import backend from '../services/backend';
import ActionButton from './common/ActionButton';
import GeneratePromotionButton from './common/GeneartePromotionButton';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 800,
  },
  tableHead: {
    backgroundColor: 'red',
  }
});

export const PromotionTable = () => {
  const classes = useStyles();
  const [promotions, setPromotions] = useState({});
  const [columns, setColumns] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [hasError, setErrors] = useState(false);
  const [page, setPage] = useState(1);
  const [checked, setChecked] = useState(null);
  const [isInitial, setInitial] = useState(true);
  const scrollContainer = useRef(null);
  let pagesCount = 0


  const fetchData = async() => {
    try {
      const res = await backend.getPromotions(page);
      setPromotions(res.promotions);
      setColumns(res.headers);
      setInitial(false);
      setPage(res.current_page);
      pagesCount = res.total_pages;
    } catch(err) {
      setErrors(err);
    }
  }

  useEffect(() => {
    scrollContainer.current.addEventListener('scroll', handleScroll);
    return () => scrollContainer.current.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isInitial) {
      fetchData();
    }
    if (!isFetching) return;
    else {
      fetchMoreListItems();
    }

  }, [isFetching, isInitial]);

  const fetchMoreListItems = async () => {
    const res = await backend.getPromotions(page);
    setPage(res.current_page);
    setTimeout(() => {
      setPromotions(prevState => ([...prevState, ...res.promotions]));
      setIsFetching(false);
    }, 1000);
  }


  const handleScroll = () => {
    if (page >= pagesCount || isFetching) return;
    setIsFetching(true);
  }

  const renderTableHeader = () => {
    let header = Object.values(columns);
    return header.map((key, index) => {
       return <TableCell key={index}>{key}</TableCell>
    });
  }

  const handleChange = key => {
    console.log(key);
    if(key === checked) setChecked(null);
    else setChecked(key);
  };

  const RenderRow = (row) => {
    const tableRow = [];
    Object.keys(row).forEach((key) => {
      if (key === '_id') {
        tableRow.push(
          <TableCell key={row[key]}>
            <Checkbox
              checked={row[key] === checked}
              onChange={() => handleChange(row[key])}
              value="primary"
            />
          </TableCell>
        )
      } else {
        tableRow.push(<TableCell key={key}>{row[key]}</TableCell>);
      }
    });
    tableRow.push( checked?
    <TableCell key={7}><ActionButton ischecked={ checked }/></TableCell> : '' //fix this key
    );
    return tableRow;
   }

  const renderTableContent = () => {
    let promotionList = Object.values(promotions);
    return promotionList.map((row, index)=>{
     return  <TableRow key={row._id}>{RenderRow(row)}</TableRow>
      })
  }

  return (
    <>
    <GeneratePromotionButton onGenerate={() => setInitial(true)} />
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
