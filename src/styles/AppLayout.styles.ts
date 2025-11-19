import { Box, styled } from "@mui/material";

export const RootContainer = styled(Box)({
  maxWidth: "555px",
  width: "60vw",
  margin: "0 auto",
  textAlign: "center",
});

export const InputRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1em",
  flexWrap: "wrap",
  "@media (max-width: 600px)": {
    gap: "0.5em",
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
});

export const ChildrenInputContainerHidden = styled(Box)({
  visibility: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
  marginTop: "8px",
});

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