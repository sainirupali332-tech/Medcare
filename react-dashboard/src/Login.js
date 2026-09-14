import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/login",
        user
      );
		console.log(response);
      if (response.data.success) {
        // Store JWT Token
        localStorage.setItem("token", response.data.token);
        // Store Login Status
        localStorage.setItem("isLoggedIn", "true");
        // Store User Information
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        alert(response.data.message);

        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server not responding.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={handleLogin}>

          <div className="mb-3">
            <label>Email</label>

            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>

            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Please Wait..." : "Login"}
          </button>

        </form>
		<div className="text-center mt-3">
  Don't have an account?{" "}
  <Link to="/register">
    Register
  </Link>
</div>
      </div>
	  
    </div>
  );
}

export default Login;