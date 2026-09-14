import React, { useState } from "react";
import {
  FaFlask,
  FaSearch,
  FaPlus,
  FaTrash,
  FaEdit,
  FaCheckCircle,
  FaClock,
  FaUserInjured,
  FaVial,
} from "react-icons/fa";

function Laboratory() {
  const [tests, setTests] = useState([
    {
      id: 1,
      patient: "Rahul Kumar",
      test: "Complete Blood Count",
      doctor: "Dr. Sharma",
      date: "11 Sep 2026",
      status: "Completed",
      result: "Normal",
    },
    {
      id: 2,
      patient: "Mahak",
      test: "Blood Sugar",
      doctor: "Dr. Verma",
      date: "11 Sep 2026",
      status: "Pending",
      result: "-",
    },
    {
      id: 3,
      patient: "Rupali",
      test: "Liver Function Test",
      doctor: "Dr. Gupta",
      date: "10 Sep 2026",
      status: "Completed",
      result: "Normal",
    },
    {
      id: 4,
      patient: "Raman",
      test: "Urine Test",
      doctor: "Dr. Singh",
      date: "10 Sep 2026",
      status: "Pending",
      result: "-",
    },
    {
      id: 5,
      patient: "Anjali",
      test: "Thyroid Profile",
      doctor: "Dr. Mehta",
      date: "09 Sep 2026",
      status: "Completed",
      result: "Normal",
    },
  ]);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    patient: "",
    test: "",
    doctor: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addTest = (e) => {
    e.preventDefault();

    if (
      !formData.patient ||
      !formData.test ||
      !formData.doctor ||
      !formData.date
    ) {
      alert("Please fill all fields");
      return;
    }

    const newTest = {
      id: Date.now(),
      patient: formData.patient,
      test: formData.test,
      doctor: formData.doctor,
      date: formData.date,
      status: "Pending",
      result: "-",
    };

    setTests([newTest, ...tests]);

    setFormData({
      patient: "",
      test: "",
      doctor: "",
      date: "",
    });

    setShowForm(false);
  };

  const deleteTest = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this test?"
    );

    if (confirmDelete) {
      setTests(tests.filter((item) => item.id !== id));
    }
  };

  const filteredTests = tests.filter(
    (item) =>
      item.patient.toLowerCase().includes(search.toLowerCase()) ||
      item.test.toLowerCase().includes(search.toLowerCase()) ||
      item.doctor.toLowerCase().includes(search.toLowerCase())
  );

  const totalTests = tests.length;

  const completedTests = tests.filter(
    (item) => item.status === "Completed"
  ).length;

  const pendingTests = tests.filter(
    (item) => item.status === "Pending"
  ).length;

  return (
    <div className="laboratory-page">

      {/* HEADER */}

      <div className="lab-header">
        <div>
          <h2>
            <FaFlask /> Laboratory
          </h2>

          <p>
            Manage laboratory tests, reports and patient results
          </p>
        </div>

        <button
          className="add-test-btn"
          onClick={() => setShowForm(true)}
        >
          <FaPlus /> Add Laboratory Test
        </button>
      </div>

      {/* STAT CARDS */}

      <div className="lab-stats">

        <div className="lab-stat-card">
          <div className="stat-icon blue">
            <FaVial />
          </div>

          <div>
            <h3>{totalTests}</h3>
            <p>Total Tests</p>
          </div>
        </div>

        <div className="lab-stat-card">
          <div className="stat-icon green">
            <FaCheckCircle />
          </div>

          <div>
            <h3>{completedTests}</h3>
            <p>Completed Tests</p>
          </div>
        </div>

        <div className="lab-stat-card">
          <div className="stat-icon orange">
            <FaClock />
          </div>

          <div>
            <h3>{pendingTests}</h3>
            <p>Pending Tests</p>
          </div>
        </div>

        <div className="lab-stat-card">
          <div className="stat-icon purple">
            <FaUserInjured />
          </div>

          <div>
            <h3>{new Set(tests.map((item) => item.patient)).size}</h3>
            <p>Patients</p>
          </div>
        </div>

      </div>

      {/* SEARCH */}

      <div className="lab-content">

        <div className="table-header">

          <div>
            <h3>Laboratory Test Records</h3>
            <p>Complete list of laboratory tests</p>
          </div>

          <div className="search-box">
            <FaSearch />

            <input
              type="text"
              placeholder="Search patient, test or doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

        </div>

        {/* TABLE */}

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Patient</th>
                <th>Laboratory Test</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Status</th>
                <th>Result</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredTests.length > 0 ? (
                filteredTests.map((item) => (

                  <tr key={item.id}>

                    <td>
                      <div className="patient-name">
                        <div className="patient-icon">
                          <FaUserInjured />
                        </div>

                        <strong>{item.patient}</strong>
                      </div>
                    </td>

                    <td>
                      <div className="test-name">
                        <FaFlask />
                        {item.test}
                      </div>
                    </td>

                    <td>{item.doctor}</td>

                    <td>{item.date}</td>

                    <td>

                      {item.status === "Completed" ? (
                        <span className="status completed">
                          <FaCheckCircle />
                          Completed
                        </span>
                      ) : (
                        <span className="status pending">
                          <FaClock />
                          Pending
                        </span>
                      )}

                    </td>

                    <td>
                      <strong>{item.result}</strong>
                    </td>

                    <td>

                      <div className="action-buttons">

                        <button className="edit-btn">
                          <FaEdit />
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => deleteTest(item.id)}
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))
              ) : (

                <tr>
                  <td colSpan="7">

                    <div className="no-data">
                      <FaFlask />
                      <h3>No Laboratory Tests Found</h3>
                      <p>
                        Try another search or add a new laboratory test.
                      </p>
                    </div>

                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ADD TEST FORM */}

      {showForm && (

        <div className="modal-overlay">

          <div className="lab-modal">

            <div className="modal-header">

              <div>
                <h3>
                  <FaFlask /> Add Laboratory Test
                </h3>

                <p>Enter patient laboratory test details</p>
              </div>

              <button
                className="close-btn"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={addTest}>

              <div className="form-group">
                <label>Patient Name</label>

                <input
                  type="text"
                  name="patient"
                  placeholder="Enter patient name"
                  value={formData.patient}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Laboratory Test</label>

                <select
                  name="test"
                  value={formData.test}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Laboratory Test
                  </option>

                  <option value="Complete Blood Count">
                    Complete Blood Count
                  </option>

                  <option value="Blood Sugar">
                    Blood Sugar
                  </option>

                  <option value="Liver Function Test">
                    Liver Function Test
                  </option>

                  <option value="Kidney Function Test">
                    Kidney Function Test
                  </option>

                  <option value="Urine Test">
                    Urine Test
                  </option>

                  <option value="Thyroid Profile">
                    Thyroid Profile
                  </option>

                  <option value="Lipid Profile">
                    Lipid Profile
                  </option>

                  <option value="X-Ray">
                    X-Ray
                  </option>

                </select>

              </div>

              <div className="form-group">

                <label>Doctor Name</label>

                <input
                  type="text"
                  name="doctor"
                  placeholder="Enter doctor name"
                  value={formData.doctor}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>Test Date</label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />

              </div>

              <div className="modal-buttons">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  <FaPlus /> Add Test
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* CSS */}

      <style>{`

        .laboratory-page {
          min-height: 100vh;
          background: #f5f7fb;
          padding: 25px;
          font-family: Arial, sans-serif;
        }

        .lab-header {
          background: white;
          border-radius: 15px;
          padding: 22px 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 3px 15px rgba(0,0,0,0.06);
          margin-bottom: 22px;
        }

        .lab-header h2 {
          margin: 0;
          color: #172033;
          font-size: 26px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .lab-header h2 svg {
          color: #1769e0;
        }

        .lab-header p {
          margin: 7px 0 0;
          color: #777;
          font-size: 14px;
        }

        .add-test-btn {
          background: #1769e0;
          color: white;
          border: none;
          padding: 12px 18px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .add-test-btn:hover {
          background: #0d56c4;
        }

        .lab-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 22px;
        }

        .lab-stat-card {
          background: white;
          padding: 20px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 3px 15px rgba(0,0,0,0.05);
        }

        .stat-icon {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
        }

        .blue {
          background: #eaf2ff;
          color: #1769e0;
        }

        .green {
          background: #e8f8ef;
          color: #168447;
        }

        .orange {
          background: #fff3df;
          color: #e89400;
        }

        .purple {
          background: #f0eaff;
          color: #7047d9;
        }

        .lab-stat-card h3 {
          margin: 0;
          color: #172033;
          font-size: 25px;
        }

        .lab-stat-card p {
          margin: 4px 0 0;
          color: #777;
          font-size: 13px;
        }

        .lab-content {
          background: white;
          border-radius: 15px;
          padding: 22px;
          box-shadow: 0 3px 15px rgba(0,0,0,0.05);
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .table-header h3 {
          margin: 0;
          color: #172033;
          font-size: 20px;
        }

        .table-header p {
          margin: 5px 0 0;
          color: #777;
          font-size: 13px;
        }

        .search-box {
          width: 320px;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 10px 13px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .search-box svg {
          color: #888;
        }

        .search-box input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 13px;
        }

        .table-container {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: #f5f7fb;
        }

        th {
          padding: 14px;
          text-align: left;
          font-size: 12px;
          color: #666;
          white-space: nowrap;
        }

        td {
          padding: 15px 14px;
          border-bottom: 1px solid #eee;
          font-size: 13px;
          color: #444;
        }

        .patient-name {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .patient-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #eaf2ff;
          color: #1769e0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .test-name {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: #333;
        }

        .test-name svg {
          color: #1769e0;
        }

        .status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }

        .completed {
          background: #e8f8ef;
          color: #168447;
        }

        .pending {
          background: #fff3df;
          color: #e89400;
        }

        .action-buttons {
          display: flex;
          gap: 7px;
        }

        .edit-btn,
        .delete-btn {
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 7px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .edit-btn {
          background: #eaf2ff;
          color: #1769e0;
        }

        .delete-btn {
          background: #ffe9e9;
          color: #e33434;
        }

        .no-data {
          text-align: center;
          padding: 50px;
          color: #888;
        }

        .no-data svg {
          font-size: 45px;
          color: #bbb;
        }

        .no-data h3 {
          color: #555;
          margin: 12px 0 5px;
        }

        .no-data p {
          margin: 0;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }

        .lab-modal {
          background: white;
          width: 500px;
          max-width: 100%;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 15px 50px rgba(0,0,0,0.2);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .modal-header h3 {
          margin: 0;
          color: #172033;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .modal-header h3 svg {
          color: #1769e0;
        }

        .modal-header p {
          margin: 5px 0 0;
          color: #888;
          font-size: 13px;
        }

        .close-btn {
          border: none;
          background: #f2f2f2;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-size: 22px;
          cursor: pointer;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 7px;
          font-size: 13px;
          font-weight: 600;
          color: #444;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 11px 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          outline: none;
          font-size: 13px;
          background: white;
        }

        .form-group input:focus,
        .form-group select:focus {
          border-color: #1769e0;
        }

        .modal-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }

        .cancel-btn,
        .save-btn {
          border: none;
          padding: 11px 17px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }

        .cancel-btn {
          background: #eee;
          color: #555;
        }

        .save-btn {
          background: #1769e0;
          color: white;
        }

        @media (max-width: 1000px) {
          .lab-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 700px) {
          .lab-header,
          .table-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .search-box {
            width: 100%;
          }

          .lab-stats {
            grid-template-columns: 1fr;
          }
        }

      `}</style>

    </div>
  );
}

export default Laboratory;