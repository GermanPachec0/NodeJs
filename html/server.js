const express = require('express');

const app = express();

//declaro el motor de vista
app.set('view engine','ejs');

//indico el recurso statico
express.static('assets');

// Se utiliza para que se puedan descargar archivos desde el cliente
app.use('/assets',express.static('assets'),{
    //actualizar el cache  etag = no lo actualiza y maxAge lo actualiza por tiempo
    //etag: false 
    //maxAge: '1h'
});


//Se usa para enviar un archivo y establece la dirección de mi archivo
app.get('/', (req,res) =>{
    //renderiza la vista
    res.render('index')


    /*res.sendFile('index.html',{
        root:__dirname
    });*/
    
})

app.listen(3000);