const { removePromotion } = require('../../db/logic');

async function deletePromotion(req, res, next) {
  try {
    if (!req.query.promotionId) {
      res.json({ error: 'promotionId not exists' }).status(404);
      return;
    }
    const existed = await removePromotion(req.query.promotionId);
    if (!existed) {
      res.json({ error: 'failed to delete promotion' }).status(404);
      return;
    }
    res.json({ success: 'promotion delete' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  deletePromotion,
};
