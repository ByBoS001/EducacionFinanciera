const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  parent_category: {  // FK a la misma tabla para referencia (categoría padre)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',  // Se refiere al mismo modelo
    default: null  // Puede ser nulo si no tiene categoría padre
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
