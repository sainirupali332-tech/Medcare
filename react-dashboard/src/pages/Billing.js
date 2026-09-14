import React, { useEffect, useState } from "react";
import axios from "axios";

function Billing() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    patientname: "",
    doctorname: "",
    treatementservice: "",
    amount: "",
  });

  // =========================
  // GET BILLING DATA
  // =========================
  const getBills = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/Billing"
      );

      setBills(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log("Billing GET Error:", error);
      setBills([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBills();
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
  // CREATE BILL
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.patientname.trim() ||
      !formData.doctorname.trim() ||
      !formData.treatementservice.trim() ||
      formData.amount === ""
    ) {
      alert("Please fill all billing fields");
      return;
    }

    try {
      setSaving(true);

      await axios.post(
        "http://localhost:5000/api/Billing",
        {
          patientname: formData.patientname.trim(),
          doctorname: formData.doctorname.trim(),
          treatementservice: formData.treatementservice.trim(),
          amount: Number(formData.amount),
        }
      );

      alert("Bill created successfully");

      setFormData({
        patientname: "",
        doctorname: "",
        treatementservice: "",
        amount: "",
      });

      getBills();
    } catch (error) {
      console.log("Billing POST Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to create bill"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // DELETE BILL
  // =========================
  const deleteBill = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bill?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/Billing/${id}`
      );

      alert("Bill deleted successfully");

      getBills();
    } catch (error) {
      console.log("Billing DELETE Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete bill"
      );
    }
  };

  // =========================
  // TOTAL REVENUE
  // =========================
  const totalRevenue = bills.reduce(
    (total, bill) => total + Number(bill.amount || 0),
    0
  );

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.headerTitle}>
            💰 Billing Management
          </h1>

          <p style={styles.headerText}>
            Manage hospital patient billing and payments
          </p>
        </div>

        <div style={styles.headerIcon}>
          💳
        </div>
      </div>

      {/* CARDS */}
      <div style={styles.cards}>

        <div style={styles.card}>
          <div style={styles.cardIcon}>💰</div>

          <div>
            <p style={styles.cardLabel}>
              Total Revenue
            </p>

            <h2 style={styles.cardValue}>
              ₹{totalRevenue}
            </h2>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcon}>🧾</div>

          <div>
            <p style={styles.cardLabel}>
              Total Bills
            </p>

            <h2 style={styles.cardValue}>
              {bills.length}
            </h2>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcon}>🏥</div>

          <div>
            <p style={styles.cardLabel}>
              Billing Status
            </p>

            <h2
              style={{
                margin: 0,
                color: "#16a34a",
                fontSize: "24px",
              }}
            >
              Active
            </h2>
          </div>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div style={styles.mainGrid}>

        {/* CREATE BILL */}
        <div style={styles.panel}>

          <h2 style={styles.panelTitle}>
            ➕ Create New Bill
          </h2>

          <p style={styles.description}>
            Enter patient treatment and billing details.
          </p>

          <form onSubmit={handleSubmit}>

            <label style={styles.label}>
              Patient Name
            </label>

            <input
              type="text"
              name="patientname"
              value={formData.patientname}
              onChange={handleChange}
              placeholder="Enter patient name"
              style={styles.input}
            />

            <label style={styles.label}>
              Doctor Name
            </label>

            <input
              type="text"
              name="doctorname"
              value={formData.doctorname}
              onChange={handleChange}
              placeholder="Enter doctor name"
              style={styles.input}
            />

            <label style={styles.label}>
              Treatment / Service
            </label>

            <input
              type="text"
              name="treatementservice"
              value={formData.treatementservice}
              onChange={handleChange}
              placeholder="Enter treatment or service"
              style={styles.input}
            />

            <label style={styles.label}>
              Amount
            </label>

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              min="0"
              style={styles.input}
            />

            <button
              type="submit"
              disabled={saving}
              style={{
                ...styles.submitButton,
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving
                ? "⏳ Creating..."
                : "💳 Generate Bill"}
            </button>

          </form>
        </div>

        {/* BILL LIST */}
        <div style={styles.panel}>

          <div style={styles.listHeader}>
            <div>
              <h2 style={styles.panelTitle}>
                🧾 Recent Bills
              </h2>

              <p style={styles.description}>
                All hospital billing records
              </p>
            </div>

            <button
              onClick={getBills}
              style={styles.refreshButton}
            >
              🔄 Refresh
            </button>
          </div>

          {loading ? (
            <div style={styles.emptyBox}>
              <div style={styles.bigIcon}>
                ⏳
              </div>

              <h3>Loading Bills...</h3>

              <p>Please wait</p>
            </div>
          ) : bills.length === 0 ? (
            <div style={styles.emptyBox}>
              <div style={styles.bigIcon}>
                🧾
              </div>

              <h3>No Bills Found</h3>

              <p>
                Create your first patient bill from
                the form.
              </p>
            </div>
          ) : (
            <div>

              {bills.map((bill) => (
                <div
                  key={bill._id}
                  style={styles.billItem}
                >

                  <div style={styles.billLeft}>

                    <div style={styles.patientIcon}>
                      👤
                    </div>

                    <div>
                      <h3 style={styles.patientName}>
                        {bill.patientname}
                      </h3>

                      <p style={styles.billInfo}>
                        👨‍⚕️ Dr. {bill.doctorname}
                      </p>

                      <p style={styles.billInfo}>
                        🏥 {bill.treatementservice}
                      </p>

                    </div>

                  </div>

                  <div style={styles.billRight}>

                    <h3 style={styles.amount}>
                      ₹{bill.amount}
                    </h3>

                    <span style={styles.paid}>
                      PAID
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        deleteBill(bill._id)
                      }
                      style={styles.deleteButton}
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}


// =========================
// STYLES
// =========================

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f4f7fb",
    padding: "25px",
    fontFamily:
      "Arial, Helvetica, sans-serif",
    boxSizing: "border-box",
  },

  header: {
    background:
      "linear-gradient(135deg, #2563eb, #4f46e5)",
    color: "white",
    padding: "28px",
    borderRadius: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    boxShadow:
      "0 8px 25px rgba(37, 99, 235, 0.25)",
  },

  headerTitle: {
    margin: 0,
    fontSize: "30px",
  },

  headerText: {
    margin: "8px 0 0",
    opacity: 0.9,
  },

  headerIcon: {
    fontSize: "55px",
  },

  cards: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "25px",
  },

  card: {
    background: "white",
    borderRadius: "16px",
    padding: "22px",
    display: "flex",
    alignItems: "center",
    gap: "18px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.07)",
  },

  cardIcon: {
    fontSize: "38px",
    width: "65px",
    height: "65px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#eff6ff",
    borderRadius: "14px",
  },

  cardLabel: {
    margin: 0,
    color: "#6b7280",
    fontSize: "14px",
  },

  cardValue: {
    margin: "5px 0 0",
    fontSize: "26px",
    color: "#111827",
  },

  mainGrid: {
    display: "grid",
    gridTemplateColumns:
      "minmax(300px, 380px) 1fr",
    gap: "25px",
    alignItems: "start",
  },

  panel: {
    background: "white",
    padding: "25px",
    borderRadius: "18px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.07)",
  },

  panelTitle: {
    margin: 0,
    fontSize: "21px",
    color: "#111827",
  },

  description: {
    color: "#6b7280",
    fontSize: "14px",
    margin: "8px 0 20px",
  },

  label: {
    display: "block",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "7px",
    marginTop: "15px",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    padding: "12px 13px",
    border:
      "1px solid #d1d5db",
    borderRadius: "9px",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  submitButton: {
    width: "100%",
    marginTop: "23px",
    padding: "13px",
    border: "none",
    borderRadius: "9px",
    background: "#2563eb",
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  listHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "15px",
  },

  refreshButton: {
    border: "none",
    background: "#eff6ff",
    color: "#2563eb",
    padding: "9px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },

  billItem: {
    border: "1px solid #e5e7eb",
    borderRadius: "13px",
    padding: "16px",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
  },

  billLeft: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  patientIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#eff6ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
  },

  patientName: {
    margin: "0 0 6px",
    fontSize: "17px",
    color: "#111827",
  },

  billInfo: {
    margin: "4px 0",
    color: "#6b7280",
    fontSize: "13px",
  },

  billRight: {
    textAlign: "right",
    minWidth: "100px",
  },

  amount: {
    margin: "0 0 5px",
    color: "#16a34a",
    fontSize: "20px",
  },

  paid: {
    display: "inline-block",
    background: "#dcfce7",
    color: "#15803d",
    padding: "4px 8px",
    borderRadius: "5px",
    fontSize: "10px",
    fontWeight: "bold",
    marginBottom: "8px",
  },

  deleteButton: {
    display: "block",
    marginLeft: "auto",
    border: "none",
    background: "#fee2e2",
    color: "#dc2626",
    padding: "7px 10px",
    borderRadius: "7px",
    cursor: "pointer",
    fontSize: "12px",
  },

  emptyBox: {
    textAlign: "center",
    padding: "70px 20px",
    color: "#6b7280",
  },

  bigIcon: {
    fontSize: "55px",
    marginBottom: "10px",
  },
};

export default Billing;