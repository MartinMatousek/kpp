import { Box, Input, InputLabel, styled } from "@mui/material";

export const MoneyInputContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  margin: "0.5em 0",
});

export const MoneyInputLabel = styled(InputLabel)(({ theme }) => ({
  minWidth: "5em",
  color: theme.palette.text.primary,
  "@media (max-width: 600px)": {
    minWidth: "3em",
  },
}));

export const MoneyInputWrapper = styled(Box)({
  position: "relative",
  display: "inline-block",
});

export const StyledInput = styled(Input)(({ theme }) => ({
  width: "15em",
  height: "2em",
  marginLeft: "2em",
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
  "@media (max-width: 910px)": {
    width: "11em",
  },
  "@media (max-width: 600px)": {
    width: "10em",
    marginLeft: "0.5em",
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