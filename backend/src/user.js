const db = require('./db');

exports.getName = async (req, res) => {
  // const db = getDb();
  try {
    const result = await db.getUser();
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.log('here');
    console.log(err);
  }
};
