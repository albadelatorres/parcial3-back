const express = require("express");
const dosRouter = express.Router();
const entidaduno = require("../Model/entidaduno");
const entidaddos = require("../Model/entidaddos");

// validar entity data
function validateEntityData(req, res, next) {
    const { data1, data2, data3 } = req.body;
    if (!data1 || typeof data1 !== 'string' || !data1.includes('@')) {
        return res.status(400).json({ message: "data1 esta en un formato no válido." });
    }
    if (!data2 || typeof data2 !== 'string') {
        return res.status(400).json({ message: "data2 esta en un formato no válido." });
    }
    if (data3 && !Array.isArray(data3)) {
        return res.status(400).json({ message: "data3 esta en un formato no válido." });
    }
    next();
}

/////////////////////////////////CRUD/////////////////////////////////

// GET ALL
router.get("/", async (req, res) => {
    try {
        const entidaddos = await entidaddos.find();
        res.json(entidaddos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
 
// GET BY ID
router.get("/:id", async (req, res) => {
    try {
        const entidaddos = await entidaddos.findById(req.params.id);
        if (!entidaddos) {
            return res.status(404).json({ message: "entidaddos no encontrado" });
        }
        res.json(entidaddos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CREATE
router.post("/", validateEntityData, async (req, res) => {
    const { data1, data2, data3 } = req.body;
    const entidaddos = new entidaddos({
        data1,
        data2,
        data3
    });

    try {
        const nuevoentidaddos = await entidaddos.save();
        res.status(201).json(nuevoentidaddos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// UPDATE 
router.put("/:id", validateEntityData, async (req, res) => {
    try {
        const entidaddos = await entidaddos.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!entidaddos) {
            return res.status(404).json({ message: "entidaddos no encontrado" });
        }
        res.json(entidaddos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE
router.delete("/:id", async (req, res) => { 
    try {
        const entidaddos = await entidaddos.findByIdAndDelete(req.params.id);
        if (!entidaddos) {
            return res.status(404).json({ message: "entidaddos no encontrado" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

////////////////////////FUNCIONALIDAD AVANZADA////////////////////////

module.exports = dosRouter