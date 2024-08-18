const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    mongoose.set("strictPopulate", false);
    await mongoose.connect("mongodb://localhost:27017/EducacionFinanciera");
    console.log("¡Conexión a la base de datos establecida correctamente!");
  } catch (error) {
    console.error("Error de conexión a la base de datos:", error);
    process.exit(1); // Salir del proceso con error
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
