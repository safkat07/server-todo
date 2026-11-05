import { pool } from "../../config/db";

const createUser = async (name: string, email: string, age: number) => {
  const result = await pool.query(
    `INSERT INTO users(name,email, age) VALUES($1,$2,$3) RETURNING *`,
    [name, email, age],
  );
  return result;
};

const getAllUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const getUserById = async (idn: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [
    idn
  ]);
  return result
}


const updateUser = async (name: string, email: string, age: number, id: string) => {
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2, age=$3 WHERE id=$4 RETURNING *`,
    [name, email, age, id],
  );
  return result;
}

const deleteUser = async (idn: string) => {
  const result = await pool.query(
    `DELETE FROM users WHERE id=$1 RETURNING *`,
    [idn],
  );
  return result
}

export const userServices = {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser
};
