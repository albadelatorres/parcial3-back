const express = require("express");
const unoRouter = express.Router();
const Mapas = require("../Model/mapas");

// GET ALL
unoRouter.get("/", async (req, res) => {
  try {
    const mapas = await Mapas.find();
    res.json(mapas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET BY ID
unoRouter.get("/:id", async (req, res) => {
  try {
    const mapa = await Mapas.findById(req.params.id);
    if (!mapa) {
      return res.status(404).json({ message: "Mapa no encontrado" });
    }
    res.json(mapa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE
unoRouter.post("/", async (req, res) => {
  const { user_email, markers } = req.body;
  const nuevoMapa = new Mapas({
    user_email,
    markers,
  });

  try {
    const mapaGuardado = await nuevoMapa.save();
    res.status(201).json(mapaGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE
unoRouter.put("/:id", async (req, res) => {
  try {
    const mapa = await Mapas.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mapa) {
      return res.status(404).json({ message: "Mapa no encontrado" });
    }
    res.json(mapa);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
unoRouter.delete("/:id", async (req, res) => {
  try {
    const mapa = await Mapas.findByIdAndDelete(req.params.id);
    if (!mapa) {
      return res.status(404).json({ message: "Mapa no encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener todas las ubicaciones de un usuario por email
unoRouter.get("/user-locations/:email", async (req, res) => {
    const email = req.params.email; // Obtener email de los parámetros de la URL
  
    if (!email) {
      return res.status(400).json({ message: "El email es obligatorio" });
    }
  
    try {
      const mapa = await Mapas.findOne({ user_email: email });
  
      if (!mapa) {
        return res.status(404).json({ message: "No se encontraron ubicaciones para este usuario" });
      }
  
      res.json({ markers: mapa.markers });
    } catch (error) {
      console.error("Error al obtener ubicaciones del usuario:", error);
      res.status(500).json({ message: "Error del servidor" });
    }
});

module.exports = unoRouter;