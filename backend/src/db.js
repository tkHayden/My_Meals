const {Pool} = require('pg');

const pool = new Pool({
  host: 'postgres',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.getAllGroceryLists = async (userId) => {
  const select = 'SELECT * FROM grocery_list WHERE user_id = $1';
  const query = {
    text: select,
    values: [userId],
  };
  const {rows} = await pool.query(query);
  return rows.length == 0 ? false : rows;
};

exports.createGroceryList = async (userId, listName) => {
  try {
    const select = 'INSERT INTO grocery_list(list_name, user_id)' +
   ' VALUES ($1, $2) RETURNING id, list_name, user_id';

    const query = {
      text: select,
      values: [listName, userId],
    };
    const {rows} = await pool.query(query);
    return rows.length == 0 ? false : rows;
  } catch (error) {
    console.log(error);
    return null;
  }
};
