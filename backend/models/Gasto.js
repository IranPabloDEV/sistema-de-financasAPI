const mongoose = require("mongoose");

const gastoSchema = new mongoose.Schema(
  {
    descricao: {
      type: String,
      required: true,
    },

    valor: {
      type: Number,
      required: true,
    },

    categoria: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Gasto", gastoSchema);
