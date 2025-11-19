import { Box, styled } from "@mui/material";

export const DiscountContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "@media (max-width: 600px)": {
    gap: "0.75em",
    width: "100%",
  },
});

export const DiscountLabel = styled("span")({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  "@media (max-width: 600px)": {
    flex: 1,
    minWidth: 0,
    whiteSpace: "normal",
    textOverflow: "unset",
    overflow: "visible",
  },
});