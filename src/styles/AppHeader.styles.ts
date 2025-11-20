import { Box, Button, styled } from "@mui/material";

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

export const FooterContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1em",
  marginTop: "2em",
  paddingBottom: "2em",
  flexWrap: "wrap",
  "@media (max-width: 600px)": {
    gap: "0.5em",
    marginTop: "0em",
  },
});