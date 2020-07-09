const { editPromotion } = require('../../db/logic');

async function updatePromotion(req, res, next) {
  try {
    const { promotionId, updatedObject } = req.body.params;
    if (!promotionId) {
      res.json({ error: 'promotionId not exists' }).status(404);
      return;
    }
    const edited = await editPromotion(promotionId, updatedObject);
    if (!edited) {
      res.json({ error: 'failed to update promotion' }).status(404);
      return;
    }
    res.json(edited);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  updatePromotion,
};
