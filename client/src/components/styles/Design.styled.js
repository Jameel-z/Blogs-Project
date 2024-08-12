import styled from "styled-components";

export const Design = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.background};
`;

export const DesignH2 = styled.h2`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

export const DesignLabel = styled.label`
  display: block;
  text-align: left;
  margin: ${({ theme }) => theme.spacing.small} 0 5px;
`;

export const DesignSelect = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  margin: ${({ theme }) => theme.spacing.small} 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
`;

export const DesignInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  margin: ${({ theme }) => theme.spacing.small} 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
`;

export const DesignTextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  margin: ${({ theme }) => theme.spacing.small} 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
`;

export const DesignButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  margin-right: ${({ theme }) => theme.spacing.small};
  margin-left: ${({ theme }) => theme.spacing.small};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: ${({ theme }) => theme.spacing.small};
  transition: background-color ${({ theme }) => theme.transition};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }
`;

export const DesignSwitchButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.small};
  background: none;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color ${({ theme }) => theme.transition}, color ${({ theme }) => theme.transition};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }
`;
