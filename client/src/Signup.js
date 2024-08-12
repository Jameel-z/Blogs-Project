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

const Signup = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsPending(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        Navigate("/");
      }
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Design>
      <DesignH2>Signup</DesignH2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <DesignLabel>email:</DesignLabel>
        <DesignInput
          type="text"
          required
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />

        <DesignLabel>Password:</DesignLabel>
        <DesignInput
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isPending && <DesignButton type="submit">Signup</DesignButton>}
        {isPending && (
          <DesignButton type="submit" disabled>
            Signing up...
          </DesignButton>
        )}
      </form>
      <DesignSwitchButton onClick={() => Navigate("/login")}>
        login
      </DesignSwitchButton>
    </Design>
  );
};

export default Signup;
