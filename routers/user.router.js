const express = require("express")
const bcrypt = require("bcrypt")

const {User} = require("../models/user.model")
const {notFound} = require("../middlewares/notFound.middleware")
const router = express.Router()

// Rutas
router.post('/', async (req, res, next) => {
    const {username, name, password} = req.body
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    user.save()
        .then( saved => {
            res.status(201).json(saved)
        })
        .catch(err => {
            res.status(500).json({error: err.name})
        })
})


// Not Found (404) handler
router.use(notFound)

// Errors (Middleware)
router.use((error, req, res, next)=>{
    console.error(error)

    // When schedule Id is not valid
    if(error.name === 'CastError'){
        res.status(400).end()
    }else {
        res.status(500).end()
    }

})

module.exports = { 
    router
}