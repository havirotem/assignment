const { duplicatePromotion } = require('../../db/logic');

async function clonePromotion(req, res, next) {
  try {
    const { promotionId } = req.body.params;
    if (!promotionId) {
      res.json({ error: 'promotionId not exists' }).status(404);
      return;
    }
    const clonedPromotion = await duplicatePromotion(promotionId);
    if (!clonedPromotion) {
      res.json({ error: 'failed to clone promotion' }).status(404);
      return;
    }
    res.json(clonedPromotion.ops[0]);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  clonePromotion,
};
