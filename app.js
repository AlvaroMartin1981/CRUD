const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

/*app.get('/', (req,res)=>{
    res.send(`
    <h1>Lista de usuarios</h1>
    <ul>${usuarios.map((usuario)=> `<li>Id:${usuario.id} | Nombre: ${usuario.nombre} | Edad: ${usuario.edad} años | ${usuario.lugarProcedencia}</li>`).join('')};
    </ul>
    <form action="/usuarios" method="post">
    <label for"nombre">Nombre</label>
    <input type="text" id="nombre" name="nombre" required>
    <label for"edad">Edad</label>
    <input type="number" id="edad" name="edad">
    <label for"lugarProcedencia">Lugar de Procedencia</label>
    <input type="text" id="lugarProcedencia" name="lugarProcedencia">
    <button type="submit">Agregar Usuario</button>
    </form>
    <a href="/usuarios">Usuarios json</a>
    `);
});*/
app.get('/usuarios',(req, res)=>{
    res.json(usuarios);
});
app.get('/usuarios/:nombre',(req,res)=>{
    const nombreUsuario = req.params.nombre;
    const usuario = usuarios.find((usuario)=> usuario.nombre ===nombreUsuario);

    if(usuario){
        res.json(usuario)
    } else {
        res.status(404).json({mensaje:'Usuario no encontrado.'})
    };
});
app.post('/usuarios', (req,res)=>{
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia,
    };
    usuarios.push(nuevoUsuario);
    res.redirect('/');
});
app.put('/usuarios/:nombre',(req, res)=>{
    const nombreUsuario =req.params.nombre;
    const index = usuarios.findIndex((usuario)=> usuario.nombre ===nombreUsuario);

    if(index !== -1){
        usuarios[index].edad=req.body.edad;
        usuarios[index].lugarProcedencia=req.body.lugarProcedencia;
        res.json(usuarios[index]);
    } else{
        res.status(404).json({ mensaje : 'Usuario no encontrado' });
    };
});

app.delete('/usuarios/:nombre',(req, res)=>{
    const nombreUsuario =req.params.nombre;
    usuarios=usuarios.filter((usuario)=> usuario.nombre !==nombreUsuario);
    res.json({ mensaje: 'Usuario eliminado correctamente'})
})


app.listen(3000,()=>{
    console.log("El servidor esta escuchando en el puerto 3000");
});