import React, { useEffect, useState } from "react";
import axios from "axios";

function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    specilization: "",
    fees: "",
  });

  // ================= GET DOCTORS =================
  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/doctors"
      );

      if (Array.isArray(res.data)) {
        setDoctors(res.data);
      } else if (res.data.doctors) {
        setDoctors(res.data.doctors);
      }
    } catch (error) {
      console.log("Doctor GET Error:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // ================= INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= ADD DOCTOR =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.specilization ||
      !formData.fees
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/doctors",
        formData
      );

      alert("Doctor added successfully!");

      setFormData({
        name: "",
        specilization: "",
        fees: "",
      });

      setShowForm(false);
      fetchDoctors();

    } catch (error) {
      console.log("Doctor POST Error:", error);
      alert("Doctor could not be added");
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const deleteDoctor = async (id) => {
    if (!window.confirm("Delete this doctor?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/doctors/${id}`
      );

      fetchDoctors();

    } catch (error) {
      console.log("Delete Error:", error);
      alert("Doctor delete failed");
    }
  };

  // ================= SEARCH =================
  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.name} ${doctor.specilization}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="doctor-page">

      {/* ================= TOP HEADER ================= */}

      <div className="doctor-top">

        <div>
          <div className="small-title">
            MEDCARE / DOCTORS
          </div>

          <h1>Our Medical Specialists</h1>

          <p>
            Manage your hospital's doctors and medical specialists
          </p>
        </div>

        <button
          className="add-doctor-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "✕ Close" : "＋ Add Doctor"}
        </button>

      </div>

      {/* ================= QUICK INFO ================= */}

      <div className="doctor-summary">

        <div className="summary-box">
          <div className="summary-icon blue-icon">
            👨‍⚕️
          </div>

          <div>
            <span>Total Doctors</span>
            <strong>{doctors.length}</strong>
          </div>
        </div>

        <div className="summary-box">
          <div className="summary-icon green-icon">
            ✓
          </div>

          <div>
            <span>Available Today</span>
            <strong>{doctors.length}</strong>
          </div>
        </div>

        <div className="summary-box">
          <div className="summary-icon purple-icon">
            🩺
          </div>

          <div>
            <span>Specializations</span>
            <strong>
              {new Set(
                doctors.map((doctor) => doctor.specilization)
              ).size}
            </strong>
          </div>
        </div>

        <div className="summary-box">
          <div className="summary-icon orange-icon">
            ₹
          </div>

          <div>
            <span>Avg. Consultation</span>
            <strong>
              ₹
              {doctors.length
                ? Math.round(
                    doctors.reduce(
                      (total, doctor) =>
                        total + Number(doctor.fees || 0),
                      0
                    ) / doctors.length
                  )
                : 0}
            </strong>
          </div>
        </div>

      </div>

      {/* ================= ADD DOCTOR PANEL ================= */}

      {showForm && (
        <div className="add-panel">

          <div className="panel-left">
            <div className="big-medical-icon">
              🩺
            </div>

            <h2>Add New Doctor</h2>

            <p>
              Add a specialist to your hospital medical team.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Doctor Name</label>

              <input
                type="text"
                name="name"
                placeholder="Dr. John Smith"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Specialization</label>

              <input
                type="text"
                name="specilization"
                placeholder="Cardiologist"
                value={formData.specilization}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Consultation Fee</label>

              <input
                type="number"
                name="fees"
                placeholder="500"
                value={formData.fees}
                onChange={handleChange}
              />
            </div>

            <button
              className="save-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Doctor"}
            </button>

          </form>

        </div>
      )}

      {/* ================= SEARCH AREA ================= */}

      <div className="doctor-tools">

        <div>
          <h2>Medical Team</h2>
          <p>
            {filteredDoctors.length} doctors available
          </p>
        </div>

        <div className="doctor-search">
          🔍

          <input
            type="text"
            placeholder="Search doctor or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      </div>

      {/* ================= DOCTOR CARDS ================= */}

      <div className="doctor-grid">

        {filteredDoctors.length > 0 ? (

          filteredDoctors.map((doctor) => (

            <div
              className="doctor-card"
              key={doctor._id}
            >

              {/* CARD TOP */}

              <div className="card-top">

                <div className="doctor-picture">
                  {doctor.name
                    ? doctor.name.charAt(0).toUpperCase()
                    : "D"}
                </div>

                <span className="available">
                  ● Available
                </span>

              </div>

              {/* DOCTOR NAME */}

              <div className="doctor-details">

                <h2>
                  {doctor.name}
                </h2>

                <div className="speciality">
                  🩺 {doctor.specilization}
                </div>

              </div>

              {/* INFORMATION */}

              <div className="doctor-info">

                <div>
                  <span>Consultation</span>
                  <strong>
                    ₹{doctor.fees}
                  </strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong className="active-text">
                    Active
                  </strong>
                </div>

              </div>

              {/* ACTIONS */}

              <div className="card-actions">

                <button
                  className="profile-btn"
                  onClick={() =>
                    alert(
                      `Doctor: ${doctor.name}\nSpecialization: ${doctor.specilization}\nFees: ₹${doctor.fees}`
                    )
                  }
                >
                  View Profile
                </button>

                <button
                  className="trash-btn"
                  onClick={() =>
                    deleteDoctor(doctor._id)
                  }
                >
                  🗑
                </button>

              </div>

            </div>

          ))

        ) : (

          <div className="no-doctor">

            <div>👨‍⚕️</div>

            <h2>No Doctors Found</h2>

            <p>
              Add a doctor or try another search.
            </p>

          </div>

        )}

      </div>

      {/* ================= CSS ================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .doctor-page {
          min-height: 100vh;
          padding: 32px;
          background: #f7f9fc;
          font-family: Arial, sans-serif;
          color: #172033;
        }

        /* TOP */

        .doctor-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
        }

        .small-title {
          color: #2563eb;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          margin-bottom: 8px;
        }

        .doctor-top h1 {
          margin: 0;
          font-size: 32px;
        }

        .doctor-top p {
          margin-top: 8px;
          color: #718096;
        }

        .add-doctor-btn {
          border: none;
          background: #2563eb;
          color: white;
          padding: 14px 22px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(37,99,235,0.2);
        }

        .add-doctor-btn:hover {
          background: #1d4ed8;
        }

        /* SUMMARY */

        .doctor-summary {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 28px;
        }

        .summary-box {
          background: white;
          border-radius: 16px;
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          border: 1px solid #edf0f5;
        }

        .summary-icon {
          width: 48px;
          height: 48px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: bold;
        }

        .blue-icon {
          background: #e0ecff;
          color: #2563eb;
        }

        .green-icon {
          background: #dcfce7;
          color: #16a34a;
        }

        .purple-icon {
          background: #f0e7ff;
          color: #7c3aed;
        }

        .orange-icon {
          background: #fff0d9;
          color: #ea580c;
        }

        .summary-box span {
          display: block;
          color: #7b8798;
          font-size: 12px;
          margin-bottom: 4px;
        }

        .summary-box strong {
          font-size: 22px;
        }

        /* ADD PANEL */

        .add-panel {
          background: white;
          border-radius: 18px;
          padding: 25px;
          margin-bottom: 28px;
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 35px;
          border: 1px solid #e8edf5;
          box-shadow: 0 8px 25px rgba(0,0,0,0.04);
        }

        .panel-left {
          border-right: 1px solid #edf0f5;
          padding-right: 25px;
        }

        .big-medical-icon {
          width: 65px;
          height: 65px;
          border-radius: 18px;
          background: #e0ecff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          margin-bottom: 15px;
        }

        .panel-left h2 {
          margin: 0;
        }

        .panel-left p {
          color: #7b8798;
          font-size: 13px;
          line-height: 1.5;
        }

        .add-panel form {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          align-items: end;
        }

        .input-group label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 7px;
        }

        .input-group input {
          width: 100%;
          padding: 12px;
          border: 1px solid #dfe5ed;
          border-radius: 9px;
          outline: none;
        }

        .input-group input:focus {
          border-color: #2563eb;
        }

        .save-btn {
          height: 44px;
          border: none;
          border-radius: 9px;
          background: #16a34a;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        /* TOOLS */

        .doctor-tools {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .doctor-tools h2 {
          margin: 0;
          font-size: 22px;
        }

        .doctor-tools p {
          margin: 5px 0 0;
          color: #7b8798;
          font-size: 13px;
        }

        .doctor-search {
          width: 310px;
          height: 44px;
          background: white;
          border: 1px solid #e1e6ee;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 12px;
        }

        .doctor-search input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
        }

        /* DOCTOR GRID */

        .doctor-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .doctor-card {
          background: white;
          border-radius: 18px;
          padding: 22px;
          border: 1px solid #e7ebf2;
          transition: 0.25s;
        }

        .doctor-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.08);
          border-color: #cddcff;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .doctor-picture {
          width: 62px;
          height: 62px;
          border-radius: 18px;
          background: linear-gradient(
            135deg,
            #dbeafe,
            #eff6ff
          );
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;
          font-weight: 700;
        }

        .available {
          color: #16a34a;
          background: #ecfdf5;
          padding: 6px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }

        .doctor-details {
          margin-top: 18px;
        }

        .doctor-details h2 {
          margin: 0 0 9px;
          font-size: 19px;
        }

        .speciality {
          display: inline-block;
          background: #f1f5f9;
          color: #475569;
          padding: 7px 11px;
          border-radius: 8px;
          font-size: 12px;
        }

        /* INFO */

        .doctor-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-top: 22px;
          padding: 15px 0;
          border-top: 1px solid #edf0f5;
          border-bottom: 1px solid #edf0f5;
        }

        .doctor-info span {
          display: block;
          color: #94a3b8;
          font-size: 11px;
          margin-bottom: 5px;
        }

        .doctor-info strong {
          font-size: 15px;
        }

        .active-text {
          color: #16a34a;
        }

        /* ACTION */

        .card-actions {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .profile-btn {
          flex: 1;
          padding: 10px;
          border: 1px solid #dbe3ef;
          background: white;
          border-radius: 9px;
          cursor: pointer;
          font-weight: 600;
          color: #334155;
        }

        .profile-btn:hover {
          background: #f8fafc;
        }

        .trash-btn {
          width: 42px;
          border: none;
          border-radius: 9px;
          background: #fff1f2;
          color: #dc2626;
          cursor: pointer;
        }

        .trash-btn:hover {
          background: #fee2e2;
        }

        /* EMPTY */

        .no-doctor {
          grid-column: 1 / -1;
          text-align: center;
          padding: 70px 20px;
          background: white;
          border-radius: 18px;
          border: 1px solid #e7ebf2;
        }

        .no-doctor div {
          font-size: 55px;
        }

        .no-doctor h2 {
          margin-bottom: 5px;
        }

        .no-doctor p {
          color: #7b8798;
        }

        /* RESPONSIVE */

        @media (max-width: 1100px) {

          .doctor-summary {
            grid-template-columns: repeat(2, 1fr);
          }

          .doctor-grid {
            grid-template-columns: repeat(2, 1fr);
          }

        }

        @media (max-width: 750px) {

          .doctor-page {
            padding: 18px;
          }

          .doctor-top {
            flex-direction: column;
            align-items: flex-start;
            gap: 18px;
          }

          .doctor-summary {
            grid-template-columns: 1fr;
          }

          .add-panel {
            grid-template-columns: 1fr;
          }

          .panel-left {
            border-right: none;
            border-bottom: 1px solid #edf0f5;
            padding-bottom: 15px;
          }

          .add-panel form {
            grid-template-columns: 1fr;
          }

          .doctor-tools {
            flex-direction: column;
            align-items: stretch;
            gap: 15px;
          }

          .doctor-search {
            width: 100%;
          }

          .doctor-grid {
            grid-template-columns: 1fr;
          }

        }

      `}</style>

    </div>
  );
}

export default Doctor;