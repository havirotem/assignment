const { getPromotions } = require('../../db/logic');

const TOTAL_RECORDS = 20;

async function getAllPromotions(req, res, next) {
  try {
    let nextPage = 1;
    if (req.query.current_page) {
      nextPage = Number(req.query.current_page) + 1;
    }
    const { promotions, promtionLength } = await getPromotions(nextPage, TOTAL_RECORDS);
    const metadata = [
      { key: '', type: 'checkbox' },
      { key: 'Promotion Name', type: 'text' },
      { key: 'Type', type: 'select', options: [{ value: 'Basic' }, { value: 'Common' }, { value: 'Epic' }] },
      { key: 'Start Date', type: 'date' },
      { key: 'End Date', type: 'date' },
      { key: 'User Group Name', value: 'text' },
      { key: 'Action Button', type: 'button' },
    ];
    const pages = (promtionLength / TOTAL_RECORDS);
    res.json({
      promotions,
      metadata,
      totalPages: pages,
      currentPage: nextPage,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllPromotions,
};
