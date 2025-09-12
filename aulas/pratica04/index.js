const express = require('express');
const tarefasRouter = require('./tarefasRouter');

const app = express();
const PORT = 3000;

// Middleware para processar JSON
app.use(express.json());

// Middleware global de log
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Middleware de rotas para tarefas
app.use('/tarefas', tarefasRouter);

// Middleware de erro
app.use((err, req, res, next) => {
  res.status(400).json({ erro: err.message });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;