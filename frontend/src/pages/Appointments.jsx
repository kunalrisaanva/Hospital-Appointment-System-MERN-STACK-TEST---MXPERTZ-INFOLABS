import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await API.get('/appointments/appointments');
      setAppointments(res.data);
    } catch {
      alert('Error fetching appointments');
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await API.delete(`/appointments/appointments/${id}`);
      alert('Appointment cancelled');
      fetchAppointments();
    } catch {
      alert('Failed to cancel appointment');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Your Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments found.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((app) => (
            <li
              key={app._id}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-md shadow-sm hover:shadow-md transition"
            >
              <div className="space-y-1 text-gray-700">
                <p><strong>Doctor:</strong> {app.doctorId.username}</p>
                <p><strong>Patient:</strong> {app.patientId.username}</p>
                <p><strong>Date:</strong> {app.date}</p>
                <p><strong>Time:</strong> {app.time}</p>
              </div>
              <button
                onClick={() => cancelAppointment(app._id)}
                className="mt-3 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Appointments;
