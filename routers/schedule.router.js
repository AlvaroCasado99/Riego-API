const express = require('express')
const {Schedule} = require('../models/schedule.model.js')
const {notFound} = require('../middlewares/notFound.middleware.js')

console.log('Imports')

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
 * Should return schedule id, total hours, numbre of days and start date 
 */
router.get('/summary/:id', (req, res, next) => {
    const id = req.params.id
    if(id){
        Schedule.findById(id)
            .then(schedule => {
                const summary = {
                    id: schedule._id,
                    user: "Work in progress",
                    time: "Work in progress",
                    campain: "Work in progress",
                }
                res.status(200).json(summary)
            })
            .catch(err => {
                res.status(500).json({error: err.name})
            })

    }else{
        res.status(400).json({msg: "Schedule not provided"})
    }
})

/**
 * Should return an array of summaries for schedules between the date range given
 */
router.get('/summary/:from-:to', (req, res) => {
    const from = req.params.from
    const to = req.params.to
    if(from && to){
        res.status(404).json({msg: "This endpoint is under construction"})
    }else{
        res.status(400).json({msg: "Schedule not provided"})
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
