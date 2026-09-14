import React from "react";

function Topbar() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "78px",
        background: "linear-gradient(135deg, #063970, #087f8c, #2563eb)",
        borderRadius: "18px",
        padding: "14px 22px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#fff",
        boxShadow: "0 8px 25px rgba(37, 99, 235, 0.20)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Circle */}
      <div
        style={{
          position: "absolute",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.07)",
          right: "-40px",
          top: "-70px",
        }}
      />

      {/* Left Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "15px",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "25px",
          }}
        >
          🏥
        </div>

        <div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "1.5px",
              opacity: 0.75,
            }}
          >
            MEDCARE HOSPITAL
          </div>

          <div
            style={{
              fontSize: "22px",
              fontWeight: "800",
              marginTop: "2px",
            }}
          >
            Hospital Management System
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* System Status */}
        <div
          style={{
            padding: "9px 14px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <div
            style={{
              fontSize: "9px",
              opacity: 0.7,
              letterSpacing: "1px",
            }}
          >
            SYSTEM STATUS
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              marginTop: "3px",
              fontSize: "12px",
              fontWeight: "700",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 8px #4ade80",
              }}
            />

            All Systems Active
          </div>
        </div>

        {/* Profile */}
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: "#fff",
            color: "#087f8c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "19px",
            fontWeight: "800",
          }}
        >
          A
        </div>
      </div>
    </div>
  );
}

export default Topbar;