import React, { useState, useEffect } from "react";
import API from "../api/axios";

const Book = () => {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    API.get("/users/users?role=doctor").then((res) => setDoctors(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) throw new Error("Not authenticated");
      const payload = JSON.parse(atob(token.split(".")[1]));

      const patientId = payload._id;

      await API.post("/appointments/appointments", { ...formData, patientId });
      alert("Appointment booked");
      setFormData({ doctorId: "", date: "", time: "" }); // reset form
    } catch {
      alert("Failed to book appointment");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Book Appointment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          required
          value={formData.doctorId}
          onChange={(e) =>
            setFormData({ ...formData, doctorId: e.target.value })
          }
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>
            Select Doctor
          </option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.username}
            </option>
          ))}
        </select>

        <input
          type="date"
          required
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="time"
          required
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default Book;
