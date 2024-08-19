const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" }, // Referencia al modelo Question
  },
  {
    strictPopulate: false, // Permite poblar campos que no están en el esquema
  }
);

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
