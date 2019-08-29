const express = require('express'); // INSTANCIA DO EXPRESS
const router = express.Router(); // INSTANCIA DA ROTA
const auth = require('../middlewares/auth')

router.get('/', auth, function (req, res) { // USANDO FUNCTION
    console.log(res.locals.auth_data);
    return res.send({message: 'informação sigilosa'});
});

router.post('/', auth, (req, res) =>{ // USANDO OUTRA FORMA DE FUNTION
    return res.send({message: 'Tudo ok com o metodo POST da rota index'});
});

module.exports = router;

/*
200 - OK
201 - CREATED
202 - ACCEPTED (REQUISIÇÕES QUE NÃO RETORNA UMA OPERAÇÃO NA HORA)

400 - BAD REQUEST 
401 - UNAUTHORIZED -- AUTENTICAÇÃO, TEM CARATER TEMPORÁRIO
403 - FORBIDDEN -- AUTORIZAÇÃO, TEM CARATER PERMANENTE
404 - NOT FOUND -- PÁGINA NÃO ENCONTRADO

500 - INTERNAL SERVER ERROR
501 - NOT IMPLEMENTED - A API NÃO SUPORTA ESSA FUNCIONALIDADE
503 - SERVICE UNAVAILABLE - A API EXECUTA ESSA OPERAÇÃO, MAS NÃO ESTÁ DISPONIVEL NO MOMENTO
*/