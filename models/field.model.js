import { Schema, model } from "mongoose";

const fieldSchema = new Schema({
    name: String,
    code: String,
    type: String,
    cordinates: String,
    surface: Number,
    maxTime: Number,
    startDay: Number,
    startHour: String,
    sectors: Number,
    period: Number,
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})


/**
 * Al hacer req.json() en un endpoint, lo que sea que vaya dentro del json() será parseado 
 * aun objeto JSON. Sin embargo, en el proceso aparecerán nuevas entradas que no necesitamos
 * y otras que queremos cambiar. Para eso transformamos el comportamiento mediante esta fórmula.
 * Nota: Es desaconsejable usar el 'delete' para eliminar entradas de JSON pues lo que hacemos es
 * mutar la variable. Se debe repetir el proceso para el resto de Schemas anidados, pues cada uno
 * recibirá unos valores _id...
 */
fieldSchema.set('toJSON', {
    transform: (document,  returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Field = model('Field', fieldSchema)

export default Field