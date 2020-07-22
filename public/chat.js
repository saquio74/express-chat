
Notification.requestPermission()
Notification.permission



const socket = io()
//elementos del dom
let message = document.getElementById('message');
let user    = document.getElementById('user');
let boton   = document.getElementById('send');
let output  = document.getElementById('output');
let actions = document.getElementById('actions');


boton.addEventListener('click',()=>{
    if(message.value){

        socket.emit('chat:io', {
            usuario: user.value,
            mensaje: message.value,
        })
        message.value = "";
        socket.emit('notificacion:io',{
            tittle: "chat Pier Adriel",
            body: "Mensaje de "+ user.value,
        })
    }
});

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

socket.on('notificacion', data=>{
    var noti = new Notification(data.tittle, data )
    setTimeout( function() { noti.close() }, 6000)
})
