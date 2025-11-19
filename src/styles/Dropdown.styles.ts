import { Box, styled, Select, MenuItem, InputLabel } from "@mui/material";

export const DropdownContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  margin: "0.5em 0",
});

export const DropdownLabel = styled(InputLabel)(({ theme }) => ({
  marginBottom: "0.3em",
  fontSize: "0.9em",
  color: theme.palette.text.primary,
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: "1em",
  fontSize: "1em",
  backgroundColor: theme.palette.background.paper,
  minWidth: "3em",
  width: "fit-content",
  "& .MuiOutlinedInput-notchedOutline": {
    border: `1.5px solid ${theme.palette.divider}`,
    borderRadius: "1em",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.text.secondary,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.success.main,
    borderWidth: "1.5px",
  },
  "& .MuiSelect-select": {
    padding: "0.4em 2em 0.4em 0.7em",
    textAlign: "center",
  },
  "@media (max-width: 600px)": {
    width: "auto",
    maxWidth: "100%",
  },
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  justifyContent: "center",
  textAlign: "center",
  padding: "0.3em 1em",
  borderRadius: "0.5em",
  margin: "0.2em 0.5em",
  minHeight: "auto",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&.Mui-selected": {
    backgroundColor: `${theme.palette.success.main} !important`,
    color: `${theme.palette.success.contrastText} !important`,
    "&:hover": {
      backgroundColor: `${theme.palette.success.dark} !important`,
    },
  },
  "&.Mui-selected.Mui-focusVisible": {
    backgroundColor: `${theme.palette.success.main} !important`,
  },
  "@media (max-width: 600px)": {
    padding: "0.7em 0.5em",
  },
}));