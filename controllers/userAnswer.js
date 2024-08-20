// controllers/userAnswer.js
const Answer = require("../models/answerModel");
const Question = require("../models/questionModel");

const submitAnswers = async (req, res) => {
  try {
    // Obtener respuestas desde el cuerpo de la solicitud
    const answers = req.body;

    // Recorrer cada pregunta y actualizar sus respuestas
    for (const [questionId, answerId] of Object.entries(answers)) {
      // Buscar la pregunta por ID
      const question = await Question.findById(questionId);

      if (!question) {
        return res
          .status(404)
          .json({ message: `Pregunta con ID ${questionId} no encontrada` });
      }

      // Buscar la respuesta por ID
      const answer = await Answer.findById(answerId);

      if (!answer) {
        return res
          .status(404)
          .json({ message: `Respuesta con ID ${answerId} no encontrada` });
      }

      // Verificar si la respuesta es correcta y marcarla en la pregunta
      if (answer.isCorrect) {
        // Puedes manejar lógica adicional aquí si es necesario
      }

      // Aquí puedes agregar la lógica para almacenar las respuestas del usuario en otro modelo o base de datos
    }

    return res.status(200).json({ message: "Respuestas enviadas con éxito" });
  } catch (error) {
    console.error("Error al enviar respuestas:", error);
    return res
      .status(500)
      .json({ error: error.message, message: "Error interno del servidor" });
  }
};

module.exports = { submitAnswers };
