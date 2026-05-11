import { Box, styled } from "@mui/material";

export const VATInfoContainer = styled(Box)(({ theme }) => ({
  fontSize: "0.9em",
  color: theme.palette.text.secondary,
  marginTop: "0.5em",
  textDecoration: "underline",
  textAlign: "center",
}));