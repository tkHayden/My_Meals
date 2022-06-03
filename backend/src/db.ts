import { Pool } from "pg";

const pool = new Pool({
  host: "postgres",
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

interface GroceryListInterface {
  id?: string;
  list_name: string;
  user_id: string;
}

export const getAllGroceryLists = async (
  userId: string
): Promise<GroceryListInterface[] | null> => {
  const select = "SELECT * FROM grocery_list WHERE user_id = $1";
  const query = {
    text: select,
    values: [userId],
  };
  const { rows } = await pool.query<GroceryListInterface>(query);
  return rows.length == 0 ? null : rows;
};

export const createGroceryList = async (
  userId: string,
  listName: string
): Promise<GroceryListInterface[] | null> => {
  try {
    const insert =
      "INSERT INTO grocery_list(list_name, user_id)" +
      " VALUES ($1, $2) RETURNING id, list_name, user_id";

    const query = {
      text: insert,
      values: [listName, userId],
    };
    const { rows } = await pool.query<GroceryListInterface>(query);
    return rows.length == 0 ? null : rows;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteGroceryList = async (
  userId: string,
  listId: string
): Promise<GroceryListInterface[] | null> => {
  try {
    const del =
      "DELETE FROM grocery_list WHERE id = $1 and user_id = $2" +
      " RETURNING list_name";

    const query = {
      text: del,
      values: [listId, userId],
    };
    const { rows } = await pool.query<GroceryListInterface>(query);
    return rows.length == 0 ? null : rows;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const updateGroceryListName = async (
  userId: string,
  listId: string,
  newName: string
): Promise<GroceryListInterface[] | null> => {
  try {
    const update =
      "UPDATE grocery_list SET list_name = $1" +
      " WHERE id = $2 and user_id = $3 RETURNING *";

    const query = {
      text: update,
      values: [newName, listId, userId],
    };
    const { rows } = await pool.query<GroceryListInterface>(query);
    return rows.length == 0 ? null : rows;
  } catch (error) {
    return null;
  }
};
