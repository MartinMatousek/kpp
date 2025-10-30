import { Box, styled } from "@mui/material";

export const globalStyles = {
  ":root": {
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
    lineHeight: 1.5,
    fontWeight: 400,
    fontSize: "clamp(8px, 2vw, 16px)",
    color: "rgba(0, 0, 0, 0.87)",
    fontSynthesis: "none",
    textRendering: "optimizeLegibility",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },
  "#root": {
    width: "100%",
  },
  a: {
    fontWeight: 500,
    color: "#646cff",
    textDecoration: "inherit",
    "&:hover": {
      color: "#535bf2",
    },
  },
  body: {
    margin: 0,
    display: "flex",
    placeItems: "center",
    minWidth: "320px",
    minHeight: "100vh",
  },
  h1: {
    fontSize: "3.2em",
    lineHeight: 1.1,
  },
  button: {
    borderRadius: "8px",
    border: "1px solid transparent",
    padding: "0.6em 1.2em",
    fontSize: "1em",
    fontWeight: 500,
    fontFamily: "inherit",
    backgroundColor: "#1a1a1a",
    cursor: "pointer",
    transition: "border-color 0.25s",
    "&:hover": {
      borderColor: "#646cff",
    },
    "&:focus, &:focus-visible": {
      outline: "4px auto -webkit-focus-ring-color",
    },
  },
  "@media (prefers-color-scheme: light)": {
    ":root": {
      color: "#213547",
      backgroundColor: "#ffffff",
    },
    "a:hover": {
      color: "#747bff",
    },
    button: {
      backgroundColor: "#f9f9f9",
    },
  },
};

// Styled components
export const RootContainer = styled(Box)({
  maxWidth: "555px",
  width: "60vw",
  margin: "0 auto",
  textAlign: "center",
});

export const HeaderContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1em",
});

export const HeaderTitle = styled("h1")({
  marginLeft: "15%",
});

export const Card = styled(Box)({
  backgroundColor: "#f9f9f9",
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "20px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

export const InputRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1em",
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

export const ResultsContainer = styled(Box)({
  display: "flex",
  gap: "1rem",
  marginTop: "2rem",
  justifyContent: "center",
});

export const FlatTaxContainer = styled(Box)({
  textAlign: "center",
  marginTop: "0.8em",
});

export const FlatTaxBand = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.8rem",
  height: "1.8rem",
  borderRadius: "20%",
  border: "2px solid #BEBEBE",
  backgroundColor: "#fff",
  color: "black",
  fontSize: "1.2em",
  fontWeight: "bold",
  marginTop: "0.4em",
});
