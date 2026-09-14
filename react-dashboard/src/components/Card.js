import React from "react";
const Card = ({ title, value, text, bgColor }) => {
  return (
    <div className="col-md-3 mb-4">
      <div
        className="card border-0 shadow-sm h-100"
        style={{
          backgroundColor: bgColor,
          color: "white",
          borderRadius: "15px",
        }}
      >
        <div className="card-body p-4">
          <h5 className="mb-3">{title}</h5>
          <h2 className="fw-bold mb-2">{value}</h2>
          <p className="mb-0">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
