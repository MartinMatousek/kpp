import { Box, Button, styled } from "@mui/material";

export const COLORS = {
  green: "#06bb00ff",
  greenHover: "#05aa00",
  border: "#BEBEBE",
  borderHover: "#999",
  white: "#ffffff",
  black: "#000000",
  red: "#dc3545"
} as const;

export const globalStyles = {
  ":root": {
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
    lineHeight: 1.5,
    fontWeight: 400,
    fontSize: "clamp(8px, 2vw, 16px)",
    color: COLORS.black,
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
    textDecoration: "inherit",
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
    backgroundColor: COLORS.black,
    cursor: "pointer",
    transition: "border-color 0.25s",
    "&:focus, &:focus-visible": {
      outline: "4px auto -webkit-focus-ring-color",
    },
    '@media (max-width: 600px)': {
      fontSize: '0.85em',
      padding: '0.4em 0.7em',
      minWidth: 'unset',
    },
  },
  "@media (prefers-color-scheme: light)": {
    ":root": {
      color: COLORS.black,
      backgroundColor: COLORS.white,
    },
    button: {
      backgroundColor: COLORS.white,
    },
  },
};

export const RootContainer = styled(Box)({
  maxWidth: "555px",
  width: "60vw",
  margin: "0 auto",
  textAlign: "center",
});

export const HeaderContainer = styled(Box)({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1em",
  marginBottom: "1em",
  paddingTop: "1em",
  paddingBottom: "1em",
  gap: "1em",
  "@media (max-width: 600px)": {
    flexDirection: "column",
    gap: "0.5em",
  },
});

export const HeaderActions = styled(Box)({
  position: "absolute",
  right: 0,
  display: "flex",
  alignItems: "center",
  gap: "0.5em",
  zIndex: 10,
  "@media (max-width: 600px)": {
    position: "static",
  },
});

export const HeaderTitle = styled("h1")({
  margin: 0,
});

export const Card = styled(Box)({
  backgroundColor: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "20px",
  boxShadow: `0 2px 4px ${COLORS.border}`,
  overflow: 'hidden',
  '@media (max-width: 600px)': {
    padding: '8px',
  },
});

export const InputRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1em",
  flexWrap: 'wrap',
  '@media (max-width: 600px)': {
    gap: '0.5em',
  },
});

export const AdditionalInfoContainer = styled(Box)({
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '@media (max-width: 600px)': {
    fontSize: '0.95em',
    maxWidth: '90vw',
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
  border: `2px solid ${COLORS.border}`,
  backgroundColor: COLORS.white,
  color: COLORS.black,
  fontSize: "1.2em",
  fontWeight: "bold",
  marginTop: "0.4em",
});

export const FooterContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1em",
  marginTop: "2em",
  paddingBottom: "2em",
});

export const DisclaimerButton = styled(Button)({
  padding: "0.4em 0.8em",
  fontSize: "0.9em",
  cursor: "pointer",
  borderRadius: "6px",
  border: `1px solid ${COLORS.border}`,
  background: COLORS.white,
  color: COLORS.black,
  whiteSpace: "nowrap",
  transition: "background-color 0.2s ease",
  fontFamily: "inherit",
  textTransform: "none",
  "&:focus, &:focus-visible": {
    outline: "none",
    boxShadow: "none",
  },
  "&:hover": {
    border: `1px solid ${COLORS.borderHover}`,
    outline: "none",
  },
});

export const CoffeeButton = styled(Button)({
  backgroundColor: '#8B4513',
  color: '#FFF8DC',
  position: 'relative',
  overflow: 'hidden',
  padding: "0.4em 0.8em",
  fontSize: "0.9em",
  cursor: "pointer",
  borderRadius: "6px",
  whiteSpace: "nowrap",
  fontFamily: "inherit",
  textTransform: "none",
  border: "1px solid #8B4513",
  '&:hover': { 
    backgroundColor: '#654321',
    boxShadow: '0 4px 15px rgba(139, 69, 19, 0.4)',
    transform: 'translateY(-2px)',
    border: "1px solid #654321",
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '0',
      width: '100%',
      height: '8px',
      background: 'radial-gradient(ellipse at center, rgba(160, 82, 45, 0.6) 0%, transparent 70%)',
      borderRadius: '50%',
      animation: 'coffee-wave 1.2s ease-in-out infinite',
    },
    '&::after': {
      content: '"💨"',
      position: 'absolute',
      top: '0px',
      left: '15px',
      fontSize: '10px',
      opacity: 0,
      color: '#D2B48C',
      animation: 'steam 2s ease-out forwards',
    }
  },
  transition: 'all 0.3s ease',
  '&:focus, &:focus-visible': {
    outline: "none",
    boxShadow: "none",
  },
  '@keyframes coffee-wave': {
    '0%, 100%': { 
      transform: 'translateY(0px) scaleX(1)',
      opacity: 0.6 
    },
    '50%': { 
      transform: 'translateY(-3px) scaleX(1.1)',
      opacity: 0.9 
    }
  },
  '@keyframes steam': {
    '0%': { 
      transform: 'translateY(0px) translateX(0px) rotate(-2deg)', 
      opacity: 0 
    },
    '20%': { 
      transform: 'translateY(-2px) translateX(1px) rotate(1deg)', 
      opacity: 0.8 
    },
    '50%': { 
      transform: 'translateY(-6px) translateX(-1px) rotate(-1deg)', 
      opacity: 0.6 
    },
    '80%': { 
      transform: 'translateY(-10px) translateX(2px) rotate(2deg)', 
      opacity: 0.3 
    },
    '100%': { 
      transform: 'translateY(-12px) translateX(0px) rotate(0deg)', 
      opacity: 0 
    }
  }
});
