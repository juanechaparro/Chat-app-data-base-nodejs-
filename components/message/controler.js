const { socket } = require('../../socket');
const store = require('./store');


function addMessage(user,message, file){
    return new Promise((resolve, reject)=>{
        if(!user || !message){
            console.error("[messageController] no hay usuario o mensaje");
            return reject('No son correctos los dátos');
        }
        let fileUrl = '';
        if(file){
            fileUrl ='http://localhost:3000/app/files/'+ file.filename;
        }
        console.log(user);
        console.log(message); 
        const fullMessage =  {
            user: user,
            message:message,
            date: new Date() , 
            file: fileUrl,
    };
    store.add(fullMessage);
    socket.io.emit('message', fullMessage)
    // console.log(fullMessage); 
    resolve(fullMessage);
})

}

function getMessages(filterUser){
    return new Promise((resolve, reject)=>{
        resolve(store.list(filterUser));
    })
}
 function updateMessage(id,message){
    return new Promise(async(resolve, reject)=>{
       if (!id || !message) {
            reject('Invalid date');
            return false;
        }
      const result = await  store.updateText(id,message);
      resolve(result);
    })
}
function deleteMessage(id){
    return new Promise((resolve, reject)=>{
        if(!id){
            reject('Id invalido')
            return false;
        }                                                   
     store.remove(id)
        .then(()=>{
            resolve();
        })
        .catch(e =>{
            reject(e);
        })
    })

    
}
module.exports={
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,
};