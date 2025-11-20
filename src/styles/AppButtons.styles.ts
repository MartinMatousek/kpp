import { Button, styled } from "@mui/material";

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
  "@media (max-width: 600px)": {
    padding: "0.3em 0.6em",
    fontSize: "0.8em",
    minWidth: "auto",
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
  },
  "@media (max-width: 600px)": {
    padding: "0.3em 0.6em",
    fontSize: "0.8em",
    minWidth: "auto",
  },
});