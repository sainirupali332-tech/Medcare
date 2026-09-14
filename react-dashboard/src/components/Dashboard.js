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
  FaNotesMedical,
  FaHeartbeat,
  FaUserClock,
  FaCircle,
  FaPhoneAlt,
} from "react-icons/fa";

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:5000/api";

  const loadData = async () => {
    try {
      const [patientsRes, doctorsRes, appointmentsRes] =
        await Promise.all([
          axios.get(`${API}/patients`),
          axios.get(`${API}/doctors`),
          axios.get(`${API}/appointment`),
        ]);

      setPatients(
        Array.isArray(patientsRes.data) ? patientsRes.data : []
      );

      setDoctors(
        Array.isArray(doctorsRes.data) ? doctorsRes.data : []
      );

      setAppointments(
        Array.isArray(appointmentsRes.data)
          ? appointmentsRes.data
          : []
      );
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const todayAppointments = appointments.filter((item) => {
    if (!item.appointmentdate) return false;

    return String(item.appointmentdate).split("T")[0] === today;
  });

  const recentPatients = [...patients].reverse().slice(0, 5);

  const upcomingAppointments = [...appointments]
    .filter((item) => {
      if (!item.appointmentdate) return false;
      return String(item.appointmentdate).split("T")[0] >= today;
    })
    .sort((a, b) => {
      return (
        new Date(a.appointmentdate) -
        new Date(b.appointmentdate)
      );
    })
    .slice(0, 5);

  const goTo = (page) => {
    window.location.href = page;
  };

  const formatDate = (date) => {
    if (!date) return "-";

    const d = new Date(date);

    if (isNaN(d.getTime())) return date;

    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitial = (name) => {
    if (!name) return "P";

    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="dashboard-page">

      {/* ================= HEADER ================= */}
      <div className="dashboard-header">
        <div>
          <div className="welcome-small">
            <FaHeartbeat />
            Hospital Management System
          </div>

          <h1>Good Morning 👋</h1>

          <p>
            Welcome back. Here's what's happening in your hospital today.
          </p>
        </div>

        <div className="header-right">
          <div className="live-status">
            <FaCircle />
            Live System
          </div>

          <div className="date-box">
            <FaClock />
            {new Date().toLocaleDateString("en-IN", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      {/* ================= HOSPITAL BANNER ================= */}
      <div className="hospital-banner">
        <div className="banner-icon">
          <FaHospital />
        </div>

        <div className="banner-content">
          <h2>MedCare Hospital</h2>

          <p>
            Complete hospital management at your fingertips.
            Manage patients, doctors and appointments easily.
          </p>
        </div>

        <div className="banner-actions">
          <button onClick={() => goTo("/patients")}>
            <FaPlus />
            Add Patient
          </button>

          <button
            className="light-btn"
            onClick={() => goTo("/appointments")}
          >
            <FaCalendarCheck />
            Book Appointment
          </button>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon patient-icon">
              <FaUserInjured />
            </div>

            <span className="status-label">
              <FaCircle />
              Active
            </span>
          </div>

          <div className="stat-number">
            {loading ? "..." : patients.length}
          </div>

          <div className="stat-title">
            Total Patients
          </div>

          <div className="stat-bottom">
            Registered patient records
            <FaArrowRight />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon doctor-icon">
              <FaUserMd />
            </div>

            <span className="status-label">
              <FaCircle />
              Staff
            </span>
          </div>

          <div className="stat-number">
            {loading ? "..." : doctors.length}
          </div>

          <div className="stat-title">
            Medical Doctors
          </div>

          <div className="stat-bottom">
            Available medical professionals
            <FaArrowRight />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon appointment-icon">
              <FaCalendarCheck />
            </div>

            <span className="status-label">
              <FaCircle />
              Scheduled
            </span>
          </div>

          <div className="stat-number">
            {loading ? "..." : appointments.length}
          </div>

          <div className="stat-title">
            Total Appointments
          </div>

          <div className="stat-bottom">
            All scheduled appointments
            <FaArrowRight />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon today-icon">
              <FaUserClock />
            </div>

            <span className="status-label">
              <FaCircle />
              Today
            </span>
          </div>

          <div className="stat-number">
            {loading ? "..." : todayAppointments.length}
          </div>

          <div className="stat-title">
            Today's Visits
          </div>

          <div className="stat-bottom">
            Patients visiting today
            <FaArrowRight />
          </div>
        </div>

      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="section-heading">
        <div>
          <h2>Quick Actions</h2>
          <p>Frequently used hospital services</p>
        </div>
      </div>

      <div className="quick-grid">

        <div
          className="quick-card"
          onClick={() => goTo("/patients")}
        >
          <div className="quick-icon blue">
            <FaUserInjured />
          </div>

          <div>
            <h3>Patients</h3>
            <p>Register & manage patients</p>
          </div>

          <FaArrowRight className="quick-arrow" />
        </div>

        <div
          className="quick-card"
          onClick={() => goTo("/doctors")}
        >
          <div className="quick-icon green">
            <FaUserMd />
          </div>

          <div>
            <h3>Doctors</h3>
            <p>Manage medical staff</p>
          </div>

          <FaArrowRight className="quick-arrow" />
        </div>

        <div
          className="quick-card"
          onClick={() => goTo("/appointments")}
        >
          <div className="quick-icon purple">
            <FaCalendarCheck />
          </div>

          <div>
            <h3>Appointments</h3>
            <p>Schedule patient visits</p>
          </div>

          <FaArrowRight className="quick-arrow" />
        </div>

        <div
          className="quick-card"
          onClick={() => goTo("/medicines")}
        >
          <div className="quick-icon orange">
            <FaPills />
          </div>

          <div>
            <h3>Pharmacy</h3>
            <p>Manage medicines & stock</p>
          </div>

          <FaArrowRight className="quick-arrow" />
        </div>

      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="main-grid">

        {/* TODAY APPOINTMENTS */}
        <div className="content-card large-card">

          <div className="card-header">
            <div>
              <h2>Today's Appointments</h2>
              <p>Scheduled patient visits for today</p>
            </div>

            <button
              className="view-btn"
              onClick={() => goTo("/appointments")}
            >
              View All
              <FaArrowRight />
            </button>
          </div>

          {todayAppointments.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                <FaCalendarCheck />
              </div>

              <h3>No appointments today</h3>

              <p>
                There are no appointments scheduled for today.
              </p>

              <button
                onClick={() => goTo("/appointments")}
              >
                <FaPlus />
                Book Appointment
              </button>

            </div>

          ) : (

            <div className="appointment-list">

              {todayAppointments.map((item, index) => (

                <div
                  className="appointment-row"
                  key={item._id || index}
                >

                  <div className="appointment-avatar">
                    <FaUserInjured />
                  </div>

                  <div className="appointment-info">
                    <h4>
                      {item.patientname || "Unknown Patient"}
                    </h4>

                    <span>
                      <FaUserMd />
                      {item.doctorname || "Doctor"}
                    </span>
                  </div>

                  <div className="appointment-time">
                    <FaClock />
                    {item.appointmenttime || "--:--"}
                  </div>

                  <div className="appointment-status">
                    Scheduled
                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* MEDICAL TEAM */}
        <div className="content-card">

          <div className="card-header">

            <div>
              <h2>Medical Team</h2>
              <p>Hospital doctors</p>
            </div>

            <button
              className="view-btn"
              onClick={() => goTo("/doctors")}
            >
              View
              <FaArrowRight />
            </button>

          </div>

          <div className="doctor-list">

            {doctors.length === 0 ? (

              <div className="small-empty">
                <FaUserMd />
                <p>No doctors available</p>
              </div>

            ) : (

              doctors.slice(0, 5).map((doctor, index) => (

                <div
                  className="doctor-row"
                  key={doctor._id || index}
                >

                  <div className="doctor-avatar">
                    <FaUserMd />
                  </div>

                  <div className="doctor-info">

                    <h4>
                      Dr. {doctor.name || "Doctor"}
                    </h4>

                    <p>
                      {doctor.specialization ||
                        doctor.specilization ||
                        "Medical Specialist"}
                    </p>

                  </div>

                  <span className="online-dot">
                    <FaCircle />
                  </span>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

      {/* ================= LOWER SECTION ================= */}
      <div className="lower-grid">

        {/* RECENT PATIENTS */}
        <div className="content-card">

          <div className="card-header">

            <div>
              <h2>Recent Patients</h2>
              <p>Recently registered patients</p>
            </div>

            <button
              className="view-btn"
              onClick={() => goTo("/patients")}
            >
              View
              <FaArrowRight />
            </button>

          </div>

          <div className="patient-list">

            {recentPatients.length === 0 ? (

              <div className="small-empty">
                <FaUserInjured />
                <p>No patients registered</p>
              </div>

            ) : (

              recentPatients.map((patient, index) => (

                <div
                  className="patient-row"
                  key={patient._id || index}
                >

                  <div className="patient-avatar">
                    {getInitial(patient.name)}
                  </div>

                  <div className="patient-info">

                    <h4>
                      {patient.name || "Patient"}
                    </h4>

                    <p>
                      {patient.disease || "General Checkup"}
                    </p>

                  </div>

                  <div className="patient-phone">

                    <FaPhoneAlt />

                    {patient.phone || "N/A"}

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

        {/* DEPARTMENTS */}
        <div className="content-card">

          <div className="card-header">

            <div>
              <h2>Departments</h2>
              <p>Hospital departments</p>
            </div>

          </div>

          <div className="department-grid">

            <div className="department-item">
              <div className="department-icon blue">
                <FaStethoscope />
              </div>

              <span>General Medicine</span>
            </div>

            <div className="department-item">
              <div className="department-icon green">
                <FaHeartbeat />
              </div>

              <span>Cardiology</span>
            </div>

            <div className="department-item">
              <div className="department-icon purple">
                <FaNotesMedical />
              </div>

              <span>Laboratory</span>
            </div>

            <div className="department-item">
              <div className="department-icon orange">
                <FaPills />
              </div>

              <span>Pharmacy</span>
            </div>

            <div className="department-item">
              <div className="department-icon red">
                <FaHospital />
              </div>

              <span>Emergency</span>
            </div>

            <div className="department-item">
              <div className="department-icon teal">
                <FaUserMd />
              </div>

              <span>Neurology</span>
            </div>

          </div>

        </div>

      </div>

      {/* ================= UPCOMING APPOINTMENTS ================= */}
      <div className="content-card upcoming-card">

        <div className="card-header">

          <div>
            <h2>Upcoming Appointments</h2>
            <p>Next scheduled patient visits</p>
          </div>

          <button
            className="view-btn"
            onClick={() => goTo("/appointments")}
          >
            Manage Appointments
            <FaArrowRight />
          </button>

        </div>

        {upcomingAppointments.length === 0 ? (

          <div className="small-empty">
            <FaCalendarCheck />
            <p>No upcoming appointments</p>
          </div>

        ) : (

          <div className="upcoming-list">

            {upcomingAppointments.map((item, index) => (

              <div
                className="upcoming-row"
                key={item._id || index}
              >

                <div className="upcoming-date">

                  <strong>
                    {new Date(item.appointmentdate).getDate()}
                  </strong>

                  <span>
                    {new Date(
                      item.appointmentdate
                    ).toLocaleDateString("en-IN", {
                      month: "short",
                    })}
                  </span>

                </div>

                <div className="upcoming-patient">

                  <h4>
                    {item.patientname || "Patient"}
                  </h4>

                  <p>
                    <FaUserMd />
                    {item.doctorname || "Doctor"}
                  </p>

                </div>

                <div className="upcoming-time">
                  <FaClock />
                  {item.appointmenttime || "--:--"}
                </div>

                <span className="scheduled-badge">
                  Scheduled
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* ================= CSS ================= */}
      <style>{`

        * {
          box-sizing: border-box;
        }

        .dashboard-page {
          width: 100%;
          padding: 24px;
          background: #f6f8fb;
          min-height: 100vh;
          color: #172033;
          font-family: Arial, Helvetica, sans-serif;
        }

        /* HEADER */

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 22px;
          gap: 20px;
        }

        .welcome-small {
          color: #2563eb;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 7px;
        }

        .dashboard-header h1 {
          margin: 0;
          font-size: 27px;
          font-weight: 800;
          color: #172033;
        }

        .dashboard-header p {
          margin: 7px 0 0;
          color: #7a8496;
          font-size: 14px;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .live-status,
        .date-box {
          background: white;
          border: 1px solid #e7ebf2;
          border-radius: 10px;
          padding: 10px 13px;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 7px;
          box-shadow: 0 3px 12px rgba(20, 35, 60, 0.04);
        }

        .live-status {
          color: #16a34a;
        }

        .live-status svg {
          font-size: 7px;
        }

        .date-box {
          color: #667085;
        }

        /* BANNER */

        .hospital-banner {
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            100deg,
            #1d4ed8,
            #2563eb 60%,
            #3b82f6
          );
          border-radius: 16px;
          padding: 22px 24px;
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 22px;
          color: white;
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.18);
        }

        .hospital-banner::after {
          content: "";
          position: absolute;
          width: 190px;
          height: 190px;
          border-radius: 50%;
          right: -55px;
          top: -85px;
          border: 30px solid rgba(255,255,255,0.08);
        }

        .banner-icon {
          min-width: 58px;
          height: 58px;
          background: rgba(255,255,255,0.16);
          border-radius: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 27px;
        }

        .banner-content {
          flex: 1;
          position: relative;
          z-index: 2;
        }

        .banner-content h2 {
          margin: 0;
          font-size: 21px;
        }

        .banner-content p {
          margin: 6px 0 0;
          font-size: 13px;
          color: rgba(255,255,255,0.85);
        }

        .banner-actions {
          display: flex;
          gap: 9px;
          position: relative;
          z-index: 3;
        }

        .banner-actions button {
          border: none;
          border-radius: 9px;
          padding: 11px 14px;
          background: white;
          color: #1d4ed8;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
        }

        .banner-actions .light-btn {
          background: rgba(255,255,255,0.14);
          color: white;
          border: 1px solid rgba(255,255,255,0.3);
        }

        /* STATS */

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 26px;
        }

        .stat-card {
          background: white;
          border: 1px solid #e8ecf2;
          border-radius: 14px;
          padding: 18px;
          box-shadow: 0 4px 16px rgba(20, 35, 60, 0.045);
          transition: 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 9px 24px rgba(20, 35, 60, 0.08);
        }

        .stat-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-icon {
          width: 42px;
          height: 42px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .patient-icon {
          background: #eaf2ff;
          color: #2563eb;
        }

        .doctor-icon {
          background: #eafaf0;
          color: #16a34a;
        }

        .appointment-icon {
          background: #f3edff;
          color: #7c3aed;
        }

        .today-icon {
          background: #fff4e7;
          color: #ea580c;
        }

        .status-label {
          font-size: 10px;
          color: #7c8799;
          display: flex;
          gap: 5px;
          align-items: center;
        }

        .status-label svg {
          font-size: 6px;
          color: #16a34a;
        }

        .stat-number {
          margin-top: 15px;
          font-size: 29px;
          font-weight: 800;
          color: #182235;
        }

        .stat-title {
          margin-top: 2px;
          font-size: 13px;
          font-weight: 700;
          color: #566174;
        }

        .stat-bottom {
          border-top: 1px solid #eef1f5;
          margin-top: 13px;
          padding-top: 10px;
          color: #8a94a5;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .stat-bottom svg {
          color: #9ba5b5;
        }

        /* SECTION */

        .section-heading {
          margin: 4px 0 12px;
        }

        .section-heading h2 {
          margin: 0;
          font-size: 18px;
        }

        .section-heading p {
          margin: 4px 0 0;
          font-size: 12px;
          color: #8992a2;
        }

        /* QUICK */

        .quick-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 13px;
          margin-bottom: 24px;
        }

        .quick-card {
          background: white;
          border: 1px solid #e8ecf2;
          border-radius: 13px;
          padding: 15px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: 0.2s;
        }

        .quick-card:hover {
          border-color: #cfd8e7;
          transform: translateY(-2px);
        }

        .quick-icon,
        .department-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .blue {
          background: #eaf2ff;
          color: #2563eb;
        }

        .green {
          background: #eafaf0;
          color: #16a34a;
        }

        .purple {
          background: #f3edff;
          color: #7c3aed;
        }

        .orange {
          background: #fff4e7;
          color: #ea580c;
        }

        .red {
          background: #ffeded;
          color: #dc2626;
        }

        .teal {
          background: #e8fbfa;
          color: #0f766e;
        }

        .quick-card h3 {
          margin: 0;
          font-size: 13px;
          color: #202a3b;
        }

        .quick-card p {
          margin: 4px 0 0;
          color: #8a94a5;
          font-size: 10px;
        }

        .quick-arrow {
          margin-left: auto;
          color: #a5adba;
          font-size: 11px;
        }

        /* CONTENT */

        .main-grid {
          display: grid;
          grid-template-columns: 1.65fr 1fr;
          gap: 18px;
          margin-bottom: 18px;
        }

        .lower-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 18px;
          margin-bottom: 18px;
        }

        .content-card {
          background: white;
          border: 1px solid #e8ecf2;
          border-radius: 14px;
          padding: 18px;
          box-shadow: 0 4px 16px rgba(20, 35, 60, 0.04);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .card-header h2 {
          margin: 0;
          font-size: 16px;
          color: #202a3b;
        }

        .card-header p {
          margin: 4px 0 0;
          font-size: 11px;
          color: #8a94a5;
        }

        .view-btn {
          border: none;
          background: transparent;
          color: #2563eb;
          font-weight: 700;
          font-size: 11px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* APPOINTMENTS */

        .appointment-list {
          display: flex;
          flex-direction: column;
        }

        .appointment-row {
          display: flex;
          align-items: center;
          padding: 12px 0;
          border-top: 1px solid #eef1f5;
          gap: 12px;
        }

        .appointment-avatar {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #eef5ff;
          color: #2563eb;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .appointment-info {
          flex: 1;
        }

        .appointment-info h4 {
          margin: 0 0 4px;
          font-size: 12px;
        }

        .appointment-info span {
          color: #8a94a5;
          font-size: 10px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .appointment-time {
          font-size: 11px;
          color: #596579;
          display: flex;
          align-items: center;
          gap: 5px;
          min-width: 75px;
        }

        .appointment-status,
        .scheduled-badge {
          padding: 5px 8px;
          border-radius: 20px;
          background: #eafaf0;
          color: #168344;
          font-size: 9px;
          font-weight: 700;
        }

        /* EMPTY */

        .empty-state {
          text-align: center;
          padding: 28px 10px;
        }

        .empty-icon {
          width: 55px;
          height: 55px;
          margin: auto;
          border-radius: 50%;
          background: #eef5ff;
          color: #2563eb;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 22px;
        }

        .empty-state h3 {
          margin: 12px 0 5px;
          font-size: 14px;
        }

        .empty-state p {
          margin: 0 0 13px;
          color: #8a94a5;
          font-size: 11px;
        }

        .empty-state button {
          border: none;
          background: #2563eb;
          color: white;
          border-radius: 8px;
          padding: 9px 13px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        .empty-state button svg {
          margin-right: 5px;
        }

        /* DOCTORS */

        .doctor-list {
          display: flex;
          flex-direction: column;
        }

        .doctor-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          border-top: 1px solid #eef1f5;
        }

        .doctor-avatar {
          width: 36px;
          height: 36px;
          background: #eafaf0;
          color: #16a34a;
          border-radius: 9px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .doctor-info {
          flex: 1;
        }

        .doctor-info h4 {
          margin: 0 0 3px;
          font-size: 12px;
        }

        .doctor-info p {
          margin: 0;
          color: #8992a2;
          font-size: 10px;
        }

        .online-dot {
          color: #22c55e;
          font-size: 7px;
        }

        .small-empty {
          text-align: center;
          padding: 30px 10px;
          color: #9aa3b2;
        }

        .small-empty svg {
          font-size: 25px;
          margin-bottom: 8px;
        }

        .small-empty p {
          margin: 0;
          font-size: 11px;
        }

        /* PATIENTS */

        .patient-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          border-top: 1px solid #eef1f5;
        }

        .patient-avatar {
          width: 36px;
          height: 36px;
          background: #eef5ff;
          color: #2563eb;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 800;
        }

        .patient-info {
          flex: 1;
        }

        .patient-info h4 {
          margin: 0 0 3px;
          font-size: 12px;
        }

        .patient-info p {
          margin: 0;
          color: #8a94a5;
          font-size: 10px;
        }

        .patient-phone {
          font-size: 9px;
          color: #7d8797;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* DEPARTMENT */

        .department-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 9px;
        }

        .department-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 9px;
          border: 1px solid #eef1f5;
          border-radius: 10px;
        }

        .department-icon {
          width: 32px;
          height: 32px;
          font-size: 13px;
        }

        .department-item span {
          font-size: 10px;
          font-weight: 700;
          color: #596579;
        }

        /* UPCOMING */

        .upcoming-list {
          display: flex;
          flex-direction: column;
        }

        .upcoming-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 0;
          border-top: 1px solid #eef1f5;
        }

        .upcoming-date {
          width: 46px;
          height: 46px;
          border-radius: 10px;
          background: #eef5ff;
          color: #2563eb;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .upcoming-date strong {
          font-size: 17px;
          line-height: 17px;
        }

        .upcoming-date span {
          font-size: 9px;
          text-transform: uppercase;
        }

        .upcoming-patient {
          flex: 1;
        }

        .upcoming-patient h4 {
          margin: 0 0 4px;
          font-size: 12px;
        }

        .upcoming-patient p {
          margin: 0;
          color: #8a94a5;
          font-size: 10px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .upcoming-time {
          color: #5f6b7d;
          font-size: 10px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* RESPONSIVE */

        @media (max-width: 1100px) {

          .stats-grid,
          .quick-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .main-grid,
          .lower-grid {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 700px) {

          .dashboard-page {
            padding: 14px;
          }

          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-right {
            width: 100%;
          }

          .date-box,
          .live-status {
            flex: 1;
          }

          .hospital-banner {
            flex-direction: column;
            align-items: flex-start;
          }

          .banner-actions {
            width: 100%;
            flex-wrap: wrap;
          }

          .stats-grid,
          .quick-grid {
            grid-template-columns: 1fr;
          }

          .appointment-row {
            flex-wrap: wrap;
          }

          .appointment-status {
            margin-left: 50px;
          }

          .patient-phone {
            display: none;
          }

          .upcoming-row {
            flex-wrap: wrap;
          }

        }

      `}</style>
    </div>
  );
}

export default Dashboard;