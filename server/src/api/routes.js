const { Router } = require('express');
const { generatePromotions } = require('./promotions/generatePromotions');
const { getAllPromotions } = require('./promotions/getPromotions');
const { deletePromotion } = require('./promotions/deletePromotion');
const { clonePromotion } = require('./promotions/clonePromotion');
const { updatePromotion } = require('./promotions/updatePromotion');

const router = Router();

router.get('/initial', generatePromotions); // should be post
router.get('/', getAllPromotions);
router.delete('/delete', deletePromotion);
router.post('/duplicate', clonePromotion);
router.post('/edit', updatePromotion);

module.exports = router;
