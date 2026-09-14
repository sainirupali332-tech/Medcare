import React, { useState } from "react";

function Setting() {
  const [settings, setSettings] = useState({
    patients: true,
    doctors: true,
    appointments: true,
    beds: true,
    medicines: true,
    billing: true,
    departments: true,
    laboratory: true,
    notifications: true,
    appointmentReminder: true,
    lowStockAlert: true,
  });

  const changeSetting = (name) => {
    setSettings((oldSettings) => ({
      ...oldSettings,
      [name]: !oldSettings[name],
    }));
  };

  const modules = [
    ["patients", "🧑‍🤝‍🧑", "Patients", "Manage patient records"],
    ["doctors", "👨‍⚕️", "Doctors", "Manage doctors"],
    ["appointments", "📅", "Appointments", "Manage appointments"],
    ["beds", "🛏️", "Bed Management", "Manage hospital beds"],
    ["medicines", "💊", "Medicines", "Manage medicine stock"],
    ["billing", "💰", "Billing", "Manage patient bills"],
    ["departments", "🏥", "Departments", "Manage departments"],
    ["laboratory", "🧪", "Laboratory", "Manage laboratory tests"],
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "25px",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "linear-gradient(135deg, #087f8c, #2563eb)",
          color: "white",
          padding: "30px",
          borderRadius: "18px",
          marginBottom: "25px",
          boxShadow: "0 8px 25px rgba(37,99,235,0.18)",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            marginBottom: "8px",
            opacity: 0.85,
          }}
        >
          MEDCARE HOSPITAL
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "30px",
          }}
        >
          ⚙️ Settings
        </h1>

        <p
          style={{
            margin: "8px 0 0",
            fontSize: "14px",
            opacity: 0.9,
          }}
        >
          Manage your hospital modules and system preferences
        </p>
      </div>

      {/* STATUS CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "15px",
          marginBottom: "25px",
        }}
      >
        <div style={cardStyle}>
          <div style={numberStyle}>8</div>
          <div style={labelStyle}>Total Modules</div>
        </div>

        <div style={cardStyle}>
          <div style={numberStyle}>
            {Object.keys(settings)
              .slice(0, 8)
              .filter((key) => settings[key]).length}
          </div>
          <div style={labelStyle}>Active Modules</div>
        </div>

        <div style={cardStyle}>
          <div style={numberStyle}>
            {settings.notifications ? "ON" : "OFF"}
          </div>
          <div style={labelStyle}>Notifications</div>
        </div>

        <div style={cardStyle}>
          <div style={numberStyle}>✓</div>
          <div style={labelStyle}>System Status</div>
        </div>
      </div>

      {/* HOSPITAL MODULES */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>🏥 Hospital Modules</h2>

        <p style={descriptionStyle}>
          Enable or disable different modules of your hospital management
          system.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          {modules.map((module) => {
            const key = module[0];
            const icon = module[1];
            const title = module[2];
            const description = module[3];

            return (
              <div
                key={key}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "15px",
                  padding: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "13px",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "13px",
                      background: "#eef5ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                    }}
                  >
                    {icon}
                  </div>

                  <div>
                    <div
                      style={{
                        fontWeight: "700",
                        color: "#1f2937",
                        fontSize: "15px",
                      }}
                    >
                      {title}
                    </div>

                    <div
                      style={{
                        color: "#6b7280",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {description}
                    </div>

                    <div
                      style={{
                        marginTop: "7px",
                        color: settings[key] ? "#15803d" : "#6b7280",
                        fontSize: "11px",
                        fontWeight: "700",
                      }}
                    >
                      {settings[key] ? "● ENABLED" : "● DISABLED"}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => changeSetting(key)}
                  style={{
                    width: "54px",
                    height: "28px",
                    border: "none",
                    borderRadius: "20px",
                    background: settings[key] ? "#16a34a" : "#cbd5e1",
                    position: "relative",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: "#ffffff",
                      top: "3px",
                      left: settings[key] ? "29px" : "3px",
                      transition: "0.2s",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                    }}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* NOTIFICATIONS */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>🔔 Notifications</h2>

        <p style={descriptionStyle}>
          Control important alerts and reminders.
        </p>

        <div style={{ marginTop: "20px" }}>
          <Notification
            title="General Notifications"
            text="Receive hospital system notifications"
            icon="🔔"
            value={settings.notifications}
            onClick={() => changeSetting("notifications")}
          />

          <Notification
            title="Appointment Reminder"
            text="Get reminders for upcoming appointments"
            icon="📅"
            value={settings.appointmentReminder}
            onClick={() => changeSetting("appointmentReminder")}
          />

          <Notification
            title="Low Stock Alert"
            text="Get alerts when medicine stock is low"
            icon="💊"
            value={settings.lowStockAlert}
            onClick={() => changeSetting("lowStockAlert")}
          />
        </div>
      </div>

      {/* SECURITY */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>🔐 Security</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "15px",
            marginTop: "18px",
          }}
        >
          <div style={securityCard}>
            <div style={{ fontSize: "26px" }}>🔒</div>
            <strong>Secure Login</strong>
            <p>Admin login protection enabled.</p>
          </div>

          <div style={securityCard}>
            <div style={{ fontSize: "26px" }}>🛡️</div>
            <strong>Data Protection</strong>
            <p>Hospital data is protected.</p>
          </div>

          <div style={securityCard}>
            <div style={{ fontSize: "26px" }}>🗄️</div>
            <strong>Database</strong>
            <p>MongoDB database is connected.</p>
          </div>
        </div>
      </div>

      {/* SAVE */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
          boxShadow: "0 5px 18px rgba(0,0,0,0.06)",
        }}
      >
        <div>
          <strong style={{ color: "#1f2937" }}>
            Settings are ready
          </strong>

          <div
            style={{
              color: "#6b7280",
              fontSize: "13px",
              marginTop: "4px",
            }}
          >
            Save your selected hospital preferences.
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert("Settings saved successfully!")}
          style={{
            border: "none",
            background: "#2563eb",
            color: "white",
            padding: "13px 25px",
            borderRadius: "9px",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "14px",
          }}
        >
          💾 Save Settings
        </button>
      </div>
    </div>
  );
}

function Notification({ title, text, icon, value, onClick }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "17px",
        border: "1px solid #e5e7eb",
        borderRadius: "13px",
        marginBottom: "12px",
        gap: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "13px",
        }}
      >
        <div
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "12px",
            background: "#eef5ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "21px",
          }}
        >
          {icon}
        </div>

        <div>
          <strong style={{ color: "#1f2937" }}>{title}</strong>

          <div
            style={{
              color: "#6b7280",
              fontSize: "12px",
              marginTop: "4px",
            }}
          >
            {text}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onClick}
        style={{
          width: "54px",
          height: "28px",
          border: "none",
          borderRadius: "20px",
          background: value ? "#16a34a" : "#cbd5e1",
          position: "relative",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            background: "#ffffff",
            top: "3px",
            left: value ? "29px" : "3px",
            transition: "0.2s",
          }}
        />
      </button>
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  borderRadius: "15px",
  padding: "18px",
  boxShadow: "0 5px 18px rgba(0,0,0,0.06)",
  borderLeft: "4px solid #2563eb",
};

const numberStyle = {
  fontSize: "23px",
  fontWeight: "800",
  color: "#1f2937",
};

const labelStyle = {
  fontSize: "12px",
  color: "#6b7280",
  marginTop: "4px",
};

const sectionStyle = {
  background: "#ffffff",
  borderRadius: "18px",
  padding: "25px",
  marginBottom: "25px",
  boxShadow: "0 5px 18px rgba(0,0,0,0.06)",
};

const headingStyle = {
  margin: 0,
  color: "#1f2937",
  fontSize: "21px",
};

const descriptionStyle = {
  color: "#6b7280",
  fontSize: "13px",
  marginTop: "6px",
};

const securityCard = {
  border: "1px solid #e5e7eb",
  borderRadius: "13px",
  padding: "18px",
  background: "#fafafa",
};

export default Setting;