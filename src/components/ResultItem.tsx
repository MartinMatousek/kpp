import {
  ResultItemContainer,
  ResultTitle,
  ResultBox,
  ResultValue,
  ResultCurrency,
} from "../styles/ResultItem.styles";

interface ResultItemProps {
  number: number;
  text: String;
  isDifference?: boolean;
}

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