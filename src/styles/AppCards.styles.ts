import { Box, styled } from "@mui/material";

export const Card = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "20px",
  boxShadow: theme.shadows[1],
  overflow: "hidden",
  "@media (max-width: 470px)": {
    padding: "8px",
  },
}));

export const ResultsContainer = styled(Box)({
  display: "flex",
  gap: "1rem",
  marginTop: "2rem",
  justifyContent: "center",
  "@media (max-width: 470px)": {
    flexDirection: "column",
    gap: "0.5rem",
    marginTop: "0rem",
  },
});

export const ResultContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  padding: "1em",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5em",
}));