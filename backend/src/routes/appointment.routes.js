import express from 'express';
// import {
//   bookAppointment,
//   cancelAppointment,
//   getAppointments
// } from '../controllers/appointmentController.js';
import {bookAppointment,cancelAppointment,getAppointments} from "../controller/appointment.controller.js"

const router = express.Router();

router.post('/appointments', bookAppointment);
router.delete('/appointments/:id', cancelAppointment);
router.get('/appointments', getAppointments);

export default router;
