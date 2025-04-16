import { pool } from "../db.js";

export const getControls = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM control");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "somethings goes wrong" });
  }
};

export const getControl = async (req, res) => {
  try {
    const { micro_id } = req.params;
    const [rows] = await pool.query("SELECT * FROM control WHERE micro_id = ?", [
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

export const updateControl = async (req, res) => {
  try {
    const { micro_id } = req.params;
    const { fan, extractor, intractor, light, watering } = req.body;

    const [result] = await pool.query(
      `UPDATE control  
       SET fan = IFNULL(?, fan), 
           extractor = IFNULL(?, extractor), 
           intractor = IFNULL(?, intractor), 
           light = IFNULL(?, light), 
           watering = IFNULL(?, watering) 
       WHERE micro_id = ?`,
      [fan, extractor, intractor, light, watering, micro_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Control not found" });
    }

    const [rows] = await pool.query("SELECT * FROM control WHERE id = ?", [id]);

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

