const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
var cors = require('cors');

// iniciando el servidor express
const app = express();

// configurar CORS
app.use(cors());

//LECTRURA Y PARSEO DEL BODY
app.use(express.json() );

// BASE DE DATOS
dbConnection();


// RUTAS
app.use('/api/usuarios', require('./routes/usuariosR'));
app.use('/api/login', require('./routes/authR'));


app.listen(process.env.port, ()=>{
    console.log('localhost:', process.env.port);
})