import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Password and Confirm Password do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/register",
        {
          name: user.name,
          email: user.email,
          password: user.password,
        }
      );

      if (response.data.success) {
        alert(response.data.message);

        setUser({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Unable to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow p-4" style={{ width: "450px" }}>
        <h2 className="text-center mb-4">
          Create Account
        </h2>

        <form onSubmit={handleRegister}>

          <div className="mb-3">
            <label className="form-label">
              Full Name
            </label>

            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter Full Name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Email Address
            </label>

            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter Email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter Password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Confirm Password
            </label>

            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={user.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <div className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/">
              Login
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Register;