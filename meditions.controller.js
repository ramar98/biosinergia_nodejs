import { pool } from "../db.js";

export const getMeditions = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM medition");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "somethings goes wrong" });
  }
};

export const getMedition = async (req, res) => {
  try {
    const { micro_id } = req.params;
    const [rows] = await pool.query("SELECT * FROM medition WHERE micro_id = ? ORDER BY created_at DESC LIMIT 1", [
      micro_id,
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
    // Desestructuramos
    const {
      dioxido_carbono,
      soil_temperature_1,
      soil_temperature_2,
      soil_humidity,
      room_temperature,
      room_humidity,
      micro_id
    } = req.body;

    // Reemplazamos null/undefined por 0
    const values = [
      dioxido_carbono,
      soil_temperature_1,
      soil_temperature_2,
      soil_humidity,
      room_temperature,
      room_humidity,
      micro_id
    ].map(v => (v == null ? 0 : v));

    const [result] = await pool.query(
      `INSERT INTO medition (
        dioxido_carbono,
        soil_temperature_1,
        soil_temperature_2,
        soil_humidity,
        room_temperature,
        room_humidity,
        micro_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      values
    );

    const [rows] = await pool.query(
      "SELECT * FROM medition WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};



export const updateMedition = async (req, res) => {
  try {
    const { micro_id } = req.params;
    const {
      dioxido_carbono,
      soil_temperature,
      soil_humidity,
      room_temperature,
      room_humidity,
    } = req.body;

    const [result] = await pool.query(
      `UPDATE medition  
       SET dioxido_carbono = IFNULL(?, dioxido_carbono), 
           soil_temperature = IFNULL(?, soil_temperature), 
           soil_humidity = IFNULL(?, soil_humidity), 
           room_temperature = IFNULL(?, room_temperature), 
           room_humidity = IFNULL(?, room_humidity)
       WHERE micro_id = ?`,
      [
        dioxido_carbono,
        soil_temperature,
        soil_humidity,
        room_temperature,
        room_humidity,
        micro_id
      ]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Medition not found" });

    const [rows] = await pool.query("SELECT * FROM medition WHERE micro_id = ?", [
      micro_id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

