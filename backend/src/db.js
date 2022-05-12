const {Pool} = require('pg');

const pool = new Pool({
  host: 'postgres',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.getUser = async () => {
  const select = 'SELECT * FROM member';
  const query = {
    text: select,
    values: [],
  };
  const {rows} = await pool.query(query);
  return rows.length == 0 ? false : rows;
};
