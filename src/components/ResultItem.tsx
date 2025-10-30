import "./Components.css";

interface ResultItemProps {
  number: number;
  text: String;
}

export default function ResultItem({ number, text }: ResultItemProps) {

  function formatNumber(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  
  return (
    <div className="result-item">
      <div className="result-title">{text}</div>
      <div className="result-box">
        <span className="result-value">{formatNumber(number)}</span>
        <span className="result-currency">Kč</span>
      </div>
    </div>
  );
}