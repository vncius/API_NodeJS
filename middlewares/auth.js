const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token_header = req.headers.auth;
    if(!token_header) return res.send({ error: 'Autenticação não enviada!'});

    jwt.verify(token_header, 'senhaDeProteçãoParaToken', (err, decoded) => {
        if(err) return res.send({ error: 'Token inválido!'});
        res.locals.auth_data = decoded; 'FAZ O REGISTRO DA AUTENTICAÇÃO LOCALMENTE PARA VALIDAR ACESSO EM ENDPOINTS DIFERENTES'
        return next();
    })
}

module.exports = auth;