const express = require("express");
const multer =require ('multer');

const response = require('../../network/response');
const controller = require('./controler.js');
const router = express.Router();
const upload = multer({
    dest :'public/files',
});
router.get('/',function(req,res){
    const filterMessages= req.query.user || null;
    controller.getMessages(filterMessages) 
        .then((messageList)=>{
        response.success(req, res, messageList,200);
    })
    .catch(e =>{
        response.error(req, res,'Unexpected error', 500);
    })

});
    // console.log(req.headers);
    // res.header({
    //     "custom-header":"nuestro valor personalizado",
    // });
    // // res.send('lista de mensajes');
    // response.success(req,res, 'lista de mensajes');

router.post('/',upload.single('file'),function (req,res){
    console.log('req.file');
    controller.addMessage(req.body.chat,req.body.user, req.body.message, req.file)
        .then((fullMessage)=>{
            response.success(req,res, fullMessage,201);
        })
        .catch(e => {
            response.error(req,res, 'informacion invalida',400,'error en el controlador');
        });


    })

    router.patch('/:id', function(req, res){
        console.log(req.params.id);
       
        controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
          response.success(req, res, data, 200); })
         .catch(e=> {
            response.error(req, res,"error interno",500,e);
         });
       
    })
    // if(req.query.error=== 'ok'){
    //     response.error(req,res, 'error insesperado',500,'es una simulacion de los erroses');
    // }else{
    //     response.success(req,res, 'creado correctamente',201);
    // }
    // console.log(req.body);
   
    //res.status(201).send({error:"",body:"creado correctamente"});
    // res.send('Mensaje '+ req.body.text+' añadido correctamente')

// app.use('/', funct,ion(req,res){
//     res.send('hola');
// });
router.delete('/:id', function(req,res){
controller.deleteMessage(req.params.id)
.then(()=>{
    response.success(req,res,`Usuario${req.params.id}eliminado`,200) ;
})
.catch(e =>{
    response.error(req,res,'error nterno', 500,e);
})
})

module.exports = router;