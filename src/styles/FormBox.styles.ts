import { Box, styled, Typography } from "@mui/material";

export const FormBoxContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  boxShadow: theme.shadows[2],
  maxWidth: "24rem",
  minWidth: "18rem",
  margin: "0 auto 5rem",
  paddingBottom: "1rem",
}));

export const FormBoxTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  textAlign: "center",
  marginBottom: "0.3rem",
  marginTop: "0.5rem",
  color: theme.palette.text.primary,
}));

export const FormBoxContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.3rem",
});