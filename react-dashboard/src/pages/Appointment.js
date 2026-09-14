import React, { useEffect, useState } from "react";
import axios from "axios";

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    patientname: "",
    doctorname: "",
    appointmentdate: "",
    appointmenttime: "",
  });

  const [loading, setLoading] = useState(false);

  // =========================
  // GET APPOINTMENTS
  // =========================
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/appointment"
      );

      if (Array.isArray(res.data)) {
        setAppointments(res.data);
      } else if (Array.isArray(res.data.appointments)) {
        setAppointments(res.data.appointments);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.log("Appointment Error:", error);
    }
  };

  // =========================
  // GET PATIENTS
  // =========================
  const fetchPatients = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/patients"
      );

      if (Array.isArray(res.data)) {
        setPatients(res.data);
      } else if (Array.isArray(res.data.patients)) {
        setPatients(res.data.patients);
      }
    } catch (error) {
      console.log("Patient Error:", error);
    }
  };

  // =========================
  // GET DOCTORS
  // =========================
  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/doctors"
      );

      if (Array.isArray(res.data)) {
        setDoctors(res.data);
      } else if (Array.isArray(res.data.doctors)) {
        setDoctors(res.data.doctors);
      }
    } catch (error) {
      console.log("Doctor Error:", error);
    }
  };

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchDoctors();
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // BOOK APPOINTMENT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.patientname ||
      !formData.doctorname ||
      !formData.appointmentdate ||
      !formData.appointmenttime
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/appointment",
        formData
      );

      alert("Appointment booked successfully!");

      setFormData({
        patientname: "",
        doctorname: "",
        appointmentdate: "",
        appointmenttime: "",
      });

      fetchAppointments();

    } catch (error) {
      console.log("Book Appointment Error:", error);
      alert("Appointment booking failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE APPOINTMENT
  // =========================
  const deleteAppointment = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/appointment/${id}`
      );

      alert("Appointment deleted successfully");

      fetchAppointments();

    } catch (error) {
      console.log("Delete Error:", error);
      alert("Delete failed");
    }
  };

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          📅 Appointments
        </h1>

        <p style={styles.subtitle}>
          Manage and schedule patient appointments
        </p>
      </div>


      {/* =========================
          STAT CARDS
      ========================= */}
      <div style={styles.stats}>

        {/* TOTAL APPOINTMENTS */}
        <div style={styles.card}>
          <div style={styles.iconBlue}>
            📅
          </div>

          <div>
            <p style={styles.cardTitle}>
              Total Appointments
            </p>

            <h2 style={styles.cardNumber}>
              {appointments.length}
            </h2>
          </div>
        </div>


        {/* DOCTORS */}
        <div style={styles.card}>
          <div style={styles.iconGreen}>
            👨‍⚕️
          </div>

          <div>
            <p style={styles.cardTitle}>
              Available Doctors
            </p>

            <h2 style={styles.cardNumber}>
              {doctors.length}
            </h2>
          </div>
        </div>


        {/* PATIENTS */}
        <div style={styles.card}>
          <div style={styles.iconPurple}>
            👤
          </div>

          <div>
            <p style={styles.cardTitle}>
              Registered Patients
            </p>

            <h2 style={styles.cardNumber}>
              {patients.length}
            </h2>
          </div>
        </div>

      </div>


      {/* =========================
          BOOK APPOINTMENT
      ========================= */}
      <div style={styles.formCard}>

        <h2 style={styles.formTitle}>
          ➕ Book Appointment
        </h2>

        <p style={styles.formSubtitle}>
          Schedule a new patient appointment
        </p>


        <form onSubmit={handleSubmit}>

          <div style={styles.formGrid}>

            {/* PATIENT */}
            <div>
              <label style={styles.label}>
                Patient
              </label>

              <select
                name="patientname"
                value={formData.patientname}
                onChange={handleChange}
                style={styles.input}
              >

                <option value="">
                  Select Patient
                </option>

                {patients.map((patient) => (
                  <option
                    key={patient._id}
                    value={patient.name}
                  >
                    {patient.name}
                  </option>
                ))}

              </select>
            </div>


            {/* DOCTOR */}
            <div>
              <label style={styles.label}>
                Doctor
              </label>

              <select
                name="doctorname"
                value={formData.doctorname}
                onChange={handleChange}
                style={styles.input}
              >

                <option value="">
                  Select Doctor
                </option>

                {doctors.map((doctor) => (
                  <option
                    key={doctor._id}
                    value={doctor.name}
                  >
                    Dr. {doctor.name}
                  </option>
                ))}

              </select>
            </div>


            {/* DATE */}
            <div>
              <label style={styles.label}>
                Appointment Date
              </label>

              <input
                type="date"
                name="appointmentdate"
                value={formData.appointmentdate}
                onChange={handleChange}
                style={styles.input}
              />
            </div>


            {/* TIME */}
            <div>
              <label style={styles.label}>
                Appointment Time
              </label>

              <input
                type="time"
                name="appointmenttime"
                value={formData.appointmenttime}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

          </div>


          <button
            type="submit"
            disabled={loading}
            style={styles.bookButton}
          >
            {loading
              ? "Booking..."
              : "📅 Book Appointment"}
          </button>

        </form>

      </div>


      {/* =========================
          APPOINTMENT RECORDS
      ========================= */}
      <div style={styles.tableCard}>

        <div style={styles.tableHeader}>

          <div>
            <h2 style={styles.tableTitle}>
              Appointment Records
            </h2>

            <p style={styles.tableSubtitle}>
              Complete list of scheduled appointments
            </p>
          </div>

          <div style={styles.badge}>
            {appointments.length} Records
          </div>

        </div>


        {appointments.length === 0 ? (

          <div style={styles.empty}>

            <div style={styles.emptyIcon}>
              📅
            </div>

            <h3>
              No Appointments Found
            </h3>

            <p>
              Book an appointment to see it here.
            </p>

          </div>

        ) : (

          <div style={{ overflowX: "auto" }}>

            <table style={styles.table}>

              <thead>

                <tr>

                  <th style={styles.th}>
                    #
                  </th>

                  <th style={styles.th}>
                    Patient
                  </th>

                  <th style={styles.th}>
                    Doctor
                  </th>

                  <th style={styles.th}>
                    Date
                  </th>

                  <th style={styles.th}>
                    Time
                  </th>

                  <th style={styles.th}>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {appointments.map(
                  (appointment, index) => (

                    <tr key={appointment._id}>

                      <td style={styles.td}>
                        {index + 1}
                      </td>


                      <td style={styles.td}>
                        👤{" "}
                        <strong>
                          {appointment.patientname}
                        </strong>
                      </td>


                      <td style={styles.td}>
                        👨‍⚕️ Dr.{" "}
                        {appointment.doctorname}
                      </td>


                      <td style={styles.td}>
                        {appointment.appointmentdate}
                      </td>


                      <td style={styles.td}>
                        ⏰{" "}
                        {appointment.appointmenttime}
                      </td>


                      <td style={styles.td}>

                        <button
                          onClick={() =>
                            deleteAppointment(
                              appointment._id
                            )
                          }
                          style={styles.deleteButton}
                        >
                          🗑 Delete
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}


// =========================
// STYLES
// =========================

const styles = {

  container: {
    minHeight: "100vh",
    background: "#f5f7fb",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    marginBottom: "25px",
  },

  title: {
    margin: 0,
    fontSize: "30px",
    color: "#1e293b",
  },

  subtitle: {
    color: "#64748b",
    marginTop: "7px",
  },

  stats: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "20px",
    marginBottom: "25px",
  },

  card: {
    background: "#fff",
    padding: "22px",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    gap: "18px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.07)",
  },

  iconBlue: {
    width: "55px",
    height: "55px",
    borderRadius: "14px",
    background: "#dbeafe",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
  },

  iconGreen: {
    width: "55px",
    height: "55px",
    borderRadius: "14px",
    background: "#dcfce7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
  },

  iconPurple: {
    width: "55px",
    height: "55px",
    borderRadius: "14px",
    background: "#f3e8ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
  },

  cardTitle: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
  },

  cardNumber: {
    margin: "6px 0 0",
    fontSize: "28px",
    color: "#1e293b",
  },

  formCard: {
    background: "#fff",
    padding: "28px",
    borderRadius: "16px",
    marginBottom: "25px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.07)",
  },

  formTitle: {
    margin: 0,
    color: "#1e293b",
  },

  formSubtitle: {
    color: "#64748b",
    marginTop: "6px",
    marginBottom: "25px",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, 1fr)",
    gap: "20px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#334155",
  },

  input: {
    width: "100%",
    padding: "13px",
    border:
      "1px solid #cbd5e1",
    borderRadius: "9px",
    fontSize: "15px",
    boxSizing: "border-box",
    background: "#fff",
  },

  bookButton: {
    marginTop: "25px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "13px 25px",
    borderRadius: "9px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  tableCard: {
    background: "#fff",
    padding: "28px",
    borderRadius: "16px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.07)",
  },

  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  tableTitle: {
    margin: 0,
    color: "#1e293b",
  },

  tableSubtitle: {
    color: "#64748b",
    margin: "6px 0 0",
  },

  badge: {
    background: "#eff6ff",
    color: "#2563eb",
    padding: "8px 14px",
    borderRadius: "20px",
    fontWeight: "600",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    background: "#f8fafc",
    padding: "15px",
    textAlign: "left",
    color: "#475569",
    borderBottom:
      "1px solid #e2e8f0",
  },

  td: {
    padding: "15px",
    borderBottom:
      "1px solid #e2e8f0",
    color: "#334155",
  },

  deleteButton: {
    background: "#fee2e2",
    color: "#dc2626",
    border: "none",
    padding: "8px 12px",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "600",
  },

  empty: {
    textAlign: "center",
    padding: "50px",
    color: "#64748b",
  },

  emptyIcon: {
    fontSize: "50px",
  },
};


export default Appointment;