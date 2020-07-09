const { getDb } = require('./mongodb');
const { ObjectID } = require('mongodb');

const COLLECTION_NAME = 'promotions';

async function getConnection() {
  const db = await getDb();
  return db.collection(COLLECTION_NAME);
}
async function getPromotions(nextPage, totalRecords) {
  try {
    const collection = await getConnection();
    const skipRecords = totalRecords * (nextPage - 1);
    const promotions = await collection.find().limit(totalRecords).skip(skipRecords).toArray();
    const promtionLength = await collection.find().count();
    return { promotions, promtionLength };
  } catch (err) {
    throw new Error('no enteris found');
  }
}

async function removePromotion(promotionId) {
  const collection = await getConnection();
  try {
    const id = new ObjectID(promotionId);
    const { deletedCount } = await collection.deleteOne({ _id: id });
    return deletedCount === 1;
  } catch (err) {
    throw new Error('Promotion deletion failed');
  }
}
async function insertPromotions(promotions) {
  const collection = await getConnection();
  try {
    await collection.drop();
  } catch (err) {
    console.log('no collection found');
  }
  const newPromotions = await collection.insertMany(promotions);
  return newPromotions;
}

async function duplicatePromotion(promotionId) {
  const collection = await getConnection();
  const id = new ObjectID(promotionId);
  const promotionData = await collection.findOne({ _id: id });
  if (!promotionData) {
    throw new Error('Promotion not found');
  }
  // eslint-disable-next-line no-underscore-dangle
  delete promotionData._id;
  const clonedPromotion = await collection.insertOne(promotionData);
  return clonedPromotion;
}

async function editPromotion(promotionId, updateData) {
  const collection = await getConnection();
  const id = new ObjectID(promotionId);
  const promotionData = await collection.findOne({ _id: id });
  if (!promotionData) {
    throw new Error('Promotion not found');
  }
  const { modifiedCount } = await collection.updateOne({ _id: id }, { $set: updateData });
  if (modifiedCount === 1) {
    const modified = await collection.findOne({ _id: id });
    return modified;
  }
  return undefined;
}

module.exports = {
  editPromotion,
  getPromotions,
  insertPromotions,
  removePromotion,
  duplicatePromotion,
};
