import { pool } from "../db.js";

export const getPlants = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM plant");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getPlant = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM plant WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deletePlant = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM plant WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createPlant = async (req, res) => {
  try {
    const { name, description, birthdate } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO Plant (name, description, birthdate) VALUES (?, ?, ?)",
      [name, description, birthdate]
    );
    res.status(201).json({ id: rows.insertId, name, description, birthdate});
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updatePlant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, birthdate } = req.body;

    const [result] = await pool.query(
      "UPDATE plant SET name = IFNULL(?, name), description = IFNULL(?, description), birthdate = IFNULL(?, birthdate) WHERE id = ?",
      [name, description, birthdate, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Plant not found" });

    const [rows] = await pool.query("SELECT * FROM plant WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
