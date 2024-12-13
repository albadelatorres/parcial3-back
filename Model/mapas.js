const mongoose = require('mongoose');
const connectBD = require("../bd");

connectBD().then(()=>{
    console.log("BD de Mongo disponible");
}).catch((error) => {
    console.log("Error al conectar a Mongo "+ error);
});

const MapSchema = new mongoose.Schema(
    {
      user_email: { type: String, required: true }, // Email del usuario asociado al mapa
      markers: [
        {
          city: { type: String, required: true }, // Ciudad
          country: { type: String, required: true }, // País
          coordinates: {
            lat: { type: Number, required: true }, // Latitud
            lng: { type: Number, required: true }, // Longitud
          },
          image_uri: { type: String, required: false }, // URI de la imagen
          added_at: { type: Date, default: Date.now }, // Fecha de adición del marcador
        },
      ],
    },
    { collection: "mapas" }
  );

module.exports = mongoose.model('Entidaduno', MapSchema);