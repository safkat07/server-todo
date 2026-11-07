import { pool } from "../../config/db";
import bycrpt from "bcrypt";

const createUsers = async (payload: Record<string, unknown>) => {
  const { name, email, age, password, role } = payload;

  const hashPass = await bycrpt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users(name,email, age,password, role) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [name, email, age, hashPass, role],
  );
  return result;
};

const getAllUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const getUserById = async (idn: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [idn]);
  return result;
};

const updateUser = async (
  name: string,
  email: string,
  age: number,
  id: string,
) => {
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2, age=$3 WHERE id=$4 RETURNING *`,
    [name, email, age, id],
  );
  return result;
};

const deleteUser = async (idn: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [
    idn,
  ]);
  return result;
};

export const userServices = {
  createUsers,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
