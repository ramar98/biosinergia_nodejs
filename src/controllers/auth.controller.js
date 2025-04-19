import { pool } from "../db.js";
import bcrypt from "bcrypt";


export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await pool.query(
            "SELECT * FROM user WHERE username = ?",
            [username]
        );

        if (rows.length === 0) {
            return res.status(401).json("Invalid credentials");
        }

        const match = await bcrypt.compare(password, rows[0].password);
        if (!match) {
            return res.status(401).json("Invalid credentials");
        }

        if (rows.length === 0) {
            return res.status(401).json("Invalid credentials");
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
};

export const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Generate a salt to use for hashing
        const salt = await bcrypt.genSalt(10);
        // Hash the password using the generated salt
        const hashedPassword = await bcrypt.hash(password, salt);

        const [rows] = await pool.query(
            "INSERT INTO user (username, password) VALUES (?, ?)",
            [username, hashedPassword]
        );
        res.status(201).json({ id: rows.insertId, username, hashedPassword });
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
};
