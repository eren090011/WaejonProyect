const { exec } = require('child_process');
const moment = require('moment');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const rclone = require('rclone');



const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const rutaCarpeta = './backups/';

exports.crearCopiaSeguridad = function(req, res) {
  const fechaHora = moment().format("YYYYMMDD_HHmmss");
  const nombreArchivo = `backup_${fechaHora}.sql`;
  const rutaCompleta = rutaCarpeta + nombreArchivo;
  const comando = `mysqldump --user=michael --password=1234 ${db.config.database} > ${rutaCompleta}`;

  exec(comando, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al crear copia de seguridad: ${error}`);
      return;
    }
    console.log(`Copia de seguridad creada correctamente en el archivo ${rutaCompleta}`);
    res.redirect('/backupindex');
  });
}


  
  exports.mostrarBackups = function() {
    const backupsDir = path.join(__dirname, 'backups');
    fs.readdir(backupsDir, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        const source = fs.readFileSync(path.join(__dirname, 'tabla.hbs'), 'utf8');
        const template = Handlebars.compile(source);
        const html = template({ files });
        // Aquí puedes mostrar el HTML de la tabla en tu aplicación
        console.log(html);
    });
}

exports.restaurarCopiaSeguridad = function(req, res) {
  const archivo = req.params.archivo;
  const rutaCompleta = rutaCarpeta + archivo;
  const comando = `mysql --user=michael --password=1234 ${db.config.database} -e "source ${rutaCompleta}"`


  exec(comando, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al restaurar copia de seguridad: ${error}`);
      return;
    }
    console.log(`Copia de seguridad ${archivo} restaurada correctamente`);
    res.redirect('/backupindex');
  });
};

exports.restaurarCopiaSeguridad = function(req, res) {
  const archivo = req.body.file;
  const rutaCompleta = path.join(__dirname, '../backups', archivo);
  const comando = `mysql --user=michael --password=1234 ${db.config.database} < ${rutaCompleta}`;

  exec(comando, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al restaurar copia de seguridad: ${error}`);
      return;
    }
    console.log(`Copia de seguridad restaurada correctamente desde el archivo ${rutaCompleta}`);
    res.redirect('/backupindex');
  });
};

exports.programarCopiaSeguridad = function(frecuencia) {
  const frecuenciaCron = `*/${frecuencia} * * * *`; // Ejecutar cada "frecuencia" minutos
  cron.schedule(frecuenciaCron, () => {
    console.log('Ejecutando copia de seguridad periódica...');
    const fechaHora = moment().format("YYYYMMDD_HHmmss");
    const nombreArchivo = `backup_${fechaHora}.sql`;
    const rutaCompleta = path.join(rutaCarpeta, nombreArchivo);
    const comando = `mysqldump --user=michael --password=1234 ${db.config.database} > ${rutaCompleta}`;

    exec(comando, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al crear copia de seguridad: ${error}`);
        return;
      }
      console.log(`Copia de seguridad periódica creada correctamente en el archivo ${rutaCompleta}`);
    });
  });
}