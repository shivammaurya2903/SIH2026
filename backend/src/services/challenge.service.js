const Challenge = require('../models/Challenge');

const createChallenge = async (data) => {
  return Challenge.create(data);
};

const getChallenges = async (filter = {}, options = {}) => {
  const query = Challenge.find(filter);

  if (options.page && options.limit) {
    const skip = (options.page - 1) * options.limit;
    query.skip(skip).limit(options.limit);
  }

  query.sort({ createdAt: -1 });

  return query;
};

const getChallengeById = async (id) => {
  return Challenge.findById(id);
};

const updateChallenge = async (id, data) => {
  return Challenge.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true
    }
  );
};

const deleteChallenge = async (id) => {
  return Challenge.findByIdAndDelete(id);
};

module.exports = {
  createChallenge,
  getChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge
};