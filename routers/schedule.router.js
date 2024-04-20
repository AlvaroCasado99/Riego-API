const express = require('express')
const {Schedule} = require('../models/schedule.model.js')
const {notFound} = require('../middlewares/notFound.middleware.js')

// Router for Schedule page
const router = express.Router();

// Schedule Router -> Middlewares


// Schedule Router -> Routes
router.post('/new', (req, res) => {
    console.log(req.body)
    if(req.body){
        const schedule = new Schedule(req.body)

        schedule.save()
            .then( saved => {
                res.set('Access-Control-Allow-Origin', '*');
                res.status(201).json(saved)
            })
            .catch(err => {
                res.status(500).json({error: err.name})
            })
    }else{
        res.status(400).json({msg: "Nothing to create"})
    }
})

// Schedule Router -> Routes
router.post('/update/:id', (req, res) => {
    console.log(req.body)
    if(req.body){
        const schedule = new Schedule(req.body.schedule)
        const id = req.params.id

        schedule.findByIdAndUpdate(id, schedule)
            .then( saved => {
                res.status(201).json(saved)
            })
            .catch(err => {
                res.status(500).json({error: err.name})
            })
    }else{
        res.status(400).json({msg: "Nothing to create"})
    }
})

/**
 * Returns information of the schedule whose ID matches the one in the parameters.
 */
router.get('/:id', (req, res, next) => {
    const id = req.params.id
    console.log(id)
    if(id){
        Schedule.findById(id)
            .then(schedule => {
                res.status(200).json(schedule)
            })
            .catch(err => {
                next(err)
            })

    }else{
        res.status(404).end()
    }
})

/**
 * Deletes register of the schedule whose ID matches the one in the parameters.
 */
router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    if(id){
        Schedule.findByIdAndDelete(id)
            .then(() => {
                res.status(204).end()
            })
            .catch(err => {
                next(err)
            })

    }else{
        res.status(404).end()
    }
})

/**
 * Updates information of the schedule whose ID matches the one in the parameters.
 */
router.put('/:id', (req, res, next) => {
    const id = req.params.id
    const schedule = req.body
    
    if(id && schedule){
        const newSchedule = {
            user: schedule.user,
            time: schedule.time,
            campain: schedule.campain,
            days: schedule.days
        }
        
        Schedule.findByIdAndUpdate(id, newSchedule, {new: true})
            .then(schedule => {
                res.status(200).json(schedule)
            })
            .catch(err => {
                next(err)
            })

    }else{
        res.status(404).end()
    }
})

/**
 * Should return an array of summaries for schedules between the date range given
 */
// /field/#Field1/range/2024-04-15T00:00:00.000Z-none
router.get('/field/:id/range/:from-:to', (req, res) => {

    const fieldId = req.params.id
    const from = req.params.from
    const to = req.params.to

    console.log(req.params)

    if(from && to && fieldId){
        if(to === "none" && from !== "none"){
            res.status(200).json([])
        }else if(to !== "none" && from === "none"){
            res.status(200).json([])
        }else{
            res.status(400)
        }
    }else{
        res.status(400)
    }
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
