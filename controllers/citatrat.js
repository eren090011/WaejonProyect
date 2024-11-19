const mysql = require('mysql');


const conexion = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.agendartrat=(req,res)=>{
    const idhorariotrat= req.body.id;
    const idusuario=req.session.userId;
    conexion.query('UPDATE horariostrat SET Disponible=0 WHERE id =?',[idhorariotrat]);
    conexion.query('INSERT INTO citatratamiento SET ?',{fk_horariotrat:idhorariotrat,fk_usuario:idusuario},(error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/catalogotrat');
        }
    })
};

    


