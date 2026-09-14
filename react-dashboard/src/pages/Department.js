import React, { useState } from "react";
import {
  FaHeartbeat,
  FaBrain,
  FaBone,
  FaBaby,
  FaEye,
  FaTooth,
  FaLungs,
  FaStethoscope,
  FaUserMd,
  FaUserInjured,
  FaBed,
  FaClock,
  FaPhone,
  FaArrowRight,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

function Department() {
  /* =====================================================
     DEPARTMENT DATA
     YAHAN BAAD MEIN AAP AUR DEPARTMENT ADD KAR SAKTI HO
     ===================================================== */

  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "General Medicine",
      icon: <FaStethoscope />,
      emoji: "🩺",
      color: "#1677ff",
      bg: "#eaf2ff",
      doctors: 6,
      patients: 32,
      beds: 20,
      availableBeds: 8,
      timing: "24 Hours",
      phone: "0184-2450001",
      description:
        "Complete diagnosis and general healthcare services.",
      services: [
        "General Checkup",
        "Fever Treatment",
        "Health Consultation",
      ],
    },

    {
      id: 2,
      name: "Cardiology",
      icon: <FaHeartbeat />,
      emoji: "❤️",
      color: "#e74c3c",
      bg: "#fff0ee",
      doctors: 4,
      patients: 18,
      beds: 15,
      availableBeds: 5,
      timing: "24 Hours",
      phone: "0184-2450002",
      description:
        "Specialized treatment for heart and cardiovascular conditions.",
      services: [
        "ECG",
        "Heart Checkup",
        "Cardiac Consultation",
      ],
    },

    {
      id: 3,
      name: "Neurology",
      icon: <FaBrain />,
      emoji: "🧠",
      color: "#8e44ad",
      bg: "#f5eafa",
      doctors: 3,
      patients: 12,
      beds: 10,
      availableBeds: 4,
      timing: "8 AM - 8 PM",
      phone: "0184-2450003",
      description:
        "Diagnosis and treatment of brain and nervous system disorders.",
      services: [
        "Brain Checkup",
        "Nerve Treatment",
        "Neurological Consultation",
      ],
    },

    {
      id: 4,
      name: "Orthopedics",
      icon: <FaBone />,
      emoji: "🦴",
      color: "#f39c12",
      bg: "#fff5e5",
      doctors: 4,
      patients: 20,
      beds: 18,
      availableBeds: 7,
      timing: "9 AM - 7 PM",
      phone: "0184-2450004",
      description:
        "Treatment of bones, joints, muscles and injuries.",
      services: [
        "Fracture Treatment",
        "Joint Checkup",
        "Physiotherapy",
      ],
    },

    {
      id: 5,
      name: "Pediatrics",
      icon: <FaBaby />,
      emoji: "👶",
      color: "#16a085",
      bg: "#e8f8f5",
      doctors: 5,
      patients: 25,
      beds: 20,
      availableBeds: 6,
      timing: "24 Hours",
      phone: "0184-2450005",
      description:
        "Healthcare services specially designed for children.",
      services: [
        "Child Checkup",
        "Vaccination",
        "Child Emergency",
      ],
    },

    {
      id: 6,
      name: "Ophthalmology",
      icon: <FaEye />,
      emoji: "👁️",
      color: "#2980b9",
      bg: "#eaf4fb",
      doctors: 3,
      patients: 15,
      beds: 8,
      availableBeds: 3,
      timing: "9 AM - 6 PM",
      phone: "0184-2450006",
      description:
        "Complete eye examination and vision care services.",
      services: [
        "Eye Checkup",
        "Vision Test",
        "Eye Surgery",
      ],
    },

    {
      id: 7,
      name: "Dentistry",
      icon: <FaTooth />,
      emoji: "🦷",
      color: "#27ae60",
      bg: "#eaf8ef",
      doctors: 2,
      patients: 10,
      beds: 6,
      availableBeds: 2,
      timing: "9 AM - 5 PM",
      phone: "0184-2450007",
      description:
        "Dental checkups, treatment and oral healthcare.",
      services: [
        "Dental Checkup",
        "Teeth Cleaning",
        "Dental Surgery",
      ],
    },

    {
      id: 8,
      name: "Pulmonology",
      icon: <FaLungs />,
      emoji: "🫁",
      color: "#d35400",
      bg: "#fff0e6",
      doctors: 3,
      patients: 14,
      beds: 12,
      availableBeds: 4,
      timing: "24 Hours",
      phone: "0184-2450008",
      description:
        "Diagnosis and treatment of lungs and respiratory diseases.",
      services: [
        "Lung Checkup",
        "Asthma Treatment",
        "Respiratory Care",
      ],
    },
  ]);

  /* =====================================================
     STATE
     ===================================================== */

  const [selectedDepartment, setSelectedDepartment] =
    useState(null);

  const [search, setSearch] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);

  const [newDepartment, setNewDepartment] = useState({
    name: "",
    doctors: "",
    patients: "",
    beds: "",
    timing: "",
    phone: "",
    description: "",
  });

  /* =====================================================
     SEARCH
     ===================================================== */

  const filteredDepartments = departments.filter((department) =>
    department.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* =====================================================
     TOTAL DATA
     ===================================================== */

  const totalDoctors = departments.reduce(
    (total, department) =>
      total + Number(department.doctors),
    0
  );

  const totalPatients = departments.reduce(
    (total, department) =>
      total + Number(department.patients),
    0
  );

  const totalBeds = departments.reduce(
    (total, department) =>
      total + Number(department.beds),
    0
  );

  /* =====================================================
     ADD NEW DEPARTMENT
     ===================================================== */

  const addDepartment = (e) => {
    e.preventDefault();

    if (!newDepartment.name.trim()) {
      alert("Please enter department name");
      return;
    }

    const newData = {
      id: Date.now(),
      name: newDepartment.name,
      icon: <FaStethoscope />,
      emoji: "🏥",
      color: "#1677ff",
      bg: "#eaf2ff",
      doctors: Number(newDepartment.doctors) || 0,
      patients: Number(newDepartment.patients) || 0,
      beds: Number(newDepartment.beds) || 0,
      availableBeds: Number(newDepartment.beds) || 0,
      timing: newDepartment.timing || "24 Hours",
      phone: newDepartment.phone || "Not Available",
      description:
        newDepartment.description ||
        "Hospital medical department.",
      services: [
        "General Consultation",
        "Medical Checkup",
      ],
    };

    setDepartments([...departments, newData]);

    setNewDepartment({
      name: "",
      doctors: "",
      patients: "",
      beds: "",
      timing: "",
      phone: "",
      description: "",
    });

    setShowAddForm(false);
  };

  return (
    <div className="department-page">

      {/* =================================================
          HEADER
          ================================================= */}

      <div className="page-header">

        <div>
          <h1>
            🏥 Hospital Departments
          </h1>

          <p>
            Manage hospital departments, doctors, patients,
            beds and medical services
          </p>
        </div>

        <button
          className="add-btn"
          onClick={() => setShowAddForm(true)}
        >
          <FaPlus />
          Add Department
        </button>

      </div>

      {/* =================================================
          SUMMARY
          ================================================= */}

      <div className="summary-grid">

        <div className="summary-card">
          <div className="summary-icon blue">
            🏥
          </div>

          <div>
            <span>Departments</span>
            <h2>{departments.length}</h2>
            <small>Active departments</small>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon green">
            👨‍⚕️
          </div>

          <div>
            <span>Doctors</span>
            <h2>{totalDoctors}</h2>
            <small>Medical professionals</small>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon orange">
            🧑‍🤝‍🧑
          </div>

          <div>
            <span>Patients</span>
            <h2>{totalPatients}</h2>
            <small>Department patients</small>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon purple">
            🛏️
          </div>

          <div>
            <span>Total Beds</span>
            <h2>{totalBeds}</h2>
            <small>Department beds</small>
          </div>
        </div>

      </div>

      {/* =================================================
          SEARCH
          ================================================= */}

      <div className="toolbar">

        <div>
          <h2>Medical Departments</h2>
          <p>
            Select a department to view complete details
          </p>
        </div>

        <input
          type="text"
          placeholder="🔍 Search department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* =================================================
          DEPARTMENT CARDS
          ================================================= */}

      <div className="department-grid">

        {filteredDepartments.map((department) => (

          <div
            className="department-card"
            key={department.id}
          >

            <div className="card-top">

              <div
                className="department-icon"
                style={{
                  background: department.bg,
                  color: department.color,
                }}
              >
                <span className="emoji">
                  {department.emoji}
                </span>

                {department.icon}
              </div>

              <span className="active">
                ● Active
              </span>

            </div>

            <h3>
              {department.name}
            </h3>

            <p className="description">
              {department.description}
            </p>

            {/* STATS */}

            <div className="stats">

              <div>
                <FaUserMd />
                <strong>
                  {department.doctors}
                </strong>
                <span>Doctors</span>
              </div>

              <div>
                <FaUserInjured />
                <strong>
                  {department.patients}
                </strong>
                <span>Patients</span>
              </div>

              <div>
                <FaBed />
                <strong>
                  {department.beds}
                </strong>
                <span>Beds</span>
              </div>

            </div>

            <button
              className="view-btn"
              onClick={() =>
                setSelectedDepartment(department)
              }
            >
              View Details
              <FaArrowRight />
            </button>

          </div>

        ))}

      </div>

      {/* =================================================
          NO RESULT
          ================================================= */}

      {filteredDepartments.length === 0 && (
        <div className="no-result">
          <div>🏥</div>
          <h3>No Department Found</h3>
          <p>
            Try searching with another department name.
          </p>
        </div>
      )}

      {/* =================================================
          DEPARTMENT DETAIL MODAL
          ================================================= */}

      {selectedDepartment && (

        <div className="modal-overlay">

          <div className="detail-modal">

            <button
              className="close-btn"
              onClick={() =>
                setSelectedDepartment(null)
              }
            >
              <FaTimes />
            </button>

            <div
              className="detail-icon"
              style={{
                background: selectedDepartment.bg,
                color: selectedDepartment.color,
              }}
            >
              {selectedDepartment.emoji}
            </div>

            <h2>
              {selectedDepartment.name}
            </h2>

            <p className="detail-description">
              {selectedDepartment.description}
            </p>

            <div className="detail-info">

              <div>
                <FaUserMd />
                <span>Doctors</span>
                <strong>
                  {selectedDepartment.doctors}
                </strong>
              </div>

              <div>
                <FaUserInjured />
                <span>Patients</span>
                <strong>
                  {selectedDepartment.patients}
                </strong>
              </div>

              <div>
                <FaBed />
                <span>Total Beds</span>
                <strong>
                  {selectedDepartment.beds}
                </strong>
              </div>

              <div>
                🛏️
                <span>Available</span>
                <strong>
                  {selectedDepartment.availableBeds}
                </strong>
              </div>

              <div>
                <FaClock />
                <span>Timing</span>
                <strong>
                  {selectedDepartment.timing}
                </strong>
              </div>

              <div>
                <FaPhone />
                <span>Contact</span>
                <strong>
                  {selectedDepartment.phone}
                </strong>
              </div>

            </div>

            <div className="services">

              <h3>Medical Services</h3>

              <div className="service-list">

                {selectedDepartment.services.map(
                  (service, index) => (
                    <span key={index}>
                      ✓ {service}
                    </span>
                  )
                )}

              </div>

            </div>

          </div>

        </div>

      )}

      {/* =================================================
          ADD DEPARTMENT MODAL
          ================================================= */}

      {showAddForm && (

        <div className="modal-overlay">

          <div className="add-modal">

            <button
              className="close-btn"
              onClick={() =>
                setShowAddForm(false)
              }
            >
              <FaTimes />
            </button>

            <h2>➕ Add New Department</h2>

            <p>
              Enter department information
            </p>

            <form onSubmit={addDepartment}>

              <input
                type="text"
                placeholder="Department Name *"
                value={newDepartment.name}
                onChange={(e) =>
                  setNewDepartment({
                    ...newDepartment,
                    name: e.target.value,
                  })
                }
              />

              <div className="two-inputs">

                <input
                  type="number"
                  placeholder="Doctors"
                  value={newDepartment.doctors}
                  onChange={(e) =>
                    setNewDepartment({
                      ...newDepartment,
                      doctors: e.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  placeholder="Patients"
                  value={newDepartment.patients}
                  onChange={(e) =>
                    setNewDepartment({
                      ...newDepartment,
                      patients: e.target.value,
                    })
                  }
                />

              </div>

              <div className="two-inputs">

                <input
                  type="number"
                  placeholder="Beds"
                  value={newDepartment.beds}
                  onChange={(e) =>
                    setNewDepartment({
                      ...newDepartment,
                      beds: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Timing"
                  value={newDepartment.timing}
                  onChange={(e) =>
                    setNewDepartment({
                      ...newDepartment,
                      timing: e.target.value,
                    })
                  }
                />

              </div>

              <input
                type="text"
                placeholder="Phone Number"
                value={newDepartment.phone}
                onChange={(e) =>
                  setNewDepartment({
                    ...newDepartment,
                    phone: e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Department Description"
                value={newDepartment.description}
                onChange={(e) =>
                  setNewDepartment({
                    ...newDepartment,
                    description: e.target.value,
                  })
                }
              />

              <button
                type="submit"
                className="save-btn"
              >
                <FaPlus />
                Add Department
              </button>

            </form>

          </div>

        </div>

      )}

      {/* =================================================
          CSS
          ================================================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .department-page {
          min-height: 100vh;
          background: #f5f7fb;
          padding: 25px;
          font-family: Arial, sans-serif;
          color: #172033;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 22px;
        }

        .page-header h1 {
          margin: 0;
          font-size: 27px;
        }

        .page-header p {
          margin: 7px 0 0;
          color: #8992a5;
          font-size: 13px;
        }

        .add-btn {
          border: none;
          background: #1677ff;
          color: white;
          padding: 12px 17px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-weight: 600;
        }

        .add-btn:hover {
          background: #075ed8;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 17px;
          margin-bottom: 22px;
        }

        .summary-card {
          background: white;
          border: 1px solid #e7eaf1;
          border-radius: 13px;
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .summary-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 23px;
        }

        .blue {
          background: #eaf2ff;
        }

        .green {
          background: #eaf8ef;
        }

        .orange {
          background: #fff3df;
        }

        .purple {
          background: #f2eaff;
        }

        .summary-card span {
          font-size: 11px;
          color: #8992a5;
        }

        .summary-card h2 {
          margin: 4px 0;
          font-size: 25px;
        }

        .summary-card small {
          font-size: 9px;
          color: #a0a7b5;
        }

        .toolbar {
          background: white;
          border: 1px solid #e7eaf1;
          border-radius: 13px;
          padding: 18px;
          margin-bottom: 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .toolbar h2 {
          margin: 0;
          font-size: 19px;
        }

        .toolbar p {
          margin: 5px 0 0;
          color: #8992a5;
          font-size: 11px;
        }

        .toolbar input {
          width: 260px;
          padding: 11px 14px;
          border: 1px solid #dfe4ec;
          border-radius: 8px;
          outline: none;
        }

        .toolbar input:focus {
          border-color: #1677ff;
        }

        .department-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 17px;
        }

        .department-card {
          background: white;
          border: 1px solid #e7eaf1;
          border-radius: 14px;
          padding: 18px;
          transition: .2s;
        }

        .department-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(20,40,80,.08);
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .department-icon {
          width: 50px;
          height: 50px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
          position: relative;
        }

        .department-icon .emoji {
          position: absolute;
          font-size: 20px;
        }

        .department-icon svg {
          display: none;
        }

        .active {
          color: #20a464;
          background: #eaf8ef;
          padding: 5px 8px;
          border-radius: 20px;
          font-size: 9px;
          font-weight: bold;
        }

        .department-card h3 {
          margin: 0 0 7px;
          font-size: 16px;
        }

        .description {
          color: #8992a5;
          font-size: 11px;
          line-height: 1.5;
          min-height: 48px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid #edf0f4;
          border-bottom: 1px solid #edf0f4;
          margin: 14px 0;
          padding: 11px 0;
        }

        .stats div {
          text-align: center;
          border-right: 1px solid #edf0f4;
        }

        .stats div:last-child {
          border-right: none;
        }

        .stats svg {
          color: #1677ff;
          margin-bottom: 4px;
        }

        .stats strong {
          display: block;
          font-size: 13px;
        }

        .stats span {
          display: block;
          color: #8992a5;
          font-size: 9px;
          margin-top: 2px;
        }

        .view-btn {
          width: 100%;
          border: none;
          background: #f4f7fc;
          color: #1677ff;
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 600;
        }

        .view-btn:hover {
          background: #eaf2ff;
        }

        .no-result {
          background: white;
          padding: 50px;
          text-align: center;
          border-radius: 14px;
        }

        .no-result div {
          font-size: 40px;
        }

        .no-result h3 {
          margin: 10px 0;
        }

        .no-result p {
          color: #8992a5;
          font-size: 12px;
        }

        /* MODAL */

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15,25,45,.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }

        .detail-modal,
        .add-modal {
          width: 520px;
          max-width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          background: white;
          border-radius: 17px;
          padding: 28px;
          position: relative;
          box-shadow: 0 20px 50px rgba(0,0,0,.2);
        }

        .close-btn {
          position: absolute;
          right: 17px;
          top: 17px;
          border: none;
          background: #f1f3f7;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
        }

        .detail-icon {
          width: 60px;
          height: 60px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          margin-bottom: 13px;
        }

        .detail-modal h2,
        .add-modal h2 {
          margin: 0;
          font-size: 22px;
        }

        .detail-description,
        .add-modal > p {
          color: #8992a5;
          font-size: 12px;
          line-height: 1.6;
        }

        .detail-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 18px;
        }

        .detail-info div {
          background: #f7f9fc;
          border-radius: 9px;
          padding: 12px;
        }

        .detail-info svg {
          color: #1677ff;
          margin-right: 7px;
        }

        .detail-info span {
          color: #8992a5;
          font-size: 10px;
        }

        .detail-info strong {
          display: block;
          margin-top: 6px;
          font-size: 13px;
        }

        .services {
          margin-top: 20px;
        }

        .services h3 {
          font-size: 15px;
        }

        .service-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .service-list span {
          background: #eaf2ff;
          color: #1677ff;
          padding: 7px 10px;
          border-radius: 20px;
          font-size: 10px;
        }

        /* FORM */

        .add-modal form {
          margin-top: 18px;
        }

        .add-modal input,
        .add-modal textarea {
          width: 100%;
          padding: 11px 12px;
          border: 1px solid #dfe4ec;
          border-radius: 8px;
          margin-bottom: 11px;
          outline: none;
          font-family: Arial;
        }

        .add-modal textarea {
          height: 90px;
          resize: vertical;
        }

        .two-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .save-btn {
          width: 100%;
          border: none;
          background: #1677ff;
          color: white;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 7px;
        }

        @media (max-width: 1100px) {

          .department-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .summary-grid {
            grid-template-columns: repeat(2, 1fr);
          }

        }

        @media (max-width: 750px) {

          .department-page {
            padding: 15px;
          }

          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .toolbar {
            flex-direction: column;
            align-items: stretch;
            gap: 15px;
          }

          .toolbar input {
            width: 100%;
          }

          .department-grid {
            grid-template-columns: 1fr;
          }

          .summary-grid {
            grid-template-columns: 1fr;
          }

        }

      `}</style>

    </div>
  );
}

export default Department;