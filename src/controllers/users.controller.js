import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM user");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const validateUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const [rows] = await pool.query("SELECT COUNT(*) AS count FROM user WHERE username = ?", [username]);

    const count = rows[0].count;
    const isUsernameAvailable = count === 0;

    res.json({ used: !isUsernameAvailable });
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const validateEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const [rows] = await pool.query("SELECT COUNT(*) AS count FROM user WHERE email = ?", [email]);

    const count = rows[0].count;
    const isEmailAvailable = count === 0;

    res.json({ used: !isEmailAvailable });
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM user WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM user WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, pass, email } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO user (username, pass, email) VALUES (?, ?, ?)",
      [username, pass, email]
    );
    res.status(201).json({ id: rows.insertId, username, pass, email });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, pass, email } = req.body;

    const [result] = await pool.query(
      "UPDATE user SET username = IFNULL(?, username), pass = IFNULL(?, pass) , email = IFNULL(?, email) WHERE id = ?",
      [username, pass, email, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });

    const [rows] = await pool.query("SELECT * FROM user WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
