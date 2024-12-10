const mongoose = require('mongoose');
const connectBD = require("../bd");

connectBD().then(()=>{
    console.log("BD de Mongo disponible");
}).catch((error) => {
    console.log("Error al conectar a Mongo "+ error);
});

const EntidadunoSchema = new mongoose.Schema({
    
}, { collection: 'entidaduno' });

module.exports = mongoose.model('Entidaduno', EntidadunoSchema);