const { Schema, model } = require("mongoose");

const periodSchema = new Schema({
    sector: String,
    hours: Number
})

const daySchema = new Schema({
    start: Date,
    periods: [periodSchema]
})

const scheduleSchema = new Schema({
    time: Number,
    campain: Boolean,
    days: [daySchema],
    user: String
    // user: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // }]
})


/**
 * Al hacer req.json() en un endpoint, lo que sea que vaya dentro del json() será parseado 
 * aun objeto JSON. Sin embargo, en el proceso aparecerán nuevas entradas que no necesitamos
 * y otras que queremos cambiar. Para eso transformamos el comportamiento mediante esta fórmula.
 * Nota: Es desaconsejable usar el 'delete' para eliminar entradas de JSON pues lo que hacemos es
 * mutar la variable. Se debe repetir el proceso para el resto de Schemas anidados, pues cada uno
 * recibirá unos valores _id...
 */
scheduleSchema.set('toJSON', {
    transform: (document,  returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v

        returnedObject.days.map(day => {
            day.id = day._id
            delete day._id
            delete day.__v

            day.periods.map(period => {
                period.id = period._id
                delete period._id
                delete period.__v
            })
        })
    }
})

const Schedule = model('Schedule', scheduleSchema)

module.exports = {
    Schedule
}