const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
var cors = require('cors');

// iniciando el servidor express
const app = express();

// configurar CORS
app.use(cors());

// BASE DE DATOS
dbConnection();
// console.log(process.env);
// RUTAS
app.get('/', (req, res) =>{
    res.json({
        ok: true,
        msj: 'hola mundo'
    });
}) ;

app.listen(process.env.port, ()=>{
    console.log('localhost:', process.env.port);
})