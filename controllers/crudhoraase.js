const mysql = require('mysql');


const conexion = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.savehora = (req,res)=>{
const hor_ase_consultorio= req.body.hor_ase_consultorio;
const hor_ase_fechayhora = req.body.hor_ase_fechayhora;
const fk_asesor=req.session.userId;
conexion.query('INSERT INTO horariosase SET hor_ase_Disponible=1, ?',{hor_ase_consultorio:hor_ase_consultorio,hor_ase_fechayhora:hor_ase_fechayhora,fk_asesor:fk_asesor},(error,results)=>{
    if(error){
        console.log(error);
    }else{
        res.redirect('/controlhora');
    }
})
};

exports.updatehora=(req,res)=>{
    const id_horarioase= req.body.id_horarioase;
    const hor_ase_consultorio= req.body.hor_ase_consultorio;
    const hor_ase_fechayhora= req.body.hor_ase_fechayhora;   
    conexion.query('UPDATE horariosase SET ? WHERE id_horarioase =?',[{hor_ase_consultorio:hor_ase_consultorio,hor_ase_fechayhora:hor_ase_fechayhora},id_horarioase],(error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/controlhora');
        }
    })

    
}