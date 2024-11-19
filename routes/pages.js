const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');
const { exec } = require('child_process');


router.get('/', (req, res) => {
    res.render('mainpag');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/Dermatologos', (req, res) => {
    res.render('Dermatologos');
});

router.get('/Fisios', (req, res) => {
    res.render('Fisios');
});

router.get('/pagenosotrosinformacion', (req, res) => {
    res.render('pagenosotrosinformacion');
});

router.get('/edituser', (req, res) => {
    res.render('edituser');
});

router.get('/pdcadmin', (req, res) => {
    res.render('pdcadmin');
});

const controller = require('../controllers/profile');

router.get('/profile', controller.profile);

router.get('/profile/editProfile', controller.editProfile);
router.post('/updateProfile', controller.updateProfile);

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) throw err;
      
      res.redirect('/');
    });
  });

const backupController = require('../controllers/backup');

const fs = require('fs');


router.get('/backup', backupController.crearCopiaSeguridad);

router.get('/backupindex', (req, res) => {
    const backupsDir = path.join(__dirname, '../backups');
    fs.readdir(backupsDir, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }
      let html = '<table class="backup-table"><thead><tr><th>Nombre del archivo</th><th>Acciones</th></tr></thead><tbody>';
      for (let i = 0; i < files.length; i++) {
        html += `<tr><td>${files[i]}</td><td><form method="post" action="/restore"><button type="submit" name="file" value="${files[i]}">Restaurar</button></form></td></tr>`;
      }
      html += '</tbody></table>';
      res.render('backupindex', { tableHtml: html });
    });
  });
  
  router.get('/restaurar/:nombreArchivo', backupController.restaurarCopiaSeguridad);
  router.post('/restore', backupController.restaurarCopiaSeguridad);

  router.get('/configbackup', (req, res) => {
    res.render('configbackup');
  });

  router.post('/configbackup', (req, res) => {
    const { frecuencia } = req.body;
    backupController.programarCopiaSeguridad(frecuencia);
    res.redirect('/backupindex');
  });
  
  
 

module.exports = router;

router.get('/index', (req, res) => {
const query = 'SELECT * FROM usuarios';
conexion.query(query, (err, result) => {
    if (err) throw err;
    res.render('index', { usuarios: result });
});
});

router.get('/indexasesor', (req, res) => {
    const query = 'SELECT * FROM usuarios WHERE tipo_usuario_idtipo_usuario = 1';
    conexion.query(query, (err, result) => {
        if (err) throw err;
        res.render('indexasesor', { usuarios: result });
    });
    });

router.get('/add', (req, res) => {
res.render('add');
});

router.post('/add', async (req, res) => {
const { us_nombre, us_correo, us_password, us_passwordconfirm, us_direccion, us_telefono, us_documento } = req.body;

if (us_password !== us_passwordconfirm) {
    return res.status(400).send('Passwords do not match');
}

conexion.query('SELECT * FROM usuarios WHERE us_correo = ?', [us_correo], async (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
    return res.render('add', { message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(us_password, 10);

    const query = 'INSERT INTO usuarios SET ?';
    const usuario = { us_nombre, us_correo, us_password: hashedPassword, us_direccion, us_telefono, us_documento };
    conexion.query(query, usuario, (err, result) => {
    if (err) throw err;
    res.redirect('/index');
    });
});
});

router.get('/addasesor', (req, res) => {
    res.render('addasesor');
    });
    
    router.post('/addasesor', async (req, res) => {
    const { us_nombre, us_correo, us_password, us_passwordconfirm, us_direccion, us_telefono, us_documento } = req.body;
    
    if (us_password !== us_passwordconfirm) {
        return res.status(400).send('Passwords do not match');
    }
    
    conexion.query('SELECT * FROM usuarios WHERE us_correo = ?', [us_correo], async (err, result) => {
        if (err) throw err;
    
        if (result.length > 0) {
        return res.render('add', { message: 'Email already registered' });
        }
    
        const hashedPassword = await bcrypt.hash(us_password, 10);
    
        const query = 'INSERT INTO usuarios SET ?';
        const usuario = { us_nombre, us_correo, us_password: hashedPassword, us_direccion, us_telefono, us_documento };
        conexion.query(query, usuario, (err, result) => {
        if (err) throw err;
        res.redirect('/index');
        });
    });
    });

router.get('/edit/:idusuarios', (req, res) => {
    const { idusuarios } = req.params;
    const query = 'SELECT * FROM usuarios WHERE idusuarios = ?';
    conexion.query(query, [idusuarios], (err, result) => {
      if (err) throw err;
      res.render('edituser', { usuario: result[0] });
    });
  });

router.post('/update/:idusuarios', (req, res) => {
const { idusuarios } = req.params;
const { us_nombre, us_correo, us_password, us_direccion, us_telefono, us_documento } = req.body;
const query = 'UPDATE usuarios SET us_nombre = ?, us_correo = ?, us_password = ?, us_direccion = ?, us_telefono = ?, us_documento = ? WHERE idusuarios = ?';
conexion.query(query,[us_nombre,us_correo ,us_password ,us_direccion ,us_telefono ,us_documento,idusuarios],(err,result)=>{
    if(err) throw err;
    res.redirect('/index');
});
});

router.get('/delete/:idusuarios', (req,res)=>{
    const {idusuarios} = req.params;
    const query='DELETE FROM usuarios WHERE idusuarios=?';
    conexion.query(query,[idusuarios],(err,result)=>{
        if(err) throw err;
        res.redirect('/index');
    });
});

module.exports=router;


//productos 
router.get('/PageProductos', (req, res) => {
    conexion.query('SELECT * FROM productos',(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('PageProductos',{productos:results});
        
        }
    })
});




//Rutas hechas por jesus

//conexion a la base de datos y para que funcionen las consultas y cruds
const conexion = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

//catalogo de tratamientos que se le mostrara al cliente
router.get('/catalogotrat',(req,res)=>{

    conexion.query('SELECT * FROM tratamientos',(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('catalogotrat',{results:results});
        }
    })
});

