import { pool } from "../db.js";

export const getMeditions = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM medition");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getMedition = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM medition WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Medition not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteMedition = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM medition WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Medition not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createMedition = async (req, res) => {
  try {
    const { plant_id, humidity, temperature, bomsts, humedadsuelo } = req.body;
    const date = new Time(); // Calculate the current date and time
    const [rows] = await pool.query(
      "INSERT INTO Medition (plant_id, date, humidity, temperature, bomsts, humedadsuelo) VALUES (?, ?, ?, ?, ?, ?)",
      [plant_id, date, humidity, temperature, bomsts, humedadsuelo]
    );
    res.status(201).json({ id: rows.insertId, plant_id, date, humidity, temperature, bomsts, humedadsuelo});
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateMedition = async (req, res) => {
  try {
    const { id } = req.params;
    const { plant_id, humidity, temperature, bomsts, humedadsuelo, forcebomsts } = req.body;
    const date = new Date();

    const [result] = await pool.query(
      `UPDATE medition 
       SET plant_id = IFNULL(?, plant_id), 
         date = IFNULL(?, date), 
         humidity = IFNULL(?, humidity), 
         temperature = IFNULL(?, temperature), 
         bomsts = IFNULL(?, bomsts), 
         humedadsuelo = IFNULL(?, humedadsuelo),
         forcebomsts = IFNULL(?, forcebomsts) 
       WHERE id = ?`,
      [plant_id, date, humidity, temperature, bomsts, humedadsuelo, forcebomsts, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Medition not found" });

    const [rows] = await pool.query("SELECT * FROM medition WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
