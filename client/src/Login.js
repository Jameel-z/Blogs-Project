import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Design,
  DesignButton,
  DesignH2,
  DesignInput,
  DesignLabel,
  DesignSwitchButton,
} from "./components/styles/Design.styled";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Design>
      <DesignH2>Login</DesignH2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <DesignLabel>Email:</DesignLabel>
        <DesignInput
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <DesignLabel>Password:</DesignLabel>
        <DesignInput
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isPending && <DesignButton type="submit">Login</DesignButton>}
        {isPending && (
          <DesignButton type="submit" disabled>
            Logging in...
          </DesignButton>
        )}
      </form>
      <DesignSwitchButton onClick={() => navigate("/signup")}>
        Signup
      </DesignSwitchButton>
    </Design>
  );
};

export default Login;
