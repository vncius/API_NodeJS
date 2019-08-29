const express = require('express'); // INSTANCIA DO EXPRESS
const router = express.Router(); // INSTANCIA DA ROTA
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

//FUNÇÕES AUXILIARES
const createUserToken = (userId) => {
    return jwt.sign({ id: userId}, config.jwt_pass, { expiresIn: config.jwt_expires_in})
}

router.get('/', async (req, res) => { // ASYNC FAZ COM QUE A FUNÇÃO SEJA EXECUTA ASSICRONA
    try{
        const users = await Users.find({}); // AWAIT FAZ A FUNÇÃO AGUARDAR UM TEMPO O RETORNO
        return res.send(users)
    } catch (err){
        return res.status(500).send({error: 'Erro na consulta dos usuários'})
    }
});

router.post('/create', async (req, res) => {
    const { email, password} = req.body;

    if(!email || !password) return res.status(400).send({ error: 'Dados insuficientes!'});

    try{
        if (await Users.findOne({email})) return res.status(400).send({error: 'Usuário já registrado!'});

        const user = await Users.create(req.body);
        user.password = undefined;
        return res.status(201).send({user, token : createUserToken(user.id)});
    } catch(err){
        return res.status(500).send({error : 'Erro ao buscar usuário!' + err});
    }
});

router.post('/auth', async (req,res) => {
    const { email, password} = req.body;

    if(!email || !password) return res.status(400).send({ error: 'Dados insuficientes!'});

    try {
        const user = await Users.findOne({ email }).select('+password');
        if(!user) return res.status(400).send({ error: 'Usuário não cadastrado!'});

        const pass_ok = await bcrypt.compare(password, user.password);

        if(!pass_ok) return res.status(401).send({ error: 'Erro ao autenticar usuário!'});

        user.password = undefined;
        return res.send({user, token : createUserToken(user.id)});
    } catch (err){
        res.status(500).send({error: 'Erro ao buscar usuário!' + err})
    }
});

module.exports = router;