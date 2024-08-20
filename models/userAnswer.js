const mongoose = require("mongoose");

const userAnswerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Asegúrate de tener un modelo de User si es necesario
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    answer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true, // Opcional: para rastrear la fecha de creación y actualización
  }
);

const UserAnswer = mongoose.model("UserAnswer", userAnswerSchema);

module.exports = UserAnswer;
