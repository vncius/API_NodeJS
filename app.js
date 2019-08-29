// TODAS AS DEPENDENCIAS SÃO INSTALADAS COM : NPM INSTAL **** --SAVE
const express = require('express'); //EXPRESS É UM FRAMEWORK PARA CRIAÇÃO DE API
const app = express();
const mongoose = require('mongoose'); // AJUDA A ORGANIZAR O CÓDIGO NA ARQUITETURA MVC
const bodyParser = require('body-parser'); // PASSA JSON PARA OBJETO
const config = require('./config/config');

//STRING DE CONEXÃO
const url = config.bd_string;
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true};

mongoose.connect(url, options);
mongoose.set('userCreateIndex', true); // PARA EVITAR MENSAGENS DE CONSOLE

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao banco de dados!');
});

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão de banco de dados: '+ err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectado do banco dados!');
});

// FAZ COM QUE REQUISIÇÕES QUE PASSE UM CORPO 'BODY', APÓS CHEGAR NO REQ, SEJA POSSIVEL PEGAR O ATRIBUTO DO OBJETO
app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());

const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000);

module.exports = app;

