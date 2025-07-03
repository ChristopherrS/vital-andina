const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

console.log("API Key:", process.env.OPENROUTER_API_KEY);

// 🔸 Ruta para la IA
app.post("/api/chat", async (req, res) => {
  const { mensaje } = req.body;

  try {
    console.log(" Pregunta recibida:", mensaje);

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: "Eres un experto en nutrición andina" },
          { role: "user", content: mensaje },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:4000",
          "X-Title": "VitalAndinaBot",
        },
      }
    );

    const respuestaIA = response.data.choices[0].message.content;
    console.log(" Respuesta IA:", respuestaIA);

    res.json({ respuesta: respuestaIA });
  } catch (err) {
    console.error(
      " Error al consultar OpenRouter:",
      err?.response?.data || err.message
    );
    res.status(500).json({ error: "No se pudo obtener respuesta de la IA." });
  }
});

// ✅ Obtener todos los alimentos (sin recetas, solo tabla alimentos)
app.get("/api/alimentos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM alimentos ORDER BY id;");
    res.json(result.rows);
  } catch (error) {
    console.error(" Error al obtener alimentos:", error);
    res.status(500).json({ error: "Error al obtener alimentos" });
  }
});

// ✅ Obtener todas las recetas (con alimento asociado)
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
        a.nombre AS alimento_nombre
      FROM recetas r
      JOIN alimentos a ON a.id = r.alimento_id
      ORDER BY r.id;
    `);

    // Intentar parsear beneficios si vienen como string
    const recetas = result.rows.map((r) => ({
      ...r,
      beneficios:
        typeof r.beneficios === "string"
          ? JSON.parse(r.beneficios)
          : r.beneficios,
    }));

    res.json(recetas);
  } catch (error) {
    console.error(" Error al obtener recetas:", error);
    res.status(500).json({ error: "Error al obtener recetas" });
  }
});

// 🔸 Obtener recetas de un alimento
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
    console.error(" Error al obtener recetas del alimento:", error);
    res.status(500).json({ error: "Error al obtener recetas del alimento" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
