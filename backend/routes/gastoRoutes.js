const express = require("express");
const router = express.Router();

const Gasto = require("../models/Gasto");

// CREATE

/**
 * @swagger
 * /gastos:
 * post:
 * summary: Cria um novo gasto
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - categoria
 * - valor
 * - descricao
 * properties:
 * categoria:
 * type: string
 * example: "Alimentação"
 * valor:
 * type: number
 * example: 45.50
 * descricao:
 * type: string
 * example: "Almoço no restaurante"
 * responses:
 * 201:
 * description: Gasto criado
 * 500:
 * description: Erro no servidor
 */

router.post("/gastos", async (req, res) => {
  try {
    const gasto = await Gasto.create(req.body);

    res.status(201).json(gasto);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao criar gasto",
      erro: erro.message,
    });
  }
});

// READ

/**
 * @swagger
 * /gastos:
 *   get:
 *     summary: Lista todos os gastos
 *     responses:
 *       200:
 *         description: Lista de gastos
 */

router.get("/gastos", async (req, res) => {
  try {
    const gastos = await Gasto.find();

    res.status(200).json(gastos);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao buscar gastos",
      erro: erro.message,
    });
  }
});

// UPDATE

/**
 * @swagger
 * /gastos/{id}:
 * put:
 * summary: Atualiza um gasto
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: ID do gasto
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * categoria:
 * type: string
 * valor:
 * type: number
 * descricao:
 * type: string
 * responses:
 * 200:
 * description: Gasto atualizado
 */

router.put("/gastos/:id", async (req, res) => {
  try {
    const gastoAtualizado = await Gasto.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!gastoAtualizado) {
      return res.status(404).json({
        mensagem: "Gasto não encontrado",
      });
    }

    res.status(200).json(gastoAtualizado);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao atualizar gasto",
      erro: erro.message,
    });
  }
});

// DELETE

/**
 * @swagger
 * /gastos/{id}:
 * delete:
 * summary: Remove um gasto
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: ID do gasto
 * responses:
 * 200:
 * description: Gasto removido
 */

router.delete("/gastos/:id", async (req, res) => {
  try {
    const gastoRemovido = await Gasto.findByIdAndDelete(req.params.id);

    if (!gastoRemovido) {
      return res.status(404).json({
        mensagem: "Gasto não encontrado",
      });
    }

    res.status(200).json({
      mensagem: "Gasto removido com sucesso",
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao excluir gasto",
      erro: erro.message,
    });
  }
});

module.exports = router;
