const mysql = require('mysql');


const conexion = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.save = (req,res)=>{
const nombre= req.body.nombre;
const Descripcion= req.body.Descripcion;
conexion.query('INSERT INTO tratamientos SET ?',{nombre:nombre,Descripcion:Descripcion},(error,results)=>{
    if(error){
        console.log(error);
    }else{
        res.redirect('/controltrat');
    }
})
};

exports.update=(req,res)=>{
    const id= req.body.id;
    const nombre= req.body.nombre;
    const Descripcion= req.body.Descripcion;   
    conexion.query('UPDATE tratamientos SET ? WHERE id =?',[{nombre:nombre,Descripcion:Descripcion},id],(error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/controltrat');
        }
    })

    
}

exports.agendartrat=(req,res)=>{
    const idhorariotrat= req.body.id;
    const idusuario=req.session.userId;
    
    conexion.query('INSERT INTO citatratamiento SET ?',{fk_horariotrat:idhorariotrat,fk_usuario:idusuario},(error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/catalogotrat');
        }
    })
};

    


