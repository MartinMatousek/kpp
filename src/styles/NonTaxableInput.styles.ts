import { Box, styled, Input } from "@mui/material";

export const NonTaxableInputContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  margin: "0.5em 0",
  "@media (max-width: 600px)": {
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5em",
  },
});

export const NonTaxableInputLabel = styled("span")(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: theme.palette.text.primary,
  "@media (max-width: 600px)": {
    whiteSpace: "normal",
    textOverflow: "unset",
    overflow: "visible",
  },
}));

export const StyledInput = styled(Input)(({ theme }) => ({
  width: "12em",
  height: "2em",
  paddingLeft: "1em",
  paddingRight: "2.5em",
  borderRadius: "1em",
  fontSize: "1.2em",
  border: `2px solid ${theme.palette.divider}`,
  transition: "border-color 0.2s ease",
  textAlign: "right",
  boxSizing: "border-box",
  "&:before, &:after": {
    display: "none",
  },
  "&:hover": {
    borderColor: theme.palette.text.secondary,
  },
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.success.main,
  },
  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "&[type=number]": {
    appearance: "textfield",
    MozAppearance: "textfield",
  },
  "@media (max-width: 600px)": {
    width: "100%",
  },
}));

export const CurrencyLabel = styled("span")(({ theme }) => ({
  position: "absolute",
  right: "1em",
  top: "50%",
  transform: "translateY(-50%)",
  color: theme.palette.text.secondary,
  pointerEvents: "none",
}));

export const NonTaxableInputWrapper = styled(Box)({
  position: "relative",
  display: "inline-block",
  "@media (max-width: 600px)": {
    width: "60%",
  },
});