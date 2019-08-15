const express = require('express'); // INSTANCIA DO EXPRESS
const router = express.Router(); // INSTANCIA DA ROTA

router.get('/', function (req, res) { // USANDO FUNCTION
    let obj = req.query;
    obj.nome
    return res.send({message: `Tudo ok com o metodo GET! ${obj.nome} da rota index`});
});

router.post('/', (req, res) =>{ // USANDO OUTRA FORMA DE FUNTION
    return res.send({message: 'Tudo ok com o metodo POST da rota index'});
});

module.exports = router;