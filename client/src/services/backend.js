import axios from 'axios';

const promotionPath = 'http://localhost:1337/promotions';

async function getPromotions(currentPage) {
  try {
    const result = await axios.get(promotionPath,{
      params: {
        currentPage
      }
    });
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

async function deletePromotion(promotionId) {
  try {
    const result = await axios.delete(`${promotionPath}/delete`,{
      params: {
        promotionId,
      }
    });
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

async function duplicatePromotion(promotionId) {
  try {
    const result = await axios.post(`${promotionPath}/duplicate`,{
      params: {
        promotionId,
      }
    });
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

async function generatePromotions() {
  try {
    const result = await axios.get(`${promotionPath}/initial`);
    return result;
  } catch (err) {
    console.log(err);
  }
}

async function updatePromotion(promotionId, updatedObject) {
  try {
    const result = await axios.post(`${promotionPath}/edit`,{
      params: {
        promotionId,
        updatedObject
      }
    });
    return result;
  } catch (err) {
    console.log(err);
  }
}

export default {
  getPromotions,
  deletePromotion,
  duplicatePromotion,
  generatePromotions,
  updatePromotion,
}
