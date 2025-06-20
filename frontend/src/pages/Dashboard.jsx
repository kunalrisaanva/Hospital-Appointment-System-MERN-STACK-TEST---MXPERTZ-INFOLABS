import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const Dashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const doctorRes = await API.get('/users/users?role=doctor');
      const patientRes = await API.get('/users/users?role=patient');
      setDoctors(doctorRes.data);
      setPatients(patientRes.data);
    } catch {
      alert('Error fetching users');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Doctors Section */}
        <section>
          <h3 className="text-2xl font-semibold mb-4 text-blue-600">Doctors</h3>
          {doctors.length === 0 ? (
            <p className="text-gray-500">No doctors found.</p>
          ) : (
            <ul className="space-y-2">
              {doctors.map((doc) => (
                <li
                  key={doc._id}
                  className="p-3 border rounded-md shadow-sm hover:shadow-md transition"
                >
                  {doc.username}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Patients Section */}
        <section>
          <h3 className="text-2xl font-semibold mb-4 text-green-600">Patients</h3>
          {patients.length === 0 ? (
            <p className="text-gray-500">No patients found.</p>
          ) : (
            <ul className="space-y-2">
              {patients.map((pat) => (
                <li
                  key={pat._id}
                  className="p-3 border rounded-md shadow-sm hover:shadow-md transition"
                >
                  {pat.username}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
