import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavBar = styled.nav`
  padding: ${({ theme }) => theme.spacing.large};
  display: flex;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
`;

export const NavBarH1 = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-left: ${(props) => (props.isAuthenticated ? "0" : "auto")};
`;

export const NavBarLinks = styled.div`
  margin-left: auto;
`;

export const NavBarLink = styled(Link)`
  margin-right: ${({ theme }) => theme.spacing.small};
  text-decoration: none;
  padding: 8px    12px;
  color: ${({ theme }) => theme.colors.link};
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: background-color ${({ theme }) => theme.transition},
    color ${({ theme }) => theme.transition};

  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBackground};
    color: ${({ theme }) => theme.colors.hoverLink};
  }
`;

export const LogoutButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  margin-left: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.small}    ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-size: 16px;
  transition: background-color ${({ theme }) => theme.transition};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;
