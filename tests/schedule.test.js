/**
 * Tests de Integración: Enpoints referentes a 'Schedules' con la base de datos
 */

import {jest} from '@jest/globals'
jest.useFakeTimers();

import mongoose from "mongoose"
import supertest from "supertest"
import {app, server} from "../index.js"
import Schedule from "../models/schedule.model.js"

const api = supertest(app)

// Estado inicial de la colleccion Schedules para cada test
const baseSchedules = [
    {
        user: "hola",
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

// Se ejecuta antes de cada test...
beforeEach( async () => {
    // Limpiar base de datos
    await Schedule.deleteMany({})

    // Establecer el estado inicial de la collección
    const schedule1 = new Schedule(baseSchedules[0])
    await schedule1.save()
})

test("Schedules are returned as a JSON.", async () => {
    
})

// Se ejecuta al final de TODOS los tests...
afterAll(() => {
    // Cerrar la conexiones a la base de datos y al servidor API.
    mongoose.connection.close()
    server.close()
})