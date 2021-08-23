const express = require("express");
const app = express();
const server = require('http').Server(app);
const socket = require('./socket');
const db = require('./db');
const router= require('./network/routes')
// import express from 'express';
// const router = require('./components/message/network'); 

const uri ='mongodb://db_user_juanchs:3nNmpztgaAaHJwq@cluster0-shard-00-00.8yzyf.mongodb.net:27017,cluster0-shard-00-01.8yzyf.mongodb.net:27017,cluster0-shard-00-02.8yzyf.mongodb.net:27017/proyectTelegrom?ssl=true&replicaSet=atlas-12g23e-shard-0&authSource=admin&retryWrites=true&w=majority';

db(uri); 



app.use(express.urlencoded({extended:false}));//con esto ya vienen incluido bodyparses donde se explica en la clase qeu se debia instalar
app.use(express.json());
// app.use(router);
socket.connect(server);
router(app);

app.use('/app', express.static('public'));
server.listen(3000, function (){
    console.log("la aplicacion esta escuchando en local host 3000");
});

