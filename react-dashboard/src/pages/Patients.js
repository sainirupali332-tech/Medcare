import React, { useEffect, useState } from "react";
import axios from "axios";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    disease: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  // GET PATIENTS
  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/patients");

      if (Array.isArray(res.data)) {
        setPatients(res.data);
      } else if (res.data.patients) {
        setPatients(res.data.patients);
      }
    } catch (error) {
      console.log("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD PATIENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.disease || !formData.phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/patients",
        formData
      );

      alert("Patient added successfully!");

      setFormData({
        name: "",
        disease: "",
        phone: "",
      });

      fetchPatients();
    } catch (error) {
      console.log("Error adding patient:", error);
      alert("Patient could not be added");
    } finally {
      setLoading(false);
    }
  };

  // DELETE PATIENT
  const deletePatient = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/patients/${id}`
      );

      fetchPatients();
    } catch (error) {
      console.log("Delete error:", error);
      alert("Patient delete failed");
    }
  };

  // SEARCH
  const filteredPatients = patients.filter((patient) =>
    `${patient.name} ${patient.disease} ${patient.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="patients-page">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>Patient Management</h1>
          <p>Manage hospital patients and their medical information</p>
        </div>

        <div className="header-icon">
          🏥
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="stats-grid">

        <div className="stat-card blue">
          <div className="stat-icon">👨‍⚕️</div>
          <div>
            <p>Total Patients</p>
            <h2>{patients.length}</h2>
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-icon">🟢</div>
          <div>
            <p>Active Patients</p>
            <h2>{patients.length}</h2>
          </div>
        </div>

        <div className="stat-card purple">
          <div className="stat-icon">🏥</div>
          <div>
            <p>Medical Records</p>
            <h2>{patients.length}</h2>
          </div>
        </div>

        <div className="stat-card orange">
          <div className="stat-icon">📋</div>
          <div>
            <p>Showing Records</p>
            <h2>{filteredPatients.length}</h2>
          </div>
        </div>

      </div>

      {/* ADD PATIENT */}
      <div className="main-grid">

        <div className="add-patient-card">

          <div className="card-heading">
            <div>
              <h2>➕ Add New Patient</h2>
              <p>Enter patient information</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <label>Patient Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter patient name"
              value={formData.name}
              onChange={handleChange}
            />

            <label>Medical Condition</label>
            <input
              type="text"
              name="disease"
              placeholder="e.g. Fever, Diabetes"
              value={formData.disease}
              onChange={handleChange}
            />

            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Adding..." : "➕ Add Patient"}
            </button>

          </form>
        </div>

        {/* PATIENT LIST */}
        <div className="patient-list-card">

          <div className="list-header">

            <div>
              <h2>Patient Records</h2>
              <p>Complete list of registered patients</p>
            </div>

            <div className="search-box">
              🔍
              <input
                type="text"
                placeholder="Search patient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

          </div>

          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Medical Condition</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (

                    <tr key={patient._id}>

                      <td>
                        <div className="patient-info">

                          <div className="patient-avatar">
                            {patient.name
                              ? patient.name.charAt(0).toUpperCase()
                              : "P"}
                          </div>

                          <div>
                            <strong>{patient.name}</strong>
                            <small>
                              ID: {patient._id?.slice(-6)}
                            </small>
                          </div>

                        </div>
                      </td>

                      <td>
                        <span className="disease">
                          {patient.disease}
                        </span>
                      </td>

                      <td>
                        📞 {patient.phone}
                      </td>

                      <td>
                        <span className="status">
                          ● Active
                        </span>
                      </td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            deletePatient(patient._id)
                          }
                        >
                          🗑️
                        </button>
                      </td>

                    </tr>

                  ))
                ) : (

                  <tr>
                    <td colSpan="5">
                      <div className="empty-state">
                        <div>🧑‍⚕️</div>
                        <h3>No Patients Found</h3>
                        <p>Add a patient to see records here.</p>
                      </div>
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* CSS */}
      <style>{`

        * {
          box-sizing: border-box;
        }

        .patients-page {
          min-height: 100vh;
          padding: 30px;
          background: #f5f7fb;
          font-family: Arial, sans-serif;
          color: #1e293b;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .page-header h1 {
          margin: 0;
          font-size: 30px;
          font-weight: 700;
        }

        .page-header p {
          margin-top: 7px;
          color: #64748b;
        }

        .header-icon {
          width: 55px;
          height: 55px;
          background: white;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 27px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.06);
        }

        /* STATS */

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 25px;
        }

        .stat-card {
          padding: 22px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          gap: 17px;
          background: white;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
        }

        .stat-icon {
          width: 55px;
          height: 55px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;
        }

        .stat-card p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
        }

        .stat-card h2 {
          margin: 5px 0 0;
          font-size: 27px;
        }

        .blue .stat-icon {
          background: #dbeafe;
        }

        .green .stat-icon {
          background: #dcfce7;
        }

        .purple .stat-icon {
          background: #f3e8ff;
        }

        .orange .stat-icon {
          background: #ffedd5;
        }

        /* MAIN */

        .main-grid {
          display: grid;
          grid-template-columns: 330px 1fr;
          gap: 25px;
        }

        .add-patient-card,
        .patient-list-card {
          background: white;
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 5px 25px rgba(0,0,0,0.05);
        }

        .card-heading h2,
        .list-header h2 {
          margin: 0;
          font-size: 20px;
        }

        .card-heading p,
        .list-header p {
          margin-top: 6px;
          color: #64748b;
          font-size: 13px;
        }

        form {
          margin-top: 22px;
        }

        label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          margin: 16px 0 7px;
        }

        input {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          outline: none;
          font-size: 14px;
          transition: 0.2s;
        }

        input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
        }

        form button {
          width: 100%;
          margin-top: 22px;
          padding: 13px;
          border: none;
          border-radius: 10px;
          background: #2563eb;
          color: white;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
        }

        form button:hover {
          background: #1d4ed8;
        }

        /* LIST */

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .search-box {
          width: 240px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 12px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #f8fafc;
        }

        .search-box input {
          border: none;
          background: transparent;
          box-shadow: none;
        }

        .table-container {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          text-align: left;
          padding: 14px;
          background: #f8fafc;
          color: #64748b;
          font-size: 12px;
          text-transform: uppercase;
        }

        td {
          padding: 16px 14px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 14px;
        }

        .patient-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .patient-avatar {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #dbeafe;
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 17px;
        }

        .patient-info strong {
          display: block;
        }

        .patient-info small {
          display: block;
          color: #94a3b8;
          margin-top: 3px;
        }

        .disease {
          background: #f1f5f9;
          padding: 6px 10px;
          border-radius: 8px;
          font-size: 12px;
        }

        .status {
          color: #16a34a;
          background: #dcfce7;
          padding: 6px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .delete-btn {
          border: none;
          background: #fee2e2;
          color: #dc2626;
          width: 36px;
          height: 36px;
          border-radius: 9px;
          cursor: pointer;
        }

        .delete-btn:hover {
          background: #fecaca;
        }

        .empty-state {
          text-align: center;
          padding: 50px 20px;
          color: #64748b;
        }

        .empty-state div {
          font-size: 45px;
        }

        .empty-state h3 {
          color: #334155;
          margin-bottom: 5px;
        }

        /* RESPONSIVE */

        @media (max-width: 1000px) {

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .main-grid {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 600px) {

          .patients-page {
            padding: 15px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .list-header {
            flex-direction: column;
            align-items: stretch;
            gap: 15px;
          }

          .search-box {
            width: 100%;
          }

        }

      `}</style>

    </div>
  );
}

export default Patients;