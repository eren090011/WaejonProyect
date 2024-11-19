const mysql = require('mysql');

const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.profile = (req, res) => {
    
    db.query("SELECT * FROM usuarios WHERE idusuarios = ?", [req.session.userId], (err, resultados) => {
        if (err) {
            console.log(err);
        }
        if (resultados[0]==undefined) {
            return res.status(404).render('login', {
                message: 'No se encontró el usuario'
            });
        } else {
            const { us_nombre, us_correo, us_telefono, us_direccion, us_documento } = resultados[0];
            res.render('profile', { us_nombre, us_correo, us_telefono, us_direccion, us_documento });
        }
    });
}

exports.editProfile = (req, res) => {
    db.query("SELECT * FROM usuarios WHERE idusuarios = ?", [req.session.userId], (err, resultados) => {
      if (err) {
        console.log(err);
      }
      if (resultados.length == 0) {
        return res.status(404).render('editProfile', {
          message: 'No se encontró el usuario'
        });
      } else {
        const { us_nombre, us_correo, us_password, us_telefono, us_direccion, us_documento } = resultados[0];
        res.render('editProfile', { us_nombre, us_correo, us_password, us_telefono, us_direccion, us_documento });
      }
    });
  }

  exports.updateProfile = (req, res) => {
    // Obtener los datos del formulario
    const { us_nombre, us_correo, us_password, us_passwordconfirm, us_direccion, us_telefono, us_documento } = req.body;
    
    if (us_password !== us_passwordconfirm) {
      return res.render('editProfile', {
        message: 'Las contraseñas no coinciden'
      });
    }
    
    // Encriptar la contraseña
    bcrypt.hash(us_password, 10, (err, hashedPassword) => {
      if (err) throw err;
      
      // Actualizar la información del usuario en la base de datos
      const query = 'UPDATE usuarios SET ? WHERE idusuarios = ?';
      db.query(query, [{us_nombre, us_correo, us_password: hashedPassword, us_direccion, us_telefono, us_documento}, req.session.userId], (error, results) => {
        if (error) throw error;
        
        // Redirigir al usuario a la página de perfil
        res.redirect('/profile');
      });
    });
  }

