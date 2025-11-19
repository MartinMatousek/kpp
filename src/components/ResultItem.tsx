import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

interface ResultItemProps {
  number: number;
  text: String;
  isDifference?: boolean;
}

const ResultItemContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.4rem",
  margin: "0.6rem 0",
});

const ResultTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  textAlign: "center",
  color: theme.palette.text.primary,
}));

const ResultBox = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 0.6rem",
  border: `2px solid ${theme.palette.divider}`,
  borderRadius: "1.6em",
  background: theme.palette.background.paper,
  minWidth: "11rem",
}));

const ResultValue = styled("span")<{ isPositive?: boolean; isNegative?: boolean }>(
  ({ theme, isPositive, isNegative }) => ({
    fontWeight: 600,
    color: isPositive ? theme.palette.error.main : isNegative ? theme.palette.success.main : "inherit",
  })
);

const ResultCurrency = styled("span")<{ isPositive?: boolean; isNegative?: boolean }>(
  ({ theme, isPositive, isNegative }) => ({
    marginLeft: "0.35rem",
    color: isPositive ? `${theme.palette.error.main}80` : isNegative ? `${theme.palette.success.main}80` : theme.palette.text.secondary,
  })
);

export default function ResultItem({ number, text, isDifference = false }: ResultItemProps) {
  function formatNumber(value: number) {
    const absValue = Math.abs(value);
    const formatted = absValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    if (isDifference && value !== 0) {
      return value > 0 ? `+ ${formatted}` : `- ${formatted}`;
    }
    return formatted;
  }

  const isPositive = isDifference && number > 0;
  const isNegative = isDifference && number < 0;

  return (
    <ResultItemContainer>
      <ResultTitle variant="body1">{text}</ResultTitle>
      <ResultBox>
        <ResultValue isPositive={isPositive} isNegative={isNegative}>
          {formatNumber(number)}
        </ResultValue>
        <ResultCurrency isPositive={isPositive} isNegative={isNegative}>
          Kč
        </ResultCurrency>
      </ResultBox>
    </ResultItemContainer>
  );
}