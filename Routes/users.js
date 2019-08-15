const express = require('express'); // INSTANCIA DO EXPRESS
const router = express.Router(); // INSTANCIA DA ROTA
const Users = require('../model/user');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => { // ASYNC FAZ COM QUE A FUNÇÃO SEJA EXECUTA ASSICRONA
    try{
        const users = await Users.find({}); // AWAIT FAZ A FUNÇÃO AGUARDAR UM TEMPO O RETORNO
        return res.send(users)
    } catch (err){
        return res.send({error: 'Erro na consulta dos usuários'})
    }
});

router.post('/cadastrar', async (req, res) => {
    const { email, password} = req.body;

    if(!email || !password) return res.send({ error: 'Dados insuficientes!'});

    try{
        if (await Users.findOne({email})) return res.send({error: 'Usuário já registrado!'});

        const user = await Users.create(req.body);
        user.password = undefined;
        return res.send(user);
    } catch(err){
        return res.send({error : 'Erro ao buscar usuário!' + err});
    }
});

router.post('/auth', async (req,res) => {
    const { email, password} = req.body;

    if(!email || !password) return res.send({ error: 'Dados insuficientes!'});

    try {
        const user = await Users.findOne({ email }).select('+password');
        if(!user) return res.send({ error: 'Usuário não cadastrado!'});

        const pass_ok = await bcrypt.compare(password, user.password);

        if(!pass_ok) return res.send({ error: 'Erro ao autenticar usuário!'});

        user.password = undefined;
        return res.send(user);
    } catch (err){
        res.send({error: 'Erro ao buscar usuário!' + err})
    }
});

module.exports = router;