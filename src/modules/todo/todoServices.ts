import { pool } from "../../config/db";

const createTodo = async (
  user_id: string,
  title: string,
  description: string,
) => {
  const result = await pool.query(
    `INSERT INTO todos(user_id, title, description) VALUES($1,$2,$3) RETURNING *`,
    [user_id, title, description],
  );
  return result;
};

const getAllTodo = async () => {
  const result = await pool.query(`SELECT * FROM todos`);
  return result;
};

const deleteTodo = async (id: string) => {
  const result = await pool.query(
    `
            DELETE FROM todos WHERE id=$1 RETURNING *
            `,
    [id],
  );
  return result;
};

const getTodoById = async (id: string) => {
  const result = await pool.query(`SELECT * FROM todos WHERE id=$1`, [id]);
  return result;
};

const updateTodo = async (title: string, description: string, id: string) => {
  const result = await pool.query(
    `UPDATE todos SET title = COALESCE($1,title), description=COALESCE ($2,description ) WHERE id=$3 RETURNING *`,
    [title, description, id],
  );
  return result;
};

export const todoServices = {
  createTodo,
  getAllTodo,
  deleteTodo,
  getTodoById,
  updateTodo,
};
