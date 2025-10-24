require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const produtosRouter = require('./routes/produtosRouter');

const app = express();

app.use(express.json());


const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_DATABASE
} = process.env;

mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}?retryWrites=true&w=majority`)
  .then(() => console.log('✅ Conectado ao MongoDB Atlas'))
  .catch(err => console.error('❌ Erro na conexão com MongoDB:', err));

app.use('/produtos', produtosRouter);

module.exports = app;
