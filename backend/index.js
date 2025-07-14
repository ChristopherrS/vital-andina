const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const axios = require("axios");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4045;

//  Permitir CORS para cualquier origen (ajusta según necesidad)
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

// Ruta para la IA mejorada
let chatHistorial = [
  {
    role: "system",
    content: `
Eres un experto en nutrición andina con profundo conocimiento sobre alimentos ancestrales como quinua, tarwi, chocho, melloco, mashua y oca.

Habla de forma clara, amigable y motivadora.
Adapta tu tono según la edad del usuario (adulto, niño o adolescente).
Da consejos prácticos sobre hábitos saludables, recetas nutritivas y beneficios de los alimentos andinos.
Si el usuario lo pide, sugiere recetas fáciles con identidad andina.
Nunca inventes datos: si no sabes algo, indícalo amablemente.
Responde en no más de 3 o 4 frases para mantener la conversación fluida.

Ejemplo:
**Usuario:** ¿Qué beneficios tiene la quinua?
**Asistente:** La quinua es rica en proteínas, fibra y minerales como hierro y magnesio. Es ideal para dietas vegetarianas y ayuda a mantener la energía estable durante el día.
    `.trim(),
  },
];

app.post("/api/chat", async (req, res) => {
  const { mensaje, reset } = req.body;

  try {
    console.log(" Usuario:", mensaje);
    console.log(" OPENROUTER_API_KEY:", process.env.OPENROUTER_API_KEY);

    if (reset) {
      // Reiniciar historial con el prompt mejorado
      chatHistorial = [
        {
          role: "system",
          content: `
Eres un experto en nutrición andina con profundo conocimiento sobre alimentos ancestrales como quinua, tarwi, chocho, melloco, mashua y oca.

Habla de forma clara, amigable y motivadora.
Adapta tu tono según la edad del usuario (adulto, niño o adolescente).
Da consejos prácticos sobre hábitos saludables, recetas nutritivas y beneficios de los alimentos andinos.
Si el usuario lo pide, sugiere recetas fáciles con identidad andina.
Nunca inventes datos: si no sabes algo, indícalo amablemente.
Responde en no más de 3 o 4 frases para mantener la conversación fluida.
          `.trim(),
        },
      ];
    }

    // Añadir el mensaje del usuario al historial
    chatHistorial.push({ role: "user", content: mensaje });

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1:free",
        messages: chatHistorial,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://apivitalandina.puceecoexplora.com/",
          "X-Title": "VitalAndinaBot",
        },
      }
    );

    if (
      response.data &&
      response.data.choices &&
      response.data.choices.length > 0 &&
      response.data.choices[0].message
    ) {
      const respuestaIA = response.data.choices[0].message.content;
      console.log(" Respuesta IA:", respuestaIA);

      // Añadir respuesta de la IA al historial
      chatHistorial.push({ role: "assistant", content: respuestaIA });

      // Mantener solo las últimas 20 interacciones
      if (chatHistorial.length > 20) {
        chatHistorial = chatHistorial.slice(-20);
      }

      return res.json({ respuesta: respuestaIA });
    } else {
      console.error(" Respuesta inválida de OpenRouter:", response.data);
      return res.status(500).json({ error: "La IA no devolvió ninguna respuesta." });
    }
  } catch (err) {
    console.error(" Error al consultar OpenRouter:", err?.response?.data || err.message);
    return res.status(500).json({ error: "No se pudo obtener respuesta de la IA." });
  }
});

// Obtener todos los alimentos
app.get("/api/alimentos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM alimentos ORDER BY id;");
    res.json(result.rows);
  } catch (error) {
    console.error(" Error al obtener alimentos:", error);
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
    console.error(" Error al agregar alimento:", err);
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
    console.error(" Error al agregar receta:", err);
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
    console.error(" Error al obtener recetas:", error);
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
    console.error(" Error al obtener recetas del alimento:", error);
    res.status(500).json({ error: "Error al obtener recetas del alimento" });
  }
});

app.listen(PORT, () => {
  console.log(` Servidor corriendo en https://apivitalandina.puceecoexplora.com`);
});
