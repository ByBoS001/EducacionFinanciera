const mongoose = require('mongoose');
require('dotenv').config(); // Asegúrate de tener dotenv instalado para usar variables de entorno

// Definir la función de conexión a la base de datos
const connectToDatabase = async () => {
    try {
        const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/'; // Usa la variable de entorno o la URI local por defecto
        await mongoose.connect(dbURI); // Elimina las opciones obsoletas
        console.log('¡Conexión a la base de datos establecida correctamente!');
    } catch (error) {
        console.error('Error de conexión a la base de datos:', error);
    }
};

module.exports = connectToDatabase;



const nodemailer = require("nodemailer");
console.log("Nodemailer importado: ", nodemailer);

const transportLisa = {
  tls: { rejectUnauthorized: false },
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: "fintechnc@gmail.com",
    pass: "bplwnzddzukclgpm",
  },
};

async function enviarCorreoModuloFinalizado(destinatario, asunto, mensaje) {
  const transporter = nodemailer.createTransport(transportLisa);

  const message = {
    from: `"LISA" <${transportLisa.auth.user}>`, // Dirección del remitente
    to: destinatario,
    subject: asunto,
    text: mensaje,
  };

  try {
    const email = await transporter.sendMail(message);
    console.log("Correo enviado exitosamente:", email);
    return email;
  } catch (err) {
    console.error("Error enviando correo:", err);
    throw err;
  }
}

(async () => {
  try {
    const info = await enviarCorreoModuloFinalizado(
      "marton2307@gmail.com",
      "¡Módulo finalizado exitosamente!",
      "Felicitaciones, has completado el módulo satisfactoriamente."
    );
    console.log("Correo enviado exitosamente:", info);
  } catch (error) {
    console.error("Error enviando correo:", error);
  }
})();

