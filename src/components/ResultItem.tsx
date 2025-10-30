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

const ResultTitle = styled(Typography)({
  fontWeight: 700,
  textAlign: "center",
});

const ResultBox = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 0.6rem",
  border: "2px solid #bebebe",
  borderRadius: "1.6em",
  background: "#fff",
  minWidth: "11rem",
});

const ResultValue = styled("span")<{ isPositive?: boolean; isNegative?: boolean }>(
  ({ isPositive, isNegative }) => ({
    fontWeight: 600,
    color: isPositive ? "#dc3545" : isNegative ? "#06bb00ff" : "inherit",
  })
);

const ResultCurrency = styled("span")<{ isPositive?: boolean; isNegative?: boolean }>(
  ({ isPositive, isNegative }) => ({
    marginLeft: "0.35rem",
    color: isPositive ? "#dc354580" : isNegative ? "#06bb0080" : "#666",
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