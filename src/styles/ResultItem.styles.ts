import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const ResultItemContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.4rem",
  margin: "0.6rem 0",
  "@media (max-width: 600px)": {
    margin: "0.3rem 0",
    gap: "0.3rem",
  },
});

export const ResultTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  textAlign: "center",
  color: theme.palette.text.primary,
}));

export const ResultBox = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 0.6rem",
  border: `2px solid ${theme.palette.divider}`,
  borderRadius: "1.6em",
  background: theme.palette.background.paper,
  minWidth: "11rem",
}));

export const ResultValue = styled("span")<{ isPositive?: boolean; isNegative?: boolean }>(
  ({ theme, isPositive, isNegative }) => ({
    fontWeight: 600,
    color: isPositive ? theme.palette.error.main : isNegative ? theme.palette.success.main : "inherit",
  })
);

export const ResultCurrency = styled("span")<{ isPositive?: boolean; isNegative?: boolean }>(
  ({ theme, isPositive, isNegative }) => ({
    marginLeft: "0.35rem",
    color: isPositive ? `${theme.palette.error.main}80` : isNegative ? `${theme.palette.success.main}80` : theme.palette.text.secondary,
  })
);