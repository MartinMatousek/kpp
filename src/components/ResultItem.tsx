import "./Components.css";

interface ResultItemProps {
  number: number;
  text: String;
  isDifference?: boolean;
}

export default function ResultItem({ number, text, isDifference = false }: ResultItemProps) {

  function formatNumber(value: number): string {
    const absValue = Math.abs(value);
    const formatted = absValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    
    if (isDifference && value !== 0) {
      return value > 0 ? `+ ${formatted}` : `- ${formatted}`;
    }
    return formatted;
  }

  const getColorClass = () => {
    if (!isDifference || number === 0) return '';
    return number > 0 ? 'result-positive' : 'result-negative';
  };
  
  return (
    <div className="result-item">
      <div className="result-title">{text}</div>
      <div className="result-box">
        <span className={`result-value ${getColorClass()}`}>{formatNumber(number)}</span>
        <span className={`result-currency ${getColorClass()}`}>Kč</span>
      </div>
    </div>
  );
}