const mongoose = require('mongoose');
const connectBD = require("../bd");

connectBD().then(()=>{
    console.log("BD de Mongo disponible");
}).catch((error) => {
    console.log("Error al conectar a Mongo "+ error);
});

const EntidaddosSchema = new mongoose.Schema({
    
}, { collection: 'entidaddos' });

module.exports = mongoose.model('EntidaddosSchema', EntidaddosSchema);