
const socket = io()
//elementos del dom
let message = document.getElementById('message');
let user    = document.getElementById('user');
let boton   = document.getElementById('send');
let output  = document.getElementById('output');
let actions = document.getElementById('actions');

if(message){

    boton.addEventListener('click',()=>{
        
        socket.emit('chat:io', {
            usuario: user.value,
            mensaje: message.value,
        })
        message.value = "";
    });
}

message.addEventListener('keypress', ()=>{
    socket.emit('escribiendo', user.value)
})

message.addEventListener('keypress', ()=>{
    socket.emit('escribiendo', user.value)
})

socket.on('chat:message', data =>{
    output.innerHTML += `<p>
    <strong>${data.usuario}</strong>:${data.mensaje} 
    </p>`
});

socket.on('escribiendo', data=>{
    
    actions.innerHTML = `<p>el usuario ${data} esta escribiendo</p>`
})
