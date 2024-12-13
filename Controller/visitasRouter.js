const express = require("express");
const dosRouter = express.Router();
const Visitas = require("../Model/visitas");

// GET ALL
dosRouter.get("/", async (req, res) => {
  try {
    const visitas = await Visitas.find();
    res.json(visitas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET BY ID
dosRouter.get("/:id", async (req, res) => {
  try {
    const visita = await Visitas.findById(req.params.id);
    if (!visita) {
      return res.status(404).json({ message: "Visita no encontrada" });
    }
    res.json(visita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE
dosRouter.post("/", async (req, res) => {
  const { visited_email, visitor_email, auth_token } = req.body;
  const nuevaVisita = new Visitas({
    visited_email,
    visitor_email,
    auth_token,
  });

  try {
    const visitaGuardada = await nuevaVisita.save();
    res.status(201).json(visitaGuardada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
dosRouter.delete("/:id", async (req, res) => {
  try {
    const visita = await Visitas.findByIdAndDelete(req.params.id);
    if (!visita) {
      return res.status(404).json({ message: "Visita no encontrada" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = dosRouter;