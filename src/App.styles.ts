import { Box, Button, styled } from "@mui/material";

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

export const HeaderTitle = styled("h1")(({ theme }) => ({
  margin: 0,
  color: theme.palette.text.primary,
}));

export const ThemeToggle = styled(Button)(({ theme }) => ({
  minWidth: "auto",
  width: "3rem",
  height: "3rem",
  borderRadius: "50%",
  border: `2px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  fontSize: "1.2em",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const Card = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "20px",
  boxShadow: theme.shadows[1],
  overflow: "hidden",
  "@media (max-width: 600px)": {
    padding: "8px",
  },
}));

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

export const ResultsContainer = styled(Box)({
  display: "flex",
  gap: "1rem",
  marginTop: "2rem",
  justifyContent: "center",
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

export const FooterContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1em",
  marginTop: "2em",
  paddingBottom: "2em",
});

export const DisclaimerButton = styled(Button)(({ theme }) => ({
  padding: "0.4em 0.8em",
  fontSize: "0.9em",
  cursor: "pointer",
  borderRadius: "6px",
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  whiteSpace: "nowrap",
  transition: "all 0.3s ease",
  fontFamily: "inherit",
  textTransform: "none",
  "&:focus, &:focus-visible": {
    outline: "none",
    boxShadow: "none",
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    outline: "none",
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[4],
  },
}));

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