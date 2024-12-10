const express = require("express");
const unoRouter = express.Router();
const Entidaduno = require("../Model/entidaduno");
const Entidaddos = require("../Model/entidaddos");

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
        const entidaduno = await Entidaduno.find();
        res.json(entidaduno);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
 
// GET BY ID
router.get("/:id", async (req, res) => {
    try {
        const entidaduno = await Entidaduno.findById(req.params.id);
        if (!entidaduno) {
            return res.status(404).json({ message: "entidaduno no encontrado" });
        }
        res.json(entidaduno);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CREATE
router.post("/", validateEntityData, async (req, res) => {
    const { data1, data2, data3 } = req.body;
    const entidaduno = new Entidaduno({
        data1,
        data2,
        data3
    });

    try {
        const nuevoentidaduno = await entidaduno.save();
        res.status(201).json(nuevoentidaduno);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// UPDATE 
router.put("/:id", validateEntityData, async (req, res) => {
    try {
        const entidaduno = await Entidaduno.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!entidaduno) {
            return res.status(404).json({ message: "entidaduno no encontrado" });
        }
        res.json(entidaduno);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE
router.delete("/:id", async (req, res) => { 
    try {
        const entidaduno = await Entidaduno.findByIdAndDelete(req.params.id);
        if (!entidaduno) {
            return res.status(404).json({ message: "entidaduno no encontrado" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

////////////////////////FUNCIONALIDAD AVANZADA////////////////////////


module.exports = unoRouter