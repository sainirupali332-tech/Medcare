import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  FaUserInjured,
  FaUserMd,
  FaCalendarCheck,
  FaHospital,
  FaPlus,
  FaArrowRight,
  FaClock,
  FaStethoscope,
  FaPills,
  FaHeartbeat,
  FaUserClock,
  FaCircle,
  FaPhoneAlt,
  FaSignOutAlt,
} from "react-icons/fa";

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const API = "http://localhost:5000/api";

  // =====================================================
  // LOAD DASHBOARD DATA
  // =====================================================

  const loadData = async () => {
    try {
      const [patientsRes, doctorsRes, appointmentsRes] =
        await Promise.all([
          axios.get(`${API}/patients`),
          axios.get(`${API}/doctors`),
          axios.get(`${API}/appointment`),
        ]);

      setPatients(
        Array.isArray(patientsRes.data)
          ? patientsRes.data
          : []
      );

      setDoctors(
        Array.isArray(doctorsRes.data)
          ? doctorsRes.data
          : []
      );

      setAppointments(
        Array.isArray(appointmentsRes.data)
          ? appointmentsRes.data
          : []
      );
    } catch (error) {
      console.log("Dashboard API Error:", error);
    }
  };

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("loggedInEmail");
  localStorage.removeItem("username");

  window.location.href = "/";
};

  // =====================================================
  // NAVIGATION
  // =====================================================

  const goTo = (page) => {
    window.location.href = page;
  };

  // =====================================================
  // DATE
  // =====================================================

  const today = new Date();

  const todayString = today.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // =====================================================
  // TODAY APPOINTMENTS
  // =====================================================

  const todayAppointments = appointments.filter((item) => {
    if (!item.appointmentdate) return false;

    const appointmentDate = new Date(
      item.appointmentdate
    );

    return (
      appointmentDate.toDateString() ===
      today.toDateString()
    );
  });

  // =====================================================
  // RECENT PATIENTS
  // =====================================================

  const recentPatients = patients.slice(0, 5);

  // =====================================================
  // UPCOMING APPOINTMENTS
  // =====================================================

  const upcomingAppointments = appointments.slice(0, 5);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="dashboard-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="dashboard-header">

        <div className="header-left">
          <h1>Hospital Management System</h1>

          <p>
            <FaHeartbeat />
            Good Morning, Admin
          </p>
        </div>

        <div className="header-right">

          <div className="live-status">
            <FaCircle />
            Live System
          </div>

          <div className="header-date">
            <FaClock />
            {todayString}
          </div>

          {/* LOGOUT BUTTON */}

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="dashboard-content">

        {/* =====================================================
            WELCOME BANNER
        ===================================================== */}

        <div className="welcome-banner">

          <div className="banner-content">

            <div>
              <span className="banner-small">
                MEDCARE HOSPITAL
              </span>

              <h2>
                Quality Healthcare,
                <br />
                Better Life
              </h2>

              <p>
                Manage patients, doctors and
                appointments efficiently.
              </p>

              <div className="banner-buttons">

                <button
                  onClick={() => goTo("/patients")}
                >
                  <FaPlus />
                  Add Patient
                </button>

                <button
                  onClick={() => goTo("/appointments")}
                  className="secondary-btn"
                >
                  <FaCalendarCheck />
                  Book Appointment
                </button>

              </div>
            </div>

            <div className="banner-icon">
              <FaHospital />
            </div>

          </div>

        </div>

        {/* =====================================================
            STATISTICS
        ===================================================== */}

        <div className="stats-grid">

          {/* PATIENTS */}

          <div className="stat-card patients-card">

            <div className="stat-icon">
              <FaUserInjured />
            </div>

            <div className="stat-info">
              <span>Total Patients</span>
              <h3>{patients.length}</h3>
              <small>
                Registered patients
              </small>
            </div>

          </div>

          {/* DOCTORS */}

          <div className="stat-card doctors-card">

            <div className="stat-icon">
              <FaUserMd />
            </div>

            <div className="stat-info">
              <span>Medical Doctors</span>
              <h3>{doctors.length}</h3>
              <small>
                Available doctors
              </small>
            </div>

          </div>

          {/* APPOINTMENTS */}

          <div className="stat-card appointment-card">

            <div className="stat-icon">
              <FaCalendarCheck />
            </div>

            <div className="stat-info">
              <span>Total Appointments</span>
              <h3>{appointments.length}</h3>
              <small>
                Scheduled appointments
              </small>
            </div>

          </div>

          {/* TODAY VISITS */}

          <div className="stat-card visits-card">

            <div className="stat-icon">
              <FaUserClock />
            </div>

            <div className="stat-info">
              <span>Today's Visits</span>
              <h3>
                {todayAppointments.length}
              </h3>
              <small>
                Today's appointments
              </small>
            </div>

          </div>

        </div>

        {/* =====================================================
            QUICK ACTIONS
        ===================================================== */}

        <div className="section-title">

          <div>
            <h2>Quick Services</h2>
            <p>
              Access hospital services quickly
            </p>
          </div>

        </div>

        <div className="quick-actions">

          {/* PATIENTS */}

          <button
            className="quick-card"
            onClick={() => goTo("/patients")}
          >

            <div className="quick-icon">
              <FaUserInjured />
            </div>

            <div>
              <h3>Patients</h3>
              <p>Manage patient records</p>
            </div>

            <FaArrowRight className="arrow" />

          </button>

          {/* DOCTORS */}

          <button
            className="quick-card"
            onClick={() => goTo("/doctors")}
          >

            <div className="quick-icon">
              <FaUserMd />
            </div>

            <div>
              <h3>Doctors</h3>
              <p>View medical team</p>
            </div>

            <FaArrowRight className="arrow" />

          </button>

          {/* APPOINTMENTS */}

          <button
            className="quick-card"
            onClick={() => goTo("/appointments")}
          >

            <div className="quick-icon">
              <FaCalendarCheck />
            </div>

            <div>
              <h3>Appointments</h3>
              <p>Manage appointments</p>
            </div>

            <FaArrowRight className="arrow" />

          </button>

          {/* PHARMACY */}

          <button
            className="quick-card"
            onClick={() => goTo("/medicines")}
          >

            <div className="quick-icon">
              <FaPills />
            </div>

            <div>
              <h3>Pharmacy</h3>
              <p>Manage medicines</p>
            </div>

            <FaArrowRight className="arrow" />

          </button>

        </div>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div className="main-grid">

          {/* =====================================================
              TODAY'S APPOINTMENTS
          ===================================================== */}

          <div className="dashboard-box">

            <div className="box-header">

              <div>
                <h2>Today's Appointments</h2>
                <p>
                  Scheduled patient visits
                </p>
              </div>

              <button
                onClick={() =>
                  goTo("/appointments")
                }
              >
                View All
              </button>

            </div>

            {todayAppointments.length === 0 ? (

              <div className="empty-state">

                <FaCalendarCheck />

                <h3>
                  No appointments today
                </h3>

                <p>
                  There are no scheduled
                  appointments for today.
                </p>

              </div>

            ) : (

              <div className="appointment-list">

                {todayAppointments
                  .slice(0, 5)
                  .map((appointment) => (

                    <div
                      className="appointment-item"
                      key={appointment._id}
                    >

                      <div className="appointment-icon">
                        <FaStethoscope />
                      </div>

                      <div className="appointment-info">

                        <h4>
                          {appointment.patientname}
                        </h4>

                        <p>
                          Dr.{" "}
                          {appointment.doctorname}
                        </p>

                      </div>

                      <div className="appointment-time">

                        <FaClock />

                        {appointment.appointmenttime ||
                          "Time N/A"}

                      </div>

                    </div>

                  ))}

              </div>

            )}

          </div>

          {/* =====================================================
              MEDICAL TEAM
          ===================================================== */}

          <div className="dashboard-box">

            <div className="box-header">

              <div>
                <h2>Medical Team</h2>
                <p>
                  Our available doctors
                </p>
              </div>

              <button
                onClick={() =>
                  goTo("/doctors")
                }
              >
                View All
              </button>

            </div>

            <div className="doctor-list">

              {doctors.length === 0 ? (

                <div className="empty-state">

                  <FaUserMd />

                  <h3>
                    No doctors found
                  </h3>

                  <p>
                    Add doctors to see them here.
                  </p>

                </div>

              ) : (

                doctors
                  .slice(0, 5)
                  .map((doctor) => (

                    <div
                      className="doctor-item"
                      key={doctor._id}
                    >

                      <div className="doctor-avatar">
                        <FaUserMd />
                      </div>

                      <div className="doctor-info">

                        <h4>
                          {doctor.name}
                        </h4>

                        <p>
                          {doctor.specialization}
                        </p>

                      </div>

                      <div className="doctor-status">
                        <FaCircle />
                        Available
                      </div>

                    </div>

                  ))

              )}

            </div>

          </div>

        </div>

        {/* =====================================================
            LOWER GRID
        ===================================================== */}

        <div className="lower-grid">

          {/* RECENT PATIENTS */}

          <div className="dashboard-box">

            <div className="box-header">

              <div>
                <h2>Recent Patients</h2>
                <p>
                  Recently registered patients
                </p>
              </div>

              <button
                onClick={() =>
                  goTo("/patients")
                }
              >
                View All
              </button>

            </div>

            {recentPatients.length === 0 ? (

              <div className="empty-state">

                <FaUserInjured />

                <h3>
                  No patients found
                </h3>

                <p>
                  Add patients to see records.
                </p>

              </div>

            ) : (

              <div className="patient-list">

                {recentPatients.map((patient) => (

                  <div
                    className="patient-item"
                    key={patient._id}
                  >

                    <div className="patient-avatar">
                      <FaUserInjured />
                    </div>

                    <div className="patient-info">

                      <h4>
                        {patient.name}
                      </h4>

                      <p>
                        {patient.disease}
                      </p>

                    </div>

                    <div className="patient-phone">

                      <FaPhoneAlt />

                      {patient.phone}

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

          {/* DEPARTMENTS */}

          <div className="dashboard-box department-box">

            <div className="box-header">

              <div>
                <h2>Hospital Departments</h2>
                <p>
                  Healthcare departments
                </p>
              </div>

              <button
                onClick={() =>
                  goTo("/departments")
                }
              >
                View All
              </button>

            </div>

            <div className="department-list">

              <div className="department-item">

                <div className="department-icon">
                  <FaHeartbeat />
                </div>

                <div>
                  <h4>Cardiology</h4>
                  <p>
                    Heart & cardiovascular care
                  </p>
                </div>

              </div>

              <div className="department-item">

                <div className="department-icon">
                  <FaStethoscope />
                </div>

                <div>
                  <h4>General Medicine</h4>
                  <p>
                    General healthcare services
                  </p>
                </div>

              </div>

              <div className="department-item">

                <div className="department-icon">
                  <FaHospital />
                </div>

                <div>
                  <h4>Emergency</h4>
                  <p>
                    24/7 emergency services
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            UPCOMING APPOINTMENTS
        ===================================================== */}

        <div className="dashboard-box upcoming-box">

          <div className="box-header">

            <div>
              <h2>Upcoming Appointments</h2>
              <p>
                Recently scheduled appointments
              </p>
            </div>

            <button
              onClick={() =>
                goTo("/appointments")
              }
            >
              View All
            </button>

          </div>

          {upcomingAppointments.length === 0 ? (

            <div className="empty-state">

              <FaCalendarCheck />

              <h3>
                No upcoming appointments
              </h3>

              <p>
                Scheduled appointments will appear here.
              </p>

            </div>

          ) : (

            <div className="upcoming-list">

              {upcomingAppointments.map(
                (appointment) => (

                  <div
                    className="upcoming-item"
                    key={appointment._id}
                  >

                    <div className="upcoming-date">

                      <strong>
                        {formatDate(
                          appointment.appointmentdate
                        )}
                      </strong>

                      <span>
                        {appointment.appointmenttime}
                      </span>

                    </div>

                    <div className="upcoming-details">

                      <h4>
                        {appointment.patientname}
                      </h4>

                      <p>
                        Dr.{" "}
                        {appointment.doctorname}
                      </p>

                    </div>

                    <div className="upcoming-icon">
                      <FaCalendarCheck />
                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .dashboard-page {
          min-height: 100vh;
          background: #f4f7fb;
          font-family: Arial, Helvetica, sans-serif;
          color: #172033;
        }

        /* HEADER */

        .dashboard-header {
          min-height: 82px;
          background: #ffffff;
          border-bottom: 1px solid #e5e9f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 30px;
          gap: 20px;
        }

        .header-left h1 {
          margin: 0;
          font-size: 23px;
          font-weight: 700;
          color: #172033;
        }

        .header-left p {
          margin: 7px 0 0;
          color: #6b7280;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .header-left p svg {
          color: #1d9b70;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .live-status {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #15956c;
          font-size: 13px;
          font-weight: 600;
        }

        .live-status svg {
          font-size: 8px;
        }

        .header-date {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #667085;
          font-size: 13px;
          padding-right: 4px;
        }

        /* LOGOUT */

        .logout-btn {
          border: none;
          background: #ef4444;
          color: white;
          padding: 10px 17px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .logout-btn:hover {
          background: #dc2626;
          transform: translateY(-1px);
        }

        /* CONTENT */

        .dashboard-content {
          padding: 28px 30px 45px;
          max-width: 1500px;
          margin: auto;
        }

        /* BANNER */

        .welcome-banner {
          background: linear-gradient(
            135deg,
            #0f766e,
            #155e75
          );
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 25px;
          box-shadow: 0 8px 25px rgba(15, 118, 110, 0.12);
        }

        .banner-content {
          min-height: 235px;
          padding: 32px 38px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .banner-small {
          color: #a7f3d0;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        .banner-content h2 {
          color: white;
          font-size: 32px;
          line-height: 1.2;
          margin: 10px 0;
        }

        .banner-content p {
          color: #d8f3ef;
          margin: 0 0 20px;
          font-size: 14px;
        }

        .banner-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .banner-buttons button {
          border: none;
          background: white;
          color: #0f766e;
          padding: 11px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .banner-buttons .secondary-btn {
          background: rgba(255,255,255,0.15);
          color: white;
          border: 1px solid rgba(255,255,255,0.35);
        }

        .banner-icon {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.85);
          font-size: 72px;
        }

        /* STATS */

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: white;
          border-radius: 13px;
          padding: 21px;
          display: flex;
          align-items: center;
          gap: 16px;
          border: 1px solid #e7ebf1;
          box-shadow: 0 3px 12px rgba(20, 30, 50, 0.04);
        }

        .stat-icon {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          background: #e8f6f2;
          color: #0f766e;
          flex-shrink: 0;
        }

        .stat-info span {
          display: block;
          color: #6b7280;
          font-size: 12px;
          margin-bottom: 5px;
        }

        .stat-info h3 {
          margin: 0;
          font-size: 25px;
          color: #172033;
        }

        .stat-info small {
          color: #98a2b3;
          font-size: 11px;
        }

        /* SECTION TITLE */

        .section-title {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
        }

        .section-title h2 {
          margin: 0;
          font-size: 20px;
        }

        .section-title p {
          margin: 5px 0 0;
          color: #7b8494;
          font-size: 13px;
        }

        /* QUICK ACTIONS */

        .quick-actions {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 30px;
        }

        .quick-card {
          border: 1px solid #e5e9f0;
          background: white;
          border-radius: 12px;
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 13px;
          text-align: left;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .quick-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 7px 20px rgba(20,30,50,0.08);
        }

        .quick-icon {
          width: 43px;
          height: 43px;
          background: #e8f6f2;
          color: #0f766e;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .quick-card h3 {
          margin: 0 0 4px;
          font-size: 14px;
        }

        .quick-card p {
          margin: 0;
          color: #7b8494;
          font-size: 11px;
        }

        .arrow {
          margin-left: auto;
          color: #98a2b3;
          font-size: 12px;
        }

        /* MAIN GRID */

        .main-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .lower-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .dashboard-box {
          background: white;
          border: 1px solid #e5e9f0;
          border-radius: 13px;
          padding: 21px;
          box-shadow: 0 3px 12px rgba(20,30,50,0.04);
        }

        .box-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #edf0f4;
          padding-bottom: 15px;
          margin-bottom: 8px;
        }

        .box-header h2 {
          margin: 0;
          font-size: 17px;
        }

        .box-header p {
          margin: 5px 0 0;
          color: #7b8494;
          font-size: 12px;
        }

        .box-header button {
          background: transparent;
          border: none;
          color: #0f766e;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        /* EMPTY */

        .empty-state {
          min-height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          color: #98a2b3;
        }

        .empty-state svg {
          font-size: 31px;
          margin-bottom: 10px;
          color: #c5ccd6;
        }

        .empty-state h3 {
          margin: 0 0 5px;
          font-size: 14px;
          color: #667085;
        }

        .empty-state p {
          margin: 0;
          font-size: 11px;
        }

        /* APPOINTMENTS */

        .appointment-item,
        .doctor-item,
        .patient-item,
        .department-item,
        .upcoming-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 5px;
          border-bottom: 1px solid #f0f2f5;
        }

        .appointment-item:last-child,
        .doctor-item:last-child,
        .patient-item:last-child,
        .department-item:last-child,
        .upcoming-item:last-child {
          border-bottom: none;
        }

        .appointment-icon {
          width: 39px;
          height: 39px;
          background: #e8f6f2;
          color: #0f766e;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .appointment-info {
          flex: 1;
        }

        .appointment-info h4,
        .doctor-info h4,
        .patient-info h4,
        .department-item h4,
        .upcoming-details h4 {
          margin: 0 0 4px;
          font-size: 13px;
        }

        .appointment-info p,
        .doctor-info p,
        .patient-info p,
        .department-item p,
        .upcoming-details p {
          margin: 0;
          color: #7b8494;
          font-size: 11px;
        }

        .appointment-time {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #0f766e;
          font-size: 11px;
          font-weight: 600;
        }

        /* DOCTORS */

        .doctor-avatar,
        .patient-avatar {
          width: 39px;
          height: 39px;
          border-radius: 50%;
          background: #e8f6f2;
          color: #0f766e;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .doctor-info,
        .patient-info {
          flex: 1;
        }

        .doctor-status {
          font-size: 10px;
          color: #15956c;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .doctor-status svg {
          font-size: 7px;
        }

        /* PATIENT */

        .patient-phone {
          font-size: 10px;
          color: #667085;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* DEPARTMENT */

        .department-icon {
          width: 40px;
          height: 40px;
          background: #edf7ff;
          color: #2774c7;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* UPCOMING */

        .upcoming-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0 20px;
        }

        .upcoming-date {
          width: 100px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .upcoming-date strong {
          font-size: 11px;
          color: #172033;
        }

        .upcoming-date span {
          font-size: 10px;
          color: #0f766e;
        }

        .upcoming-details {
          flex: 1;
        }

        .upcoming-icon {
          width: 35px;
          height: 35px;
          border-radius: 8px;
          background: #e8f6f2;
          color: #0f766e;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* RESPONSIVE */

        @media (max-width: 1100px) {

          .stats-grid,
          .quick-actions {
            grid-template-columns: repeat(2, 1fr);
          }

          .main-grid,
          .lower-grid {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 700px) {

          .dashboard-header {
            padding: 15px;
            flex-direction: column;
            align-items: flex-start;
          }

          .header-right {
            width: 100%;
            justify-content: space-between;
            flex-wrap: wrap;
          }

          .dashboard-content {
            padding: 18px 15px 30px;
          }

          .banner-content {
            padding: 25px;
          }

          .banner-icon {
            display: none;
          }

          .banner-content h2 {
            font-size: 25px;
          }

          .stats-grid,
          .quick-actions {
            grid-template-columns: 1fr;
          }

          .upcoming-list {
            grid-template-columns: 1fr;
          }

          .patient-phone {
            display: none;
          }

        }

        @media (max-width: 450px) {

          .header-date {
            display: none;
          }

          .logout-btn {
            padding: 9px 12px;
          }

          .header-left h1 {
            font-size: 19px;
          }

        }

      `}</style>

    </div>
  );
}

export default Dashboard;