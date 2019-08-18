const express = require('express'); // INSTANCIA DO EXPRESS
const router = express.Router(); // INSTANCIA DA ROTA
const auth = require('../middlewares/auth')

router.get('/', auth, (req, res) => { // USANDO FUNCTION
    console.log(res.locals.auth_data);
    return res.send({message: 'informação sigilosa'});
});

router.post('/', (req, res) =>{ // USANDO OUTRA FORMA DE FUNTION
    return res.send({message: 'Tudo ok com o metodo POST da rota index'});
});

module.exports = router;