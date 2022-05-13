/* eslint-disable camelcase */
const db = require('./db');

exports.getName = async (req, res) => {
  console.log(req.params.userId);
  try {
    const result = await db.getUser();
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.log('here');
    console.log(err);
  }
};
