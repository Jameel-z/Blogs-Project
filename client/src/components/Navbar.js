import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import {
  NavBar,
  NavBarH1,
  NavBarLinks,
  NavBarLink,
  LogoutButton,
} from "./styles/Navbar.Styled";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initial state assuming user is not authenticated
  const [name, setName] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      setIsAuthenticated(true); // Set state to false if token is not found
      const username = Cookies.get("username");
      setName(username);
    }
  }, [Navigate]);

  const handleLogout = () => {
    axios
      .get(`http://localhost:5000/logout`, { withCredentials: true })
      .then(() => {
        Navigate("/login");
        setIsAuthenticated(false);
      })
      .catch((error) => {
        console.error("there was an error logging out");
      });
  };

  return (
    <NavBar>
      {!isAuthenticated && <NavBarH1 isAuthenticated = {isAuthenticated}>The Blog</NavBarH1>}
      {isAuthenticated && name && <NavBarH1 isAuthenticated={isAuthenticated}>{name}'s Blog</NavBarH1>}
      <NavBarLinks>
        {isAuthenticated && <NavBarLink to="/">Home</NavBarLink>}
        {isAuthenticated && <NavBarLink to="/create">New Blog</NavBarLink>}
        {isAuthenticated && (
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        )}
      </NavBarLinks>
    </NavBar>
  );
};

export default Navbar;
