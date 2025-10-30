import React from "react";
import { Box, styled, Typography } from "@mui/material";

interface FormBoxProps {
  title: string;
  children: React.ReactNode;
}

const FormBoxContainer = styled(Box)({
  backgroundColor: "#f9f9f9",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  maxWidth: "24rem",
  minWidth: "18rem",
  margin: "0 auto 5rem",
  paddingBottom: "1rem",
});

const FormBoxTitle = styled(Typography)({
  fontWeight: 700,
  textAlign: "center",
  marginBottom: "0.3rem",
  marginTop: "0.5rem",
});

const FormBoxContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.3rem",
});

export default function FormBox({ title, children }: FormBoxProps) {
  return (
    <FormBoxContainer>
      <FormBoxTitle variant="body1">{title}</FormBoxTitle>
      <FormBoxContent>{children}</FormBoxContent>
    </FormBoxContainer>
  );
}
