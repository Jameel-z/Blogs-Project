import styled from "styled-components";
import { Link } from "react-router-dom";

export const BlogPreview = styled.div`
  padding: ${({ theme }) => theme.spacing.medium}   ${({ theme }) => theme.spacing.large};
  margin: ${({ theme }) => theme.spacing.large} 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.background};
  transition: box-shadow ${({ theme }) => theme.transition};

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const BlogTitle = styled.h2`
  font-size: 22px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
`;

export const BlogLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const Blogdetails = styled.div`
  h2 {
    font-size: 22px;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.medium};
  }

  div {
    margin: ${({ theme }) => theme.spacing.large} 0;
  }

  button {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    border: none;
    margin: ${({ theme }) => theme.spacing.small};
    padding: ${({ theme }) => theme.spacing.small}   ${({ theme }) => theme.spacing.medium};
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    font-size: 16px;
    transition: background-color ${({ theme }) => theme.transition};

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;
