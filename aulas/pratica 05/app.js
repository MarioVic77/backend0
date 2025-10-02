const express = require('express');
const app = express();

const tarefaRouter = require('./routes/tarefaRouter');

app.use(express.json());

app.use('/tarefas', tarefaRouter);

module.exports = app;
