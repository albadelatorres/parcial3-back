// index.js
const express = require("express");
const cors = require("cors");
const connectBD = require("./bd"); // Importa la función de conexión

const app = express();
const PORT = 3010;

// Llama a la función para conectar a la base de datos
connectBD();

// Configurar middlewares
app.use(express.json());
app.use(cors());

// Ruta básica para manejar GET /
app.get('/', (req, res) => {
    res.send("API del Parcial 3");
});



// Rutas
const mapasRouter = require("./Controller/mapasRouter");
app.use("/uno", mapasRouter);

const visitasRouter = require("./Controller/visitasRouter");
app.use("/dos", visitasRouter);


const logsRouter = require("./Controller/logsRouter");
app.use("/logs", logsRouter);

const imagenesRouter = require("./Controller/imagenesRouter");
app.use("/imagenes", imagenesRouter);

// Iniciar servidor
app.listen(PORT, () => console.log(`Parcial 3 server ready on port: ${PORT}.`));
