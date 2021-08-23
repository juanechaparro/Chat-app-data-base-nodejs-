exports.success= function(req, res,message,status){
    res.status(status||200).send({
        err:'',
        body: message
    });
}
exports.error = function(req,res,message,status,details){
    console.error('[response error]'+details);// me permte conocer los detalles del error ocurrido en caso de que pase
    res.status(status||500).send({
        err:message,
        body: '',
    }); 
}