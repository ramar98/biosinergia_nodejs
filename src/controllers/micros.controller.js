import { pool } from "../db.js";

export const getMicros = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM micro");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "somethings goes wrong" });
  }
};

export const getMicro_id = async (req, res) => {
  try {
    const { mac, plant_name } = req.body;

    // Buscar el micro_id en la tabla 'micro'
    const [microRows] = await pool.query(
      "SELECT id FROM micro WHERE mac = ? AND plant_name = ?",
      [mac, plant_name]
    );

    if (microRows.length === 0) {
      return res.status(404).json({ message: "Micro no encontrado" });
    }

    res.json(microRows[0]);
  } catch (error) {
    console.error("Error al obtener el micro_id:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