//ruta para solicitar tratamientos 
router.get('/solicitartrat/:id',(req,res)=>{
    const id = req.params.id; 
    conexion.query('SELECT * FROM tratamientos, horariostrat WHERE tratamientos.id=? AND horariostrat.fk_tratamiento=? and horariostrat.Disponible=1',[id, id],(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('solicitartrat',{tratamiento:results});
        }
    })    
});

//agendar cita asesor
const citaases = require('../controllers/citaases');
router.post('/agendarases', citaases.agendarases);   

//agendar cita tratamiento
const citatrat = require('../controllers/citatrat');
router.post('/agendartrat', citatrat.agendartrat);   

 
//aca van las rutas para editar, crear y borrar tratamientos
//crud control de los tratamientos 
router.get('/controltrat',(req,res)=>{

    conexion.query('SELECT * FROM tratamientos',(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('controltrat',{results:results});
        }
    })
});

//crear tratamientos
router.get('/create',(req,res)=>{
    res.render('create');
});

//editar tratamientos
router.get('/edittrat/:id',(req,res)=>{
    const id = req.params.id; 
    conexion.query('SELECT * FROM tratamientos WHERE id=?',[id],(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('edit',{tratamiento:results[0]});
        }
    })    
});

//borrar tratamientos 
router.get('/deletetrat/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM tratamientos WHERE id = ?',[id], (error, results)=>{
        if(error){
            throw error;
        }else{           
            res.redirect('/controltrat');         
        }
    })
});


router.get('/cancelarcita/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM citatratamiento WHERE citatratid = ?',[id], (error, results)=>{
        if(error){
            throw error;
        }else{           
            res.redirect('/tuscitastrat');         
        }
    })
});

//citas asesores
//formulario para enviar los datos del usuario
router.get('/ListaAsesores', (req, res) => {
    conexion.query('SELECT * FROM asesores, especialidades WHERE fk_especialidad=id_especialidad ORDER BY id_asesor ASC;',(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('ListaAsesores',{results:results});
        }
    })
});

//ruta para agendar cita con asesor
router.get('/solicitarases/:id',(req,res)=>{
    const id = req.params.id; 
    conexion.query('SELECT * FROM asesores, horariosase WHERE asesores.id_asesor=? AND horariosase.fk_asesor=? and horariosase.hor_ase_disponible=1',[id, id],(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('solicitarases',{asesor:results});
        }
    })    
});

//Tus citas
router.get('/tuscitas', (req, res) => {
    res.render('tuscitas');
});
//citas tratamientos
router.get('/tuscitastrat',(req,res)=>{
    const idusuario=req.session.userId;
    conexion.query('SELECT * FROM citatratamiento,horariostrat,tratamientos,usuarios WHERE citatratamiento.fk_horariotrat=horariostrat.id and horariostrat.fk_tratamiento=tratamientos.id and citatratamiento.fk_usuario= usuarios.idusuarios and citatratamiento.fk_usuario=?;',[idusuario],(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('tuscitastrat',{results:results});
        }
    })
});
//citas asesores
router.get('/tuscitasases',(req,res)=>{
    const idusuario=req.session.userId;
    conexion.query('SELECT * FROM citaasesor,horariosase,asesores,usuarios WHERE citaasesor.fk_horarioase=horariosase.id_horarioase and horariosase.fk_asesor=asesores.id_asesor and citaasesor.fk_usuario= usuarios.idusuarios and citaasesor.fk_usuario=?;',[idusuario],(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('tuscitasases',{results:results});
        }
    })
});
router.get('/cancelarasesoria/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM citaasesor WHERE citaasesid = ?',[id], (error, results)=>{
        if(error){
            throw error;
        }else{           
            res.redirect('/tuscitasases');         
        }
    })
});
//citas asesores(pendiente)
//metodos del crud en el controller crud
const crud = require('../controllers/crud');

