const mongoose = require('mongoose');
const connectBD = require("../bd");

connectBD().then(()=>{
    console.log("BD de Mongo disponible");
}).catch((error) => {
    console.log("Error al conectar a Mongo "+ error);
});

const VisitSchema = new mongoose.Schema(
    {
      visited_email: { type: String, required: true }, // Email del usuario dueño del mapa
      visitor_email: { type: String, required: true }, // Email del usuario visitante
      visit_time: { type: Date, default: Date.now }, // Timestamp de la visita
      auth_token: { type: String, required: true }, // Token de identificación OAuth del visitante
    },
    { collection: "visitas" }
);

module.exports = mongoose.model('EntidaddosSchema', VisitSchema);