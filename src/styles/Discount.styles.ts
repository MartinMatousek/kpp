import { Box, Select, styled } from "@mui/material";

export const DiscountContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: "2.5em",
  gap: "0.75em",
  width: "100%",
});

export const MonthsSelectWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.1em",
});

export const MonthsSelectLabel = styled("span")(({ theme }) => ({
  fontSize: "0.7em",
  color: theme.palette.text.secondary,
  lineHeight: 1,
}));

export const MonthsSelect = styled(Select)(({ theme }) => ({
  borderRadius: "0.8em",
  fontSize: "0.85em",
  backgroundColor: theme.palette.background.paper,
  "& .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "0.8em",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.text.secondary,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.success.main,
    borderWidth: "1px",
  },
  "& .MuiSelect-select": {
    padding: "0.25em 1.8em 0.25em 0.5em",
    minWidth: "1.5em",
    textAlign: "center",
  },
}));

export const DiscountControls = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.5em",
  flexShrink: 0,
});

export const DiscountLabel = styled("span")({
  flex: 1,
  minWidth: 0,
  textAlign: "left",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  "@media (max-width: 470px)": {
    whiteSpace: "normal",
    textOverflow: "unset",
    overflow: "visible",
  },
});