router.post('/save', crud.save);   
router.post('/updatetrat', crud.update);  

module.exports = router;

//otros roles:
//asesor
//vista inicial
router.get('/pdcasesores', (req, res) => {
    res.render('pdcasesores');
});

//Crud Horarios
router.get('/controlhora',(req,res)=>{
    const idusuario=req.session.userId;
    conexion.query('SELECT * FROM usuarios,asesores,horariosase WHERE fk_id_usuario=? and fk_id_usuario=idusuarios and fk_asesor=id_asesor and hor_ase_Disponible=1;',[idusuario],(error,results)=>{
        
        if(error){
            throw error;
        }else{
            res.render('controlhora',{results:results});
        }
    })
});
//crear horario
router.get('/createhoraase',(req,res)=>{
    res.render('createhoraase');
});

//editar horario
router.get('/edithora/:id',(req,res)=>{
    const id = req.params.id; 
    conexion.query('SELECT * FROM horariosase WHERE id_horarioase=?',[id],(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('edithora',{horario:results[0]});
        }
    })    
});
//inhabilitar horario
router.get('/deletehoraase/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('UPDATE horariosase SET hor_ase_Disponible=0 WHERE id_horarioase =?',[id], (error, results)=>{
        if(error){
            throw error;
        }else{           
            res.redirect('/controlhora');         
        }
    })
});
//editar horario
const crudhoraase= require('../controllers/crudhoraase');
router.post('/updatehora', crudhoraase.updatehora);   

//save horario

router.post('/savehora', crudhoraase.savehora);   

//Citas 
router.get('/pdccitas',(req,res)=>{
    res.render('pdccitas');
});
//revisar citas


router.get('/revisarcitas',(req,res)=>{
    const idusuario=req.session.userId;
    conexion.query('SELECT * FROM citaasesor,horariosase,asesores,usuarios WHERE citaasesor.fk_horarioase=horariosase.id_horarioase and horariosase.fk_asesor=asesores.id_asesor and citaasesor.fk_usuario= usuarios.idusuarios and horariosase.fk_asesor= ? ;',[idusuario],(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('revisarcitas',{results:results});
        }
    })
});
router.get('/cancelarasesoriacliente/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM citaasesor WHERE citaasesid = ?',[id], (error, results)=>{
        if(error){
            throw error;
        }else{           
            res.redirect('/revisarcitas');         
        }
    })
});

//Agendar citas
//selecionar usuario
router.get('/seleccionarcliente', (req, res) => {
    const query = 'SELECT * FROM usuarios';
    conexion.query(query, (err, result) => {
        if (err) throw err;
        res.render('seleccionarcliente', { usuarios: result });
    });
    });


    router.get('/agendarcitas/:id', (req, res) => {
        const idcliente = req.params.id;
        const idusuario = req.session.userId;
      
        // Primera consulta
        const consultaInicial = new Promise((resolve, reject) => {
          conexion.query('SELECT * FROM asesores, horariosase WHERE asesores.id_asesor=? AND horariosase.fk_asesor=? AND horariosase.hor_ase_disponible=1', [idusuario, idusuario], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
        });
      
        // Segunda consulta
        const consultaAdicional = new Promise((resolve, reject) => {
          conexion.query('SELECT * FROM usuarios WHERE idusuarios = ?', [idcliente], (error, resultados) => {
            if (error) {
              reject(error);
            } else {
              resolve(resultados);
            }
          });
        });
      
        Promise.all([consultaInicial, consultaAdicional])
          .then(([results, resultados]) => {
            res.render('agendarcitas', {
              asesor: results,
              cliente: resultados
            });
          })
          .catch(error => {
            console.error(error);
            res.status(500).send('Error en la consulta');
          });
      });

//controlador para agendar la cita

router.post('/agendarcitausuario', citaases.agendarcitausuario);   


//ADMIN
router.get('/pdcadmin', (req, res) => {
    res.render('pdcadmin');
});
//Crud productos
router.get('/controlprod',(req,res)=>{

    conexion.query('SELECT * FROM productos',(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('controlprod',{results:results});
        }
    })
});

//borrar producto
router.get('/deleteprod/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM productos WHERE id = ?',[id], (error, results)=>{
        if(error){
            throw error;
        }else{           
            res.redirect('/controlprod');         
        }
    })
});

//editar producto
router.get('/editprod/:id',(req,res)=>{
    const id = req.params.id; 
    conexion.query('SELECT * FROM productos WHERE id=?',[id],(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('editprod',{producto:results[0]});
        }
    })    
});


//agregar producto
router.get('/createprod',(req,res)=>{
    res.render('createprod');
});



//metodos del crud en el controller crud
const crudprod= require('../controllers/crudprod');

router.post('/saveprod', crudprod.saveprod);   
router.post('/updateprod', crudprod.updateprod);  