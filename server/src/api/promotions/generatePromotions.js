const faker = require('faker');
const { insertPromotions } = require('../../db/logic');

const RECORDS = 10000;

function createFakePromotions() {
  const fakePromotions = [];
  for (let i = 0; i < RECORDS; i += 1) {
    const promotionName = faker.lorem.sentence();
    const Type = faker.random.arrayElement([('Basic', 'Common', 'Epic')]);
    const startDate = faker.date.past().toISOString().split('T')[0];
    const endDate = faker.date.future().toISOString().split('T')[0];
    const userGroupName = faker.random.arrayElement([('Group A', 'Group B', 'Group C')]);
    fakePromotions.push({
      'Promotion Name': promotionName,
      Type,
      'Start Date': startDate,
      'End Date': endDate,
      'User Group Name': userGroupName,
    });
  }
  return fakePromotions;
}

async function generatePromotions(req, res, next) {
  try {
    const fakePromotions = createFakePromotions();
    const initialPromotions = await insertPromotions(fakePromotions);
    res.json({ count: initialPromotions });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  generatePromotions,
};
