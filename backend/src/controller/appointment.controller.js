// import Appointment from "../models/Appointment.js";
import appointmentModel from "../model/appointment.model.js";
import asyncHandler from "../uitls/asyncHandler.js";

export const bookAppointment = asyncHandler(async (req, res) => {
  const { doctorId, patientId, date, time } = req.body;

  const appointment = new appointmentModel({ doctorId, patientId, date, time });
  await appointment.save();

  res.status(201).json({ message: "Appointment booked", appointment });
});

export const cancelAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await appointmentModel.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ message: "Appointment not found" });
  }
  res.status(200).json({ message: "Appointment cancelled" });
});

export const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await appointmentModel.find()
    .populate("doctorId", "username role")
    .populate("patientId", "username role");
  res.status(200).json(appointments);
});
