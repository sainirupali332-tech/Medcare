import React, { useState } from "react";

function Login() {
  const [isSignup, setIsSignup] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================
  // CREATE NEW USER
  // =========================
  const handleSignup = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanUsername) {
      setError("Please enter username.");
      return;
    }

    if (!cleanEmail) {
      setError("Please enter email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Get existing users
    let users = [];

    try {
      users = JSON.parse(localStorage.getItem("medcareUsers")) || [];
    } catch {
      users = [];
    }

    // Convert old single-user account if it exists
    const oldUser = localStorage.getItem("medcareUser");

    if (oldUser) {
      try {
        const oldAccount = JSON.parse(oldUser);

        if (
          oldAccount &&
          oldAccount.email &&
          !users.some(
            (u) =>
              u.email &&
              u.email.toLowerCase() === oldAccount.email.toLowerCase()
          )
        ) {
          users.push(oldAccount);
        }
      } catch {
        // ignore old invalid data
      }
    }

    // Check duplicate email
    const emailExists = users.some(
      (user) =>
        user.email &&
        user.email.toLowerCase() === cleanEmail
    );

    if (emailExists) {
      setError("This email is already registered.");
      return;
    }

    // Check duplicate username
    const usernameExists = users.some(
      (user) =>
        user.username &&
        user.username.toLowerCase() ===
          cleanUsername.toLowerCase()
    );

    if (usernameExists) {
      setError("This username is already registered.");
      return;
    }

    // New account
    const newUser = {
      username: cleanUsername,
      email: cleanEmail,
      password: password,
    };

    users.push(newUser);

    // Save all users
    localStorage.setItem("medcareUsers", JSON.stringify(users));

    // Also keep latest account
    localStorage.setItem(
      "medcareUser",
      JSON.stringify(newUser)
    );

    // Clear signup form
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    // Put created email in login
    setLoginId(cleanEmail);
    setLoginPassword("");

    setSuccess(
      "Account created successfully. Now login with your new account."
    );

    setTimeout(() => {
      setIsSignup(false);
      setSuccess("");
    }, 1000);
  };

  // =========================
  // LOGIN
  // =========================
  const handleLogin = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const enteredId = loginId.trim().toLowerCase();
    const enteredPassword = loginPassword;

    let users = [];

    try {
      users = JSON.parse(localStorage.getItem("medcareUsers")) || [];
    } catch {
      users = [];
    }

    // Also check old saved user
    const oldUser = localStorage.getItem("medcareUser");

    if (oldUser) {
      try {
        const oldAccount = JSON.parse(oldUser);

        if (
          oldAccount &&
          oldAccount.email &&
          !users.some(
            (u) =>
              u.email &&
              u.email.toLowerCase() ===
                oldAccount.email.toLowerCase()
          )
        ) {
          users.push(oldAccount);
        }
      } catch {
        // ignore
      }
    }

    // Find user by username OR email
    const foundUser = users.find((user) => {
      const userEmail =
        user.email?.toLowerCase() || "";

      const userName =
        user.username?.toLowerCase() || "";

      return (
        (enteredId === userEmail ||
          enteredId === userName) &&
        enteredPassword === user.password
      );
    });

    if (foundUser) {
      // Login successful
      localStorage.setItem("isLoggedIn", "true");

      localStorage.setItem(
        "loggedInUser",
        foundUser.username
      );

      localStorage.setItem(
        "loggedInEmail",
        foundUser.email
      );

      // DIRECT ACTUAL DASHBOARD
      window.location.href = "/dashboard";
    } else {
      setError(
        "Invalid username/email or password."
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #e8f4ff, #f7fbff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "400px",
          maxWidth: "100%",
          background: "#fff",
          padding: "40px",
          borderRadius: "18px",
          boxShadow:
            "0 10px 35px rgba(0,0,0,0.12)",
          boxSizing: "border-box",
        }}
      >
        {/* LOGO */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              margin: "0 auto 12px",
              borderRadius: "50%",
              background: "#1976d2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}
          >
            🏥
          </div>

          <h1
            style={{
              margin: 0,
              color: "#123b63",
              fontSize: "29px",
            }}
          >
            MedCare
          </h1>

          <p
            style={{
              color: "#777",
              marginTop: "8px",
            }}
          >
            Hospital Management System
          </p>
        </div>

        {/* TITLE */}
        <h2
          style={{
            textAlign: "center",
            color: "#333",
            marginBottom: "22px",
          }}
        >
          {isSignup
            ? "Create New User"
            : "Login"}
        </h2>

        {/* ERROR */}
        {error && (
          <div
            style={{
              background: "#ffecec",
              color: "#d32f2f",
              padding: "11px",
              borderRadius: "8px",
              marginBottom: "16px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div
            style={{
              background: "#e8f5e9",
              color: "#2e7d32",
              padding: "11px",
              borderRadius: "8px",
              marginBottom: "16px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {success}
          </div>
        )}

        {/* =========================
            SIGNUP
        ========================= */}
        {isSignup ? (
          <form onSubmit={handleSignup}>

            <label style={labelStyle}>
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              required
              style={inputStyle}
            />

            <label style={labelStyle}>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              required
              style={inputStyle}
            />

            <label style={labelStyle}>
              Password
            </label>

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
              style={inputStyle}
            />

            <label style={labelStyle}>
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              required
              style={inputStyle}
            />

            <button
              type="submit"
              style={buttonStyle}
            >
              Create Account
            </button>

            <button
              type="button"
              onClick={() => {
                setIsSignup(false);
                setError("");
                setSuccess("");
              }}
              style={secondaryButton}
            >
              Back to Login
            </button>
          </form>
        ) : (
          /* =========================
             LOGIN
          ========================= */
          <form onSubmit={handleLogin}>

            <label style={labelStyle}>
              Username or Email
            </label>

            <input
              type="text"
              placeholder="Enter username or email"
              value={loginId}
              onChange={(e) => {
                setLoginId(e.target.value);
                setError("");
              }}
              required
              style={inputStyle}
            />

            <label style={labelStyle}>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={loginPassword}
              onChange={(e) => {
                setLoginPassword(e.target.value);
                setError("");
              }}
              required
              style={{
                ...inputStyle,
                marginBottom: "20px",
              }}
            />

            <button
              type="submit"
              style={buttonStyle}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => {
                setIsSignup(true);
                setError("");
                setSuccess("");
              }}
              style={secondaryButton}
            >
              + Create New User
            </button>
          </form>
        )}

        {!isSignup && (
          <div
            style={{
              marginTop: "20px",
              textAlign: "center",
              color: "#777",
              fontSize: "13px",
            }}
          >
            Create your account first, then login
            <br />
            using the same username/email and password.
          </div>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "7px",
  fontWeight: "bold",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "13px",
  marginBottom: "17px",
  boxSizing: "border-box",
  border: "1px solid #d0d7de",
  borderRadius: "8px",
  fontSize: "15px",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "8px",
  background: "#1976d2",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};

const secondaryButton = {
  width: "100%",
  padding: "12px",
  marginTop: "12px",
  border: "1px solid #1976d2",
  borderRadius: "8px",
  background: "#fff",
  color: "#1976d2",
  fontSize: "15px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Login;