const env = process.env.NODE_ENV || 'dev';

/*PARA MUDAR O AMBIENTE DE CONFIGURAÇÃO, BASTA DA O COMANDO 'set NODE_ENV=producao no cmd na pasta do projeto' */

const config = () =>{
    switch(env){
        /**/ 
        case 'dev':
            return {
                bd_string: 'mongodb+srv://usuario123:c3r2e7u3@clusterapi-yq3cq.mongodb.net/test?retryWrites=true&w=majority',
                jwt_pass: 'senhaDeProteçãoParaToken',
                jwt_expires_in: '10d'
            }
        case 'homologacao':
            return {
                bd_string: 'mongodb+srv://usuario123:c3r2e7u3@clusterapi-yq3cq.mongodb.net/test?retryWrites=true&w=majority',
                jwt_pass: 'senhaDeProteçãoParaToken',
                jwt_expires_in: '4d'
            }
        case 'producao':
            return {
                bd_string: 'mongodb+srv://usuario123:c3r2e7u3@clusterapi-yq3cq.mongodb.net/test?retryWrites=true&w=majority',
                jwt_pass: 'senhaDeProteçãoParaToken',
                jwt_expires_in: '6d'
            }
    }    
}

console.log(`Iniciando a API em ambiente ${env.toLocaleUpperCase()}`);

module.exports = config();