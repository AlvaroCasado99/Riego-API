const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: String,
    name: String,
    passwordHash: String,
    fields: [{
        type: Schema.Types.ObjectId,
        ref: 'Field'
    }],
    schedules: [{
        type: Schema.Types.ObjectId,
        ref: 'Schedule'
    }]
})


/**
 * Al hacer req.json() en un endpoint, lo que sea que vaya dentro del json() será parseado 
 * aun objeto JSON. Sin embargo, en el proceso aparecerán nuevas entradas que no necesitamos
 * y otras que queremos cambiar. Para eso transformamos el comportamiento mediante esta fórmula.
 * Nota: Es desaconsejable usar el 'delete' para eliminar entradas de JSON pues lo que hacemos es
 * mutar la variable. Se debe repetir el proceso para el resto de Schemas anidados, pues cada uno
 * recibirá unos valores _id...
 * 
 * IMPORTANTE: Aquí nos podemos asegurar (y debemos) que el password JAMÁS sea deveulto
 */
userSchema.set('toJSON', {
    transform: (document,  returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = model('User', userSchema)

module.exports = { 
    User
}