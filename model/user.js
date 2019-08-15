const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase:true},
    password: { type: String, require: true, select: false }, //SELECT FALSE, É PARA NAO RECEBER ESSE CAMPO NA BUSCA
    created: {type: Date, default: Date.now } // PREENCHE DATA ATUAL POR TER VALOR DEFAULT DATA ATUAL
});

UserSchema.pre('save', async function(next){ // ANTES DE SALVAR NO BANCO É EXECUTADO ESSA FUNÇÃO
    let user = this; 
    if (!user.isModified('password')) return next(); // SE NÃO HOUVER MODIFICAÇÃO NÃO É EXECUTADO O CÓDIGO ABAIXC

    user.password = await bcrypt.hash(user.password, 10);
    return next();
});

module.exports = mongoose.model('User', UserSchema);