import React, { useState, useEffect } from 'react';
import backend from '../services/backend';
import PromotionTable from './PromotionsTable';
import Form from './common/Form';

export const PromotionTableContainer = () => {
  const [promotions, setPromotions] = useState({});
  const [metadata, setMetadata] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrors] = useState(false);
  const [page, setPage] = useState(1);
  const [init, setInit] = useState(true);
  const [pagesCount, setPagesCount] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [promotionsToEdit, setPromotionToEdit] = useState(null);

  const fetchData = async() => {
    try {
      const res = await backend.getPromotions(page);
      setPromotions(res.promotions);
      setMetadata(res.metadata);
      setInit(false);
      setPage(res.currentPage);
      setPagesCount(res.totalPages);
    } catch(err) {
      setErrors(err);
    }
  }

  const handleNextPage = async () => {
    const res = await backend.getPromotions(page);
    setPage(res.current_page);
    setTimeout(() => {
      setPromotions(prevState => ([...prevState, ...res.promotions]));
      setIsLoading(false);
    }, 1000);
  }

  useEffect(() => {
    if (init) {
      fetchData();
    }
    if (!isLoading) return;
    else {
      handleNextPage();
    }
  }, [isLoading, init]);

  const handleAction = (actionName, rowId) => {
    switch(actionName) {
      case 'delete':
        handleDelete(rowId);
        return;
      case 'duplicate':
        handleDuplicate(rowId);
        return;
      case 'edit':
        handleEdit(rowId);
        return;
    }

  }

  const handleGenerate = async () => {
    try {
      await backend.generatePromotions();
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }

  const handleEdit = (rowId) => {
    const items = promotions.filter(promotion => promotion._id === rowId);
    setOpenForm(true);
    setPromotionToEdit(items);
  }

  const handleDelete = async (rowId) => {
    try {
      await backend.deletePromotion(rowId);
      let items = promotions.filter(promotion => promotion._id !== rowId);
      setPromotions(items);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDuplicate = async (rowId) => {
    try {
      await backend.duplicatePromotion(rowId);
      alert('new promotion added to the list');
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmitForm = async (data) => {
    let id = promotionsToEdit[0]._id;
    setOpenForm(false);
    let diff = Object.keys(data).reduce((diff, key) => {
      if (promotionsToEdit[0][key] === data[key]) return diff
      return {
        ...diff,
        [key]: data[key]
      }
    }, {})
    if (Object.keys(diff).length > 0) {
      try {
        const { data } = await backend.updatePromotion(id,diff);
        const index = promotions.findIndex(x => x._id === data._id)
        const updatePrmotions = [...promotions];
        updatePrmotions[index] = data
        setPromotions(updatePrmotions);
      } catch (err) {
        console.log(err);
      }
    }
    setPromotionToEdit(null);
  };

  return (
    <>
    {openForm && promotionsToEdit &&
      <Form
        open={openForm}
        metadata={metadata}
        items={promotionsToEdit}
        onClose={handleSubmitForm}
        title={'Edit Promotion From'}
     />
    }
    <PromotionTable
      data={promotions}
      metadata={metadata}
      isLoading={isLoading}
      onAction={handleAction}
      onGenerate={handleGenerate}
      currentPage={page}
      pagesCount={pagesCount}
      onFetchNextPages={handleNextPage}
      />
    </>
  );
}

export default PromotionTableContainer;
