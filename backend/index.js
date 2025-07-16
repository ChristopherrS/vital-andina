const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const axios = require("axios");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4045;

// Permitir CORS para cualquier origen (ajusta según necesidad)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});



// Obtener todos los alimentos
app.get("/api/alimentos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM alimentos ORDER BY id;");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener alimentos" });
  }
});

// Agregar nuevo alimento
app.post("/api/alimentos", async (req, res) => {
  const { nombre, descripcion, beneficios } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO alimentos (nombre, descripcion, beneficios)
       VALUES ($1, $2, $3) RETURNING *`,
      [nombre, descripcion, beneficios.split(",")]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al guardar alimento" });
  }
});

// Agregar nueva receta
app.post("/api/recetas", async (req, res) => {
  const { nombre, descripcion, pasos, ingredientes, alimento_id, beneficios } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO recetas (nombre, descripcion, pasos, ingredientes, alimento_id, beneficios)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        nombre,
        descripcion,
        pasos ? `{${pasos}}` : "{}",
        ingredientes ? `{${ingredientes}}` : "{}",
        parseInt(alimento_id),
        beneficios ? `{${beneficios}}` : "{}",
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al guardar receta" });
  }
});

// Obtener todas las recetas
app.get("/api/recetas", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        r.id, 
        r.nombre, 
        r.descripcion, 
        r.pasos, 
        r.ingredientes, 
        r.beneficios,
        r.alimento_id,
        a.nombre AS alimento_nombre
      FROM recetas r
      JOIN alimentos a ON a.id = r.alimento_id
      ORDER BY r.id;
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener recetas" });
  }
});

// Obtener recetas por alimento
app.get("/api/alimentos/:id/recetas", async (req, res) => {
  const alimentoId = parseInt(req.params.id);
  if (isNaN(alimentoId)) {
    return res.status(400).json({ error: "ID inválido para alimento" });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM recetas WHERE alimento_id = $1 ORDER BY id`,
      [alimentoId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener recetas del alimento" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en https://apivitalandina.puceecoexplora.com`);
});