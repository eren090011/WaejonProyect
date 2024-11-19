const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) => {

    const {name, email, password, passwordconfirm, address, phone, document} = req.body;
    if (password!== passwordconfirm) {
        return res.status(400).send("passwords do not match");
    }

    db.query("SELECT * FROM usuarios WHERE us_correo =?", [email], async (err, resultados) => {
        if (err) {
            console.log(err);
            
        }
        if ( resultados.length > 0) {
            return res.render('register', {
                message: 'El email ya está registrado'
            });
        } else if (password!== passwordconfirm) {
            return res.render('register', {
                message: 'las contraseñas no coinciden'
            });
        }
        
        let hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        
        db.query("INSERT INTO usuarios SET ?", {us_nombre: name, us_correo: email, us_password: hashedPassword, us_direccion: address, us_telefono: phone, us_documento: document, tipo_usuario_idtipo_usuario: 1}, (err, resultados) => {
            if (err) {
                console.log(err);
            }else {
                res.redirect('../login');
            }

        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM usuarios WHERE us_correo = ?", [email], async (err, resultados) => {
        if (err) {
            console.log(err);
            return res.status(500).render('login', {
                message: 'Ocurrió un error al iniciar sesión'
            });
        }
        if (resultados.length == 0 || !(await bcrypt.compare(password, resultados[0].us_password))) {
            return res.status(401).render('login', {
                message: 'El email o la contraseña son incorrectos'
            });
        } else {
            // Aquí puedes manejar el inicio de sesión exitoso
            req.session.userId = resultados[0].idusuarios;

            switch (resultados[0].tipo_usuario_idtipo_usuario) {
                case 1:
                    res.redirect('/');
                    break;
                case 2:
                    res.redirect('/pdcasesores');
                    break;
                case 3:
                    res.redirect('/pdcadmin');
                    break;
                default:
                    res.status(500).render('login', {
                        message: 'El tipo de usuario no está definido'
                    });
                    break;
            }
        }
    });
};