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

module.exports = unoRouter;