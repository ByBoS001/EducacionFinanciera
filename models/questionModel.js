const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }], // Referencia al modelo Answer
    lessons: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }, // Referencia al modelo Lesson
  },
  {
    strictPopulate: false, // Permite poblar campos que no están en el esquema
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
