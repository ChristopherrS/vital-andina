const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const axios = require("axios");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// 🔥 PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 📂 Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: "./uploads", // Carpeta para guardar imágenes
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // nombre único
  },
});
const upload = multer({ storage: storage });

// 📸 Servir imágenes desde la carpeta /uploads
app.use("/uploads", express.static("uploads"));

// 🔥 Ruta para la IA mejorada
let chatHistorial = [
  {
    role: "system",
    content: `
Eres un experto en nutrición andina con profundo conocimiento sobre alimentos ancestrales como quinua, tarwi, chocho, melloco, mashua y oca. 

✅ Habla de forma clara, amigable y motivadora.  
✅ Adapta tu tono según la edad del usuario (adulto, niño o adolescente).  
✅ Da consejos prácticos sobre hábitos saludables, recetas nutritivas y beneficios de los alimentos andinos.  
✅ Si el usuario lo pide, sugiere recetas fáciles con identidad andina.  
✅ Nunca inventes datos: si no sabes algo, indícalo amablemente.  
✅ Responde en no más de 3 o 4 frases para mantener la conversación fluida.

Ejemplo:
**Usuario:** ¿Qué beneficios tiene la quinua?  
**Asistente:** La quinua es rica en proteínas, fibra y minerales como hierro y magnesio. Es ideal para dietas vegetarianas y ayuda a mantener la energía estable durante el día.
    `.trim(),
  },
];

app.post("/api/chat", async (req, res) => {
  const { mensaje, reset } = req.body;

  try {
    if (reset) {
      // Reiniciar historial con el prompt mejorado
      chatHistorial = [
        {
          role: "system",
          content: `
Eres un experto en nutrición andina con profundo conocimiento sobre alimentos ancestrales como quinua, tarwi, chocho, melloco, mashua y oca. 

✅ Habla de forma clara, amigable y motivadora.  
✅ Adapta tu tono según la edad del usuario (adulto, niño o adolescente).  
✅ Da consejos prácticos sobre hábitos saludables, recetas nutritivas y beneficios de los alimentos andinos.  
✅ Si el usuario lo pide, sugiere recetas fáciles con identidad andina.  
✅ Nunca inventes datos: si no sabes algo, indícalo amablemente.  
✅ Responde en no más de 3 o 4 frases para mantener la conversación fluida.
          `.trim(),
        },
      ];
    }

    console.log("📥 Usuario:", mensaje);

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
          "HTTP-Referer": "http://localhost:4000",
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
      console.log("🤖 Respuesta IA:", respuestaIA);

      // Añadir respuesta de la IA al historial
      chatHistorial.push({ role: "assistant", content: respuestaIA });

      // Mantener solo las últimas 20 interacciones
      if (chatHistorial.length > 20) {
        chatHistorial = chatHistorial.slice(-20);
      }

      res.json({ respuesta: respuestaIA });
    } else {
      console.error("❌ Respuesta inválida de OpenRouter:", response.data);
      res.status(500).json({ error: "La IA no devolvió ninguna respuesta." });
    }
  } catch (err) {
    console.error("❌ Error al consultar OpenRouter:", err?.response?.data || err.message);
    res.status(500).json({ error: "No se pudo obtener respuesta de la IA." });
  }
});


// ✅ Obtener todos los alimentos
app.get("/api/alimentos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM alimentos ORDER BY id;");
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener alimentos:", error);
    res.status(500).json({ error: "Error al obtener alimentos" });
  }
});

// ✅ AGREGAR NUEVO ALIMENTO (con imagen opcional)
app.post("/api/alimentos", upload.single("imagen"), async (req, res) => {
  const { nombre, descripcion, beneficios } = req.body;
  const imagenUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const result = await pool.query(
      `INSERT INTO alimentos (nombre, descripcion, beneficios, imagen_url)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nombre, descripcion, beneficios.split(","), imagenUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error al agregar alimento:", err);
    res.status(500).json({ error: "Error al guardar alimento" });
  }
});

// ✅ AGREGAR NUEVA RECETA
app.post("/api/recetas", async (req, res) => {
  const { nombre, descripcion, pasos, ingredientes, alimento_id, beneficios } =
    req.body;

  try {
    const result = await pool.query(
      `INSERT INTO recetas (nombre, descripcion, pasos, ingredientes, alimento_id, beneficios)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        nombre,
        descripcion,
        pasos ? `{${pasos}}` : "{}", // 🔥 Convierte a formato array PostgreSQL
        ingredientes ? `{${ingredientes}}` : "{}", // 🔥 Convierte a array
        parseInt(alimento_id), // Asegúrate de enviarlo como entero
        beneficios ? `{${beneficios}}` : "{}", // 🔥 Convierte a array
      ]
    );

    res.status(201).json(result.rows[0]); // Devuelve la receta creada
  } catch (err) {
    console.error("❌ Error al agregar receta:", err);
    res.status(500).json({ error: "Error al guardar receta" });
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
        r.alimento_id,              -- ✅ Incluye el alimento_id
        a.nombre AS alimento_nombre
      FROM recetas r
      JOIN alimentos a ON a.id = r.alimento_id
      ORDER BY r.id;
    `);

    const recetas = result.rows.map((r) => ({
      ...r,
      beneficios:
        typeof r.beneficios === "string"
          ? JSON.parse(r.beneficios)
          : r.beneficios,
    }));

    res.json(recetas);
  } catch (error) {
    console.error("❌ Error al obtener recetas:", error);
    res.status(500).json({ error: "Error al obtener recetas" });
  }
});

// ✅ Obtener recetas por alimento
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
    console.error("❌ Error al obtener recetas del alimento:", error);
    res.status(500).json({ error: "Error al obtener recetas del alimento" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
