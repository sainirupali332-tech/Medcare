import React, { useEffect, useState } from "react";
import axios from "axios";

function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    category: "",
    price: "",
    stock: "",
    expiryDate: "",
  });

  // GET MEDICINES
  const fetchMedicines = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/medicines"
      );

      if (Array.isArray(response.data)) {
        setMedicines(response.data);
      } else {
        setMedicines([]);
      }
    } catch (error) {
      console.log("GET ERROR:", error);
      setMedicines([]);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.company ||
      !formData.category ||
      !formData.price ||
      !formData.stock ||
      !formData.expiryDate
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/Medicines",
        {
          name: formData.name,
          company: formData.company,
          category: formData.category,
          price: Number(formData.price),
          stock: Number(formData.stock),
          expiryDate: formData.expiryDate,
        }
      );

      alert("Medicine added successfully");

      setFormData({
        name: "",
        company: "",
        category: "",
        price: "",
        stock: "",
        expiryDate: "",
      });

      fetchMedicines();
    } catch (error) {
      console.log("POST ERROR:", error);
      alert("Medicine not added");
    }
  };

  // DELETE
  const deleteMedicine = async (id) => {
    if (!window.confirm("Delete this medicine?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/medicines/${id}`
      );

      fetchMedicines();
    } catch (error) {
      console.log("DELETE ERROR:", error);
    }
  };

  // SEARCH
  const filteredMedicines = medicines.filter((medicine) => {
    const text = search.toLowerCase();

    return (
      String(medicine?.name || "")
        .toLowerCase()
        .includes(text) ||
      String(medicine?.company || "")
        .toLowerCase()
        .includes(text) ||
      String(medicine?.category || "")
        .toLowerCase()
        .includes(text)
    );
  });

  // TOTAL STOCK
  const totalStock = medicines.reduce(
    (total, medicine) =>
      total + Number(medicine?.stock || 0),
    0
  );

  // LOW STOCK
  const lowStock = medicines.filter(
    (medicine) =>
      Number(medicine?.stock || 0) > 0 &&
      Number(medicine?.stock || 0) <= 10
  ).length;

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>

        <div>
          <div style={styles.badge}>
            🏥 PHARMACY
          </div>

          <h1 style={styles.title}>
            Medicine Management
          </h1>

          <p style={styles.subtitle}>
            Manage hospital medicines and pharmacy inventory
          </p>
        </div>

        <div style={styles.searchBox}>
          🔍
          <input
            type="text"
            placeholder="Search medicine..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={styles.searchInput}
          />
        </div>

      </div>

      {/* STATS */}
      <div style={styles.stats}>

        <div style={styles.statCard}>
          <div style={styles.iconBlue}>
            💊
          </div>

          <div>
            <p style={styles.statTitle}>
              Total Medicines
            </p>

            <h2 style={styles.statNumber}>
              {medicines.length}
            </h2>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.iconGreen}>
            📦
          </div>

          <div>
            <p style={styles.statTitle}>
              Total Stock
            </p>

            <h2 style={styles.statNumber}>
              {totalStock}
            </h2>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.iconOrange}>
            ⚠️
          </div>

          <div>
            <p style={styles.statTitle}>
              Low Stock
            </p>

            <h2 style={styles.statNumber}>
              {lowStock}
            </h2>
          </div>
        </div>

      </div>

      {/* MAIN */}
      <div style={styles.main}>

        {/* ADD MEDICINE */}
        <div style={styles.formCard}>

          <div style={styles.formHeader}>
            <div style={styles.addIcon}>
              +
            </div>

            <div>
              <h2 style={styles.formTitle}>
                Add Medicine
              </h2>

              <p style={styles.formSub}>
                Enter medicine information
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <label style={styles.label}>
              Medicine Name
            </label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter medicine name"
              style={styles.input}
            />

            <label style={styles.label}>
              Company
            </label>

            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company"
              style={styles.input}
            />

            <label style={styles.label}>
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">
                Select Category
              </option>
              <option value="Tablet">
                Tablet
              </option>
              <option value="Capsule">
                Capsule
              </option>
              <option value="Syrup">
                Syrup
              </option>
              <option value="Injection">
                Injection
              </option>
              <option value="Cream">
                Cream
              </option>
              <option value="Other">
                Other
              </option>
            </select>

            <div style={styles.row}>

              <div style={{ flex: 1 }}>
                <label style={styles.label}>
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="₹ Price"
                  style={styles.input}
                />
              </div>

              <div style={{ flex: 1 }}>
                <label style={styles.label}>
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Quantity"
                  style={styles.input}
                />
              </div>

            </div>

            <label style={styles.label}>
              Expiry Date
            </label>

            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              style={styles.input}
            />

            <button
              type="submit"
              style={styles.addButton}
            >
              + Add Medicine
            </button>

          </form>
        </div>

        {/* MEDICINE LIST */}
        <div style={styles.listCard}>

          <div style={styles.listHeader}>

            <div>
              <span style={styles.smallTitle}>
                INVENTORY
              </span>

              <h2 style={styles.listTitle}>
                💊 Medicine Collection
              </h2>
            </div>

            <span style={styles.count}>
              {filteredMedicines.length} Items
            </span>

          </div>

          {filteredMedicines.length === 0 ? (

            <div style={styles.empty}>
              <div style={styles.emptyIcon}>
                💊
              </div>

              <h3>
                No medicines found
              </h3>

              <p>
                Add a medicine to your pharmacy inventory.
              </p>
            </div>

          ) : (

            <div style={styles.grid}>

              {filteredMedicines.map((medicine) => {

                const stock = Number(
                  medicine?.stock || 0
                );

                let stockText = "Available";
                let stockColor = "#16a34a";
                let stockBg = "#dcfce7";

                if (stock === 0) {
                  stockText = "Not Available";
                  stockColor = "#dc2626";
                  stockBg = "#fee2e2";
                } else if (stock <= 10) {
                  stockText = "Low Stock";
                  stockColor = "#d97706";
                  stockBg = "#fef3c7";
                }

                return (
                  <div
                    key={medicine?._id}
                    style={styles.medicineCard}
                  >

                    <div style={styles.cardTop}>

                      <div style={styles.medicineIcon}>
                        💊
                      </div>

                      <span
                        style={{
                          ...styles.stockBadge,
                          color: stockColor,
                          background: stockBg,
                        }}
                      >
                        {stockText}
                      </span>

                    </div>

                    <h3 style={styles.medicineName}>
                      {medicine?.name || "Medicine"}
                    </h3>

                    <p style={styles.company}>
                      {medicine?.company || "Unknown Company"}
                    </p>

                    <span style={styles.category}>
                      {medicine?.category || "Other"}
                    </span>

                    <div style={styles.info}>

                      <div>
                        <small>
                          PRICE
                        </small>

                        <strong>
                          ₹{medicine?.price || 0}
                        </strong>
                      </div>

                      <div>
                        <small>
                          STOCK
                        </small>

                        <strong>
                          {stock}
                        </strong>
                      </div>

                    </div>

                    <div style={styles.expiry}>
                      📅

                      <span>
                        Expiry:{" "}
                        {medicine?.expiryDate
                          ? new Date(
                              medicine.expiryDate
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "N/A"}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        deleteMedicine(
                          medicine?._id
                        )
                      }
                      style={styles.deleteButton}
                    >
                      🗑 Delete Medicine
                    </button>

                  </div>
                );
              })}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f7fb",
    padding: "25px",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    background:
      "linear-gradient(135deg,#111827,#1d4ed8)",
    borderRadius: "24px",
    padding: "30px",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "22px",
  },

  badge: {
    display: "inline-block",
    padding: "6px 11px",
    borderRadius: "20px",
    background: "rgba(255,255,255,.15)",
    fontSize: "10px",
    letterSpacing: "1px",
  },

  title: {
    margin: "10px 0 5px",
    fontSize: "30px",
  },

  subtitle: {
    margin: 0,
    opacity: 0.8,
    fontSize: "13px",
  },

  searchBox: {
    background: "white",
    borderRadius: "13px",
    padding: "12px 15px",
    width: "290px",
    color: "#64748b",
  },

  searchInput: {
    border: "none",
    outline: "none",
    marginLeft: "8px",
    width: "85%",
    fontSize: "13px",
  },

  stats: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3,1fr)",
    gap: "17px",
    marginBottom: "22px",
  },

  statCard: {
    background: "white",
    borderRadius: "18px",
    padding: "18px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    boxShadow:
      "0 5px 20px rgba(15,23,42,.06)",
  },

  iconBlue: {
    width: "50px",
    height: "50px",
    borderRadius: "14px",
    background: "#dbeafe",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
  },

  iconGreen: {
    width: "50px",
    height: "50px",
    borderRadius: "14px",
    background: "#dcfce7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
  },

  iconOrange: {
    width: "50px",
    height: "50px",
    borderRadius: "14px",
    background: "#fef3c7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
  },

  statTitle: {
    margin: 0,
    fontSize: "12px",
    color: "#64748b",
  },

  statNumber: {
    margin: "4px 0 0",
    fontSize: "25px",
    color: "#111827",
  },

  main: {
    display: "grid",
    gridTemplateColumns: "315px 1fr",
    gap: "22px",
    alignItems: "start",
  },

  formCard: {
    background: "white",
    borderRadius: "22px",
    padding: "23px",
    boxShadow:
      "0 5px 20px rgba(15,23,42,.06)",
  },

  formHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
  },

  addIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "13px",
    background: "#dbeafe",
    color: "#2563eb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "26px",
    fontWeight: "bold",
  },

  formTitle: {
    margin: 0,
    fontSize: "19px",
  },

  formSub: {
    margin: "3px 0 0",
    color: "#94a3b8",
    fontSize: "11px",
  },

  label: {
    display: "block",
    margin: "12px 0 6px",
    fontSize: "11px",
    fontWeight: "bold",
    color: "#475569",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #e2e8f0",
    borderRadius: "9px",
    padding: "10px",
    outline: "none",
    background: "#f8fafc",
  },

  row: {
    display: "flex",
    gap: "9px",
  },

  addButton: {
    width: "100%",
    border: "none",
    borderRadius: "10px",
    padding: "12px",
    marginTop: "18px",
    background:
      "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  listCard: {
    background: "white",
    borderRadius: "22px",
    padding: "24px",
    minHeight: "500px",
    boxShadow:
      "0 5px 20px rgba(15,23,42,.06)",
  },

  listHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  smallTitle: {
    color: "#2563eb",
    fontSize: "10px",
    letterSpacing: "2px",
    fontWeight: "bold",
  },

  listTitle: {
    margin: "5px 0 0",
    fontSize: "21px",
  },

  count: {
    background: "#eff6ff",
    color: "#2563eb",
    padding: "8px 12px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "bold",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(235px,1fr))",
    gap: "15px",
  },

  medicineCard: {
    border: "1px solid #e8edf4",
    borderRadius: "17px",
    padding: "17px",
    background:
      "linear-gradient(180deg,#fff,#f8fbff)",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  medicineIcon: {
    width: "45px",
    height: "45px",
    borderRadius: "13px",
    background: "#eff6ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
  },

  stockBadge: {
    padding: "6px 9px",
    borderRadius: "20px",
    fontSize: "9px",
    fontWeight: "bold",
  },

  medicineName: {
    margin: "14px 0 3px",
    fontSize: "17px",
    color: "#111827",
  },

  company: {
    margin: 0,
    fontSize: "11px",
    color: "#64748b",
  },

  category: {
    display: "inline-block",
    marginTop: "9px",
    padding: "5px 8px",
    borderRadius: "6px",
    background: "#f1f5f9",
    color: "#475569",
    fontSize: "9px",
  },

  info: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    borderTop: "1px solid #edf2f7",
    marginTop: "15px",
    paddingTop: "13px",
  },

  info: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    borderTop: "1px solid #edf2f7",
    marginTop: "15px",
    paddingTop: "13px",
  },

  expiry: {
    marginTop: "13px",
    padding: "9px",
    background: "#f8fafc",
    borderRadius: "8px",
    display: "flex",
    gap: "6px",
    fontSize: "10px",
    color: "#64748b",
  },

  deleteButton: {
    width: "100%",
    marginTop: "11px",
    padding: "9px",
    border: "none",
    borderRadius: "8px",
    background: "#fff1f2",
    color: "#dc2626",
    cursor: "pointer",
    fontSize: "10px",
    fontWeight: "bold",
  },

  empty: {
    textAlign: "center",
    padding: "80px 20px",
    color: "#64748b",
  },

  emptyIcon: {
    fontSize: "55px",
    marginBottom: "10px",
  },
};

export default Medicines;