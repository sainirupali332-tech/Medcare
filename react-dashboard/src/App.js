import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

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

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        {/* Patients */}
        <Route
          path="/patients"
          element={
            <Layout>
              <Patients />
            </Layout>
          }
        />

        {/* Doctors */}
        <Route
          path="/doctors"
          element={
            <Layout>
              <Doctors />
            </Layout>
          }
        />

        {/* Appointments */}
        <Route
          path="/appointments"
          element={
            <Layout>
              <Appointment />
            </Layout>
          }
        />

        {/* Medicines */}
        <Route
          path="/medicines"
          element={
            <Layout>
              <Medicines />
            </Layout>
          }
        />

        {/* Beds */}
        <Route
          path="/beds"
          element={
            <Layout>
              <Beds />
            </Layout>
          }
        />

        {/* Billing */}
        <Route
          path="/billing"
          element={
            <Layout>
              <Billing />
            </Layout>
          }
        />

        {/* Departments */}
        <Route
          path="/department"
          element={
            <Layout>
              <Department />
            </Layout>
          }
        />

        {/* Laboratory */}
        <Route
          path="/laboratory"
          element={
            <Layout>
              <Laboratory />
            </Layout>
          }
        />

        {/* Settings */}
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