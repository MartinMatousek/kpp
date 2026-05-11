import { Box, styled, Typography } from "@mui/material";

export const RootContainer = styled(Box)({
  maxWidth: "555px",
  width: "100%",
  margin: "0 auto",
  padding: "0 1rem",
  textAlign: "center",
  "@media (min-width: 780px)": {
    width: "60vw",
    padding: "0",
  },
});

export const InputRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1em",
  flexWrap: "wrap",
  "@media (max-width: 470px)": {
    gap: "0.5em",
    flexWrap: "nowrap",
  },
});

export const HiddenInput = styled(Box)({
  visibility: "hidden",
  pointerEvents: "none",
});

export const ChildrenInputContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
  marginTop: "8px",
  flexWrap: "wrap",
});

export const ChildrenInputContainerHidden = styled(Box)({
  visibility: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
  marginTop: "8px",
  flexWrap: "wrap",
});

export const MonthsRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75em",
  padding: "0.6em 0",
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: "0.5em",
}));

export const MonthsLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.95em",
  color: theme.palette.text.secondary,
  fontWeight: 500,
  cursor: "default",
  textDecorationLine: "underline",
  textDecorationStyle: "dotted",
  textUnderlineOffset: "3px",
}));

export const TaxBaseDisplay = styled(Box)({
  fontSize: "1.3em",
  marginTop: "2em",
});

export const FlatTaxContainer = styled(Box)({
  textAlign: "center",
  marginTop: "0.8em",
});

export const FlatTaxBand = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.8rem",
  height: "1.8rem",
  borderRadius: "20%",
  border: `2px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  fontSize: "1.2em",
  fontWeight: "bold",
  marginTop: "0.4em",
}));