import React, { useState } from "react";
import {
  FaBed,
  FaSearch,
  FaCheckCircle,
  FaUserInjured,
  FaHospital,
} from "react-icons/fa";

function Beds() {
  const [beds, setBeds] = useState([
    {
      id: 1,
      bedNo: "B-101",
      ward: "General Ward",
      type: "General",
      patient: "Rahul Kumar",
      status: "Occupied",
    },
    {
      id: 2,
      bedNo: "B-102",
      ward: "General Ward",
      type: "General",
      patient: "",
      status: "Available",
    },
    {
      id: 3,
      bedNo: "B-103",
      ward: "General Ward",
      type: "General",
      patient: "Rupali",
      status: "Occupied",
    },
    {
      id: 4,
      bedNo: "B-104",
      ward: "General Ward",
      type: "General",
      patient: "",
      status: "Available",
    },
    {
      id: 5,
      bedNo: "ICU-01",
      ward: "ICU",
      type: "ICU",
      patient: "Amit Sharma",
      status: "Occupied",
    },
    {
      id: 6,
      bedNo: "ICU-02",
      ward: "ICU",
      type: "ICU",
      patient: "",
      status: "Available",
    },
    {
      id: 7,
      bedNo: "ICU-03",
      ward: "ICU",
      type: "ICU",
      patient: "",
      status: "Reserved",
    },
    {
      id: 8,
      bedNo: "ICU-04",
      ward: "ICU",
      type: "ICU",
      patient: "Mahak",
      status: "Occupied",
    },
    {
      id: 9,
      bedNo: "P-101",
      ward: "Private Room",
      type: "Private",
      patient: "",
      status: "Available",
    },
    {
      id: 10,
      bedNo: "P-102",
      ward: "Private Room",
      type: "Private",
      patient: "Raman",
      status: "Occupied",
    },
    {
      id: 11,
      bedNo: "P-103",
      ward: "Private Room",
      type: "Private",
      patient: "",
      status: "Available",
    },
    {
      id: 12,
      bedNo: "P-104",
      ward: "Private Room",
      type: "Private",
      patient: "",
      status: "Reserved",
    },
  ]);

  const [search, setSearch] = useState("");

  const totalBeds = beds.length;

  const availableBeds = beds.filter(
    (bed) => bed.status === "Available"
  ).length;

  const occupiedBeds = beds.filter(
    (bed) => bed.status === "Occupied"
  ).length;

  const reservedBeds = beds.filter(
    (bed) => bed.status === "Reserved"
  ).length;

  const filteredBeds = beds.filter(
    (bed) =>
      bed.bedNo.toLowerCase().includes(search.toLowerCase()) ||
      bed.ward.toLowerCase().includes(search.toLowerCase()) ||
      bed.type.toLowerCase().includes(search.toLowerCase()) ||
      bed.patient.toLowerCase().includes(search.toLowerCase())
  );

  const changeStatus = (id, newStatus) => {
    setBeds(
      beds.map((bed) => {
        if (bed.id === id) {
          return {
            ...bed,
            status: newStatus,
            patient:
              newStatus === "Available" ? "" : bed.patient,
          };
        }

        return bed;
      })
    );
  };

  return (
    <div className="beds-page">

      {/* HEADER */}

      <div className="beds-header">

        <div>
          <h1>
            <FaBed /> Bed Management
          </h1>

          <p>
            Manage hospital beds, wards and patient occupancy
          </p>
        </div>

        <div className="hospital-status">
          <FaHospital />
          Hospital Bed Status
        </div>

      </div>

      {/* SUMMARY CARDS */}

      <div className="bed-summary">

        <div className="bed-card total">
          <div className="bed-icon">
            <FaBed />
          </div>

          <div>
            <h2>{totalBeds}</h2>
            <p>Total Beds</p>
          </div>
        </div>

        <div className="bed-card available">
          <div className="bed-icon">
            <FaCheckCircle />
          </div>

          <div>
            <h2>{availableBeds}</h2>
            <p>Available Beds</p>
          </div>
        </div>

        <div className="bed-card occupied">
          <div className="bed-icon">
            <FaUserInjured />
          </div>

          <div>
            <h2>{occupiedBeds}</h2>
            <p>Occupied Beds</p>
          </div>
        </div>

        <div className="bed-card reserved">
          <div className="bed-icon">
            <FaBed />
          </div>

          <div>
            <h2>{reservedBeds}</h2>
            <p>Reserved Beds</p>
          </div>
        </div>

      </div>

      {/* BED RECORDS */}

      <div className="beds-content">

        <div className="content-header">

          <div>
            <h2>Bed Records</h2>
            <p>
              Complete list of hospital beds
            </p>
          </div>

          <div className="search-box">

            <FaSearch />

            <input
              type="text"
              placeholder="Search bed, ward or patient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>

        {/* TABLE */}

        <div className="table-container">

          <table>

            <thead>

              <tr>
                <th>Bed No.</th>
                <th>Ward</th>
                <th>Bed Type</th>
                <th>Patient</th>
                <th>Status</th>
                <th>Change Status</th>
              </tr>

            </thead>

            <tbody>

              {filteredBeds.length > 0 ? (

                filteredBeds.map((bed) => (

                  <tr key={bed.id}>

                    <td>
                      <strong className="bed-number">
                        <FaBed />
                        {bed.bedNo}
                      </strong>
                    </td>

                    <td>{bed.ward}</td>

                    <td>
                      <span className="type-badge">
                        {bed.type}
                      </span>
                    </td>

                    <td>

                      {bed.patient ? (

                        <div className="patient">

                          <div className="patient-icon">
                            <FaUserInjured />
                          </div>

                          <span>{bed.patient}</span>

                        </div>

                      ) : (

                        <span className="no-patient">
                          No Patient
                        </span>

                      )}

                    </td>

                    <td>

                      <span
                        className={
                          bed.status === "Available"
                            ? "status available-status"
                            : bed.status === "Occupied"
                            ? "status occupied-status"
                            : "status reserved-status"
                        }
                      >
                        {bed.status}
                      </span>

                    </td>

                    <td>

                      <select
                        value={bed.status}
                        onChange={(e) =>
                          changeStatus(
                            bed.id,
                            e.target.value
                          )
                        }
                        className="status-select"
                      >

                        <option value="Available">
                          Available
                        </option>

                        <option value="Occupied">
                          Occupied
                        </option>

                        <option value="Reserved">
                          Reserved
                        </option>

                      </select>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan="6">

                    <div className="no-data">

                      <FaBed />

                      <h3>No Beds Found</h3>

                      <p>
                        Try searching with another bed or patient name.
                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* WARD OVERVIEW */}

      <div className="ward-section">

        <h2>Ward Overview</h2>

        <div className="ward-grid">

          <div className="ward-card">

            <div className="ward-icon">
              <FaBed />
            </div>

            <div>
              <h3>General Ward</h3>
              <p>4 Beds</p>
            </div>

            <strong>
              {beds.filter(
                (bed) => bed.ward === "General Ward"
              ).filter(
                (bed) => bed.status === "Available"
              ).length}{" "}
              Available
            </strong>

          </div>

          <div className="ward-card">

            <div className="ward-icon">
              <FaBed />
            </div>

            <div>
              <h3>ICU</h3>
              <p>4 Beds</p>
            </div>

            <strong>
              {beds.filter(
                (bed) => bed.ward === "ICU"
              ).filter(
                (bed) => bed.status === "Available"
              ).length}{" "}
              Available
            </strong>

          </div>

          <div className="ward-card">

            <div className="ward-icon">
              <FaBed />
            </div>

            <div>
              <h3>Private Room</h3>
              <p>4 Beds</p>
            </div>

            <strong>
              {beds.filter(
                (bed) => bed.ward === "Private Room"
              ).filter(
                (bed) => bed.status === "Available"
              ).length}{" "}
              Available
            </strong>

          </div>

        </div>

      </div>

      {/* CSS */}

      <style>{`

        .beds-page {
          min-height: 100vh;
          background: #f5f7fb;
          padding: 25px;
          font-family: Arial, sans-serif;
        }

        .beds-header {
          background: white;
          border-radius: 15px;
          padding: 23px 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 22px;
          box-shadow: 0 3px 15px rgba(0,0,0,0.06);
        }

        .beds-header h1 {
          margin: 0;
          color: #172033;
          font-size: 27px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .beds-header h1 svg {
          color: #1769e0;
        }

        .beds-header p {
          margin: 7px 0 0;
          color: #777;
          font-size: 14px;
        }

        .hospital-status {
          background: #eaf2ff;
          color: #1769e0;
          padding: 11px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .bed-summary {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 22px;
        }

        .bed-card {
          background: white;
          border-radius: 14px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 3px 15px rgba(0,0,0,0.05);
        }

        .bed-icon {
          width: 53px;
          height: 53px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }

        .total .bed-icon {
          background: #eaf2ff;
          color: #1769e0;
        }

        .available .bed-icon {
          background: #e7f8ee;
          color: #168447;
        }

        .occupied .bed-icon {
          background: #ffe9e9;
          color: #e33434;
        }

        .reserved .bed-icon {
          background: #fff3df;
          color: #e89400;
        }

        .bed-card h2 {
          margin: 0;
          color: #172033;
          font-size: 25px;
        }

        .bed-card p {
          margin: 4px 0 0;
          color: #777;
          font-size: 13px;
        }

        .beds-content {
          background: white;
          border-radius: 15px;
          padding: 22px;
          box-shadow: 0 3px 15px rgba(0,0,0,0.05);
        }

        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .content-header h2 {
          margin: 0;
          font-size: 21px;
          color: #172033;
        }

        .content-header p {
          margin: 5px 0 0;
          color: #777;
          font-size: 13px;
        }

        .search-box {
          width: 310px;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 10px 13px;
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .search-box svg {
          color: #888;
        }

        .search-box input {
          width: 100%;
          border: none;
          outline: none;
          font-size: 13px;
        }

        .table-container {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: #f5f7fb;
        }

        th {
          padding: 14px;
          text-align: left;
          color: #666;
          font-size: 12px;
          white-space: nowrap;
        }

        td {
          padding: 14px;
          border-bottom: 1px solid #eee;
          color: #444;
          font-size: 13px;
        }

        .bed-number {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #1769e0;
        }

        .type-badge {
          background: #f0f4fa;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 11px;
          color: #555;
        }

        .patient {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .patient-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #eaf2ff;
          color: #1769e0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .no-patient {
          color: #aaa;
        }

        .status {
          display: inline-block;
          padding: 6px 11px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }

        .available-status {
          background: #e7f8ee;
          color: #168447;
        }

        .occupied-status {
          background: #ffe9e9;
          color: #e33434;
        }

        .reserved-status {
          background: #fff3df;
          color: #e89400;
        }

        .status-select {
          border: 1px solid #ddd;
          border-radius: 7px;
          padding: 7px 9px;
          outline: none;
          cursor: pointer;
          font-size: 12px;
          background: white;
        }

        .no-data {
          text-align: center;
          padding: 45px;
          color: #888;
        }

        .no-data svg {
          font-size: 45px;
          color: #bbb;
        }

        .no-data h3 {
          color: #555;
          margin: 12px 0 5px;
        }

        .no-data p {
          margin: 0;
        }

        .ward-section {
          margin-top: 22px;
        }

        .ward-section h2 {
          color: #172033;
          font-size: 21px;
          margin-bottom: 15px;
        }

        .ward-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .ward-card {
          background: white;
          border-radius: 14px;
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 13px;
          box-shadow: 0 3px 15px rgba(0,0,0,0.05);
        }

        .ward-icon {
          width: 45px;
          height: 45px;
          background: #eaf2ff;
          color: #1769e0;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ward-card h3 {
          margin: 0;
          font-size: 15px;
          color: #172033;
        }

        .ward-card p {
          margin: 4px 0 0;
          color: #888;
          font-size: 12px;
        }

        .ward-card strong {
          margin-left: auto;
          color: #168447;
          font-size: 12px;
          white-space: nowrap;
        }

        @media (max-width: 1000px) {

          .bed-summary {
            grid-template-columns: repeat(2, 1fr);
          }

          .ward-grid {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 650px) {

          .beds-header,
          .content-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .bed-summary {
            grid-template-columns: 1fr;
          }

          .search-box {
            width: 100%;
          }

        }

      `}</style>

    </div>
  );
}

export default Beds;