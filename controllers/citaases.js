const mysql = require('mysql');


const conexion = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.agendarases=(req,res)=>{
    const idhorarioase= req.body.id;
    const idusuario=req.session.userId;
    conexion.query('UPDATE horariosase SET hor_ase_Disponible=0 WHERE id_horarioase =?',[idhorarioase]);
    conexion.query('INSERT INTO citaasesor SET ?',{fk_horarioase:idhorarioase,fk_usuario:idusuario},(error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/ListaAsesores');
        }
    })
};

exports.agendarcitausuario=(req,res)=>{
    const idhorarioase= req.body.fk_horarioase;
    const idusuario=req.body.fk_usuario;
    conexion.query('UPDATE horariosase SET hor_ase_Disponible=0 WHERE id_horarioase =?',[idhorarioase]);
    conexion.query('INSERT INTO citaasesor SET ?',{fk_horarioase:idhorarioase,fk_usuario:idusuario},(error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/seleccionarcliente');
        }
    })
};