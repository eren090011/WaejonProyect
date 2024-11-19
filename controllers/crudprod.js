const mysql = require('mysql');


const conexion = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.saveprod = (req,res)=>{
const nombre= req.body.nombre;
const descuento= req.body.descuento;
conexion.query('INSERT INTO productos SET ?',{nombre:nombre,descuento:descuento,precio:precio,imagen:imagen,descripcion:descripcion,cantidad:cantidad},(error,results)=>{
    if(error){
        console.log(error);
    }else{
        res.redirect('/controlprod');
    }
})
};

exports.updateprod=(req,res)=>{
    const id= req.body.id;
    const nombre= req.body.nombre;
    const descuento= req.body.descuento;
    const precio= req.body.precio;
    const imagen= req.body.imagen;
    const descripcion= req.body.descripcion;
    const cantidad= req.body.cantidad;
    conexion.query('UPDATE tratamientos SET ? WHERE id =?',[{nombre:nombre,descuento:descuento,precio:precio,imagen:imagen,descripcion:descripcion,cantidad:cantidad},id],(error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/controlprod');
        }
    })

    
}