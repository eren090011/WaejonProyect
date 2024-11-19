const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const bodyparser = require('body-parser');
const hbs = require('handlebars');


dotenv.config({ path: './.env'});

const app = express();

const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.set('view engine', 'hbs');

db.connect((err) => {
    if (err) {
        console.log(err);
    }else{
        console.log('Connected to database');
    }
});

app.use(session({
    secret: 'tu secreto aquí',
    resave: false,
    saveUninitialized: false
}));

//define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


app.listen(4000, () => {
    console.log('Server corriendo en http://localhost:4000');
});

