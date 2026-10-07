import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Login from "./Login";

import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointment from "./pages/Appointment";
import Billing from "./pages/Billing";
import Medicines from "./pages/Medicines";
import Beds from "./pages/Beds";
import Laboratory from "./pages/Laboratory";
import Department from "./pages/Department";
import Setting from "./pages/Setting";

function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f7fb",
      }}
    >
      <Sidebar />

      <main
        style={{
          marginLeft: "240px",
          minHeight: "100vh",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        {/* PATIENTS */}
        <Route
          path="/patients"
          element={
            <Layout>
              <Patients />
            </Layout>
          }
        />

        {/* DOCTORS */}
        <Route
          path="/doctors"
          element={
            <Layout>
              <Doctors />
            </Layout>
          }
        />

        {/* APPOINTMENTS */}
        <Route
          path="/appointments"
          element={
            <Layout>
              <Appointment />
            </Layout>
          }
        />

        {/* MEDICINES */}
        <Route
          path="/medicines"
          element={
            <Layout>
              <Medicines />
            </Layout>
          }
        />

        {/* BILLING */}
        <Route
          path="/billing"
          element={
            <Layout>
              <Billing />
            </Layout>
          }
        />

        {/* DEPARTMENTS */}
        <Route
          path="/departments"
          element={
            <Layout>
              <Department />
            </Layout>
          }
        />

        {/* BEDS */}
        <Route
          path="/beds"
          element={
            <Layout>
              <Beds />
            </Layout>
          }
        />

        {/* LABORATORY */}
        <Route
          path="/laboratory"
          element={
            <Layout>
              <Laboratory />
            </Layout>
          }
        />

        {/* SETTINGS */}
        <Route
          path="/settings"
          element={
            <Layout>
              <Setting />
            </Layout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;