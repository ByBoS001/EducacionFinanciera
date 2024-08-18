const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/EducacionFinanciera', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('¡Conexión a la base de datos establecida correctamente!');
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
    process.exit(1); // Salir del proceso con error
  }
};

module.exports = connectToDatabase;



/**

const mongoose = require('mongoose');
require('dotenv').config();

// Conexión a Base de datos
const uri = mongodb+srv://${process.env.USER_MONGO}:${process.env.PASSWORD}@denuncias-back.eugamd3.mongodb.net/barrios;
// console.log('PASS',process.env.PASSWORD);
// console.log('USEERNAME MONGO',process.env.USER_MONGO);


mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Se estableció conexión con la base de datos'))
    .catch((e) => console.log('Error de conexión a la base de datos:', e));

exports.mongoose = mongoose;
 * 
 */