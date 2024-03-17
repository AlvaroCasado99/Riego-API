/**
 * Tests de Integración: Enpoints referentes a 'Schedules' con la base de datos
 */

const mongoose = require("mongoose")
const supertest = require("supertest")

const {app, server} = require("../index.js")
const {Schedule} = require("../models/schedule.model")

const api = supertest(app)

// Estado inicial de la colleccion Schedules para cada test
const baseSchedules = [
    {
        user: "Ususario 1",
        time: 7,
        campain: true,
        days: [
          {
            start: "2024-03-08T19:00:00Z",
            periods: [
              {
                sector: "S1",
                hours: 1
              },
              {
                sector: "S2",
                hours: 2
              }
            ]
          },
          {
            start: "2024-04-08T18:00:00Z",
            periods: [
              {
                sector: "S3",
                hours: 3
              },
              {
                sector: "S4",
                hours: 4
              }
            ]
          }
        ]
    },
    {
      user: "Usuario 2",
      time: 7,
      campain: true,
      days: [
        {
          start: "2024-03-08T19:00:00Z",
          periods: [
            {
              sector: "S1",
              hours: 1
            },
            {
              sector: "S2",
              hours: 2
            }
          ]
        },
        {
          start: "2024-04-08T18:00:00Z",
          periods: [
            {
              sector: "S3",
              hours: 3
            },
            {
              sector: "S4",
              hours: 4
            }
          ]
        }
      ]
  }
]

var basicID = ""

// Se ejecuta antes de cada test...
beforeEach( async () => {
    // Limpiar base de datos
    await Schedule.deleteMany({})

    // Establecer el estado inicial de la collección
    const schedule1 = new Schedule(baseSchedules[0])
    const savedSchedule1 = await schedule1.save()
    basicID = savedSchedule1._id

    // Establecer el estado inicial de la collección
    const schedule2 = new Schedule(baseSchedules[1])
    const savedSchedule2 = await schedule2.save()
})



// Se ejecuta al final de TODOS los tests...
afterAll(() => {
    // Cerrar la conexiones a la base de datos y al servidor API.
    mongoose.connection.close()
    server.close()
})