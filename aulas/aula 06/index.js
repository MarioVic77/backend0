// 1. importar o framework
const express = require("express");

// 2. criar uma instância de aplicação
const app = express();

// criar um middleware
app.get('/', (req, res) => {
    res.send("Olá")
});-
.

// 3. iniciar a aplicação
app.listen(8000, ()=>{
    console.log("App está On");
} )