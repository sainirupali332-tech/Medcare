import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserInjured,
  FaUserMd,
  FaCalendarCheck,
  FaPills,
  FaFileInvoiceDollar,
  FaBuilding,
  FaFlask,
  FaBed,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  const menuItems = [
    {
      path: "/dashboard",
      icon: <FaTachometerAlt />,
      emoji: "🏠",
      name: "Dashboard",
      color: "#1677ff",
      bg: "#eaf2ff",
    },
    {
      path: "/patients",
      icon: <FaUserInjured />,
      emoji: "🧑‍🤝‍🧑",
      name: "Patients",
      color: "#e74c3c",
      bg: "#fff0ee",
    },
    {
      path: "/doctors",
      icon: <FaUserMd />,
      emoji: "👨‍⚕️",
      name: "Doctors",
      color: "#16a085",
      bg: "#e8f8f5",
    },
    {
      path: "/appointments",
      icon: <FaCalendarCheck />,
      emoji: "📅",
      name: "Appointments",
      color: "#f39c12",
      bg: "#fff5e5",
    },
    {
      path: "/medicines",
      icon: <FaPills />,
      emoji: "💊",
      name: "Medicines",
      color: "#8e44ad",
      bg: "#f5eafa",
    },
    {
      path: "/billing",
      icon: <FaFileInvoiceDollar />,
      emoji: "💰",
      name: "Billing",
      color: "#27ae60",
      bg: "#eaf8ef",
    },
    {
      path: "/departments",
      icon: <FaBuilding />,
      emoji: "🏥",
      name: "Departments",
      color: "#2980b9",
      bg: "#eaf4fb",
    },
    {
      path: "/laboratory",
      icon: <FaFlask />,
      emoji: "🧪",
      name: "Laboratory",
      color: "#d35400",
      bg: "#fff0e6",
    },
    {
      path: "/beds",
      icon: <FaBed />,
      emoji: "🛏️",
      name: "Bed Management",
      color: "#c0392b",
      bg: "#fcebea",
    },
    {
      path: "/settings",
      icon: <FaCog />,
      emoji: "⚙️",
      name: "Settings",
      color: "#8e44ad",
      bg: "#f4ecf7",
    },
  ];

  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          🏥
        </div>

        <div>
          <h2>MedCare</h2>
          <span>Hospital Management</span>
        </div>
      </div>

      {/* MENU TITLE */}
      <div className="menu-title">
        MAIN MENU
      </div>

      {/* MENU */}
      <nav className="sidebar-menu">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "menu-item active"
                : "menu-item"
            }
            style={({ isActive }) => ({
              "--item-color": item.color,
              "--item-bg": item.bg,
              "--active-color": item.color,
            })}
          >
            <span className="menu-emoji">
              {item.emoji}
            </span>

            <span className="menu-icon">
              {item.icon}
            </span>

            <span className="menu-name">
              {item.name}
            </span>

            <span className="menu-arrow">
              ›
            </span>
          </NavLink>
        ))}

      </nav>

      {/* FOOTER */}
      <div className="sidebar-footer">

        <div className="footer-logo">
          ❤️
        </div>

        <div>
          <strong>MedCare Hospital</strong>
          <small>Healthcare System</small>
        </div>

      </div>

      <style>{`

        * {
          box-sizing: border-box;
        }

        .sidebar {
          width: 255px;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          background: #ffffff;
          border-right: 1px solid #e8ebf2;
          display: flex;
          flex-direction: column;
          z-index: 1000;
          font-family: Arial, sans-serif;
          box-shadow: 4px 0 15px rgba(0,0,0,0.03);
        }

        /* LOGO */

        .sidebar-logo {
          height: 88px;
          padding: 0 19px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid #edf0f5;
        }

        .logo-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: linear-gradient(
            135deg,
            #1677ff,
            #5a9cff
          );
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;
          box-shadow: 0 7px 15px rgba(22,119,255,.22);
        }

        .sidebar-logo h2 {
          margin: 0;
          font-size: 21px;
          font-weight: 700;
          color: #172033;
        }

        .sidebar-logo span {
          display: block;
          margin-top: 3px;
          font-size: 10px;
          color: #8992a5;
        }

        /* MENU TITLE */

        .menu-title {
          padding: 20px 20px 10px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.2px;
          color: #a0a7b5;
        }

        .sidebar-menu {
          padding: 0 12px;
          overflow-y: auto;
        }

        /* MENU ITEM */

        .menu-item {
          height: 48px;
          margin-bottom: 6px;
          padding: 0 12px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #5f6879;
          position: relative;
          transition: all .2s ease;
        }

        /* EMOJI */

        .menu-emoji {
          width: 25px;
          font-size: 19px;
          text-align: center;
          transition: transform .2s ease;
        }

        /* ICON */

        .menu-icon {
          width: 27px;
          height: 27px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--item-bg);
          color: var(--item-color);
          font-size: 13px;
          transition: all .2s ease;
        }

        .menu-name {
          font-size: 13px;
          font-weight: 600;
          flex: 1;
        }

        .menu-arrow {
          font-size: 20px;
          color: #b7becb;
          transition: .2s;
        }

        /* HOVER */

        .menu-item:hover {
          background: var(--item-bg);
          color: var(--item-color);
          transform: translateX(3px);
        }

        .menu-item:hover .menu-emoji {
          transform: scale(1.15);
        }

        .menu-item:hover .menu-arrow {
          color: var(--item-color);
          transform: translateX(3px);
        }

        /* ACTIVE */

        .menu-item.active {
          background: var(--item-color);
          color: white;
          box-shadow:
            0 6px 14px rgba(0,0,0,.10);
        }

        .menu-item.active .menu-icon {
          background: rgba(255,255,255,.20);
          color: white;
        }

        .menu-item.active .menu-arrow {
          color: white;
        }

        .menu-item.active .menu-emoji {
          transform: scale(1.1);
        }

        /* FOOTER */

        .sidebar-footer {
          margin: auto 12px 15px;
          padding: 13px;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            #f4f8ff,
            #eef5ff
          );
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid #e4edfc;
        }

        .footer-logo {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 19px;
          box-shadow: 0 3px 8px rgba(0,0,0,.05);
        }

        .sidebar-footer strong {
          display: block;
          font-size: 11px;
          color: #172033;
        }

        .sidebar-footer small {
          display: block;
          margin-top: 3px;
          font-size: 9px;
          color: #8992a5;
        }

        /* SCROLLBAR */

        .sidebar-menu::-webkit-scrollbar {
          width: 4px;
        }

        .sidebar-menu::-webkit-scrollbar-thumb {
          background: #dce1e9;
          border-radius: 10px;
        }

        /* MOBILE */

        @media (max-width: 800px) {

          .sidebar {
            width: 220px;
          }

          .menu-name {
            font-size: 12px;
          }

          .menu-emoji {
            font-size: 17px;
          }
        }

      `}</style>

    </aside>
  );
}

export default Sidebar;