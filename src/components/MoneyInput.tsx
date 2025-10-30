import React from "react";
import "./Components.css";

interface MoneyInputProps {
  number: number;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
  text: String;
  disabled?: boolean;
}

export default function MoneyInput({ number, setNumber, text, disabled = false }: MoneyInputProps) {
  function formatNumber(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\s/g, '');
    const numValue = Number(rawValue);
    if (!isNaN(numValue)) {
      setNumber(numValue);
    }
  };

  return (
    <div className="money-input-container">
      <label className="money-input-label">{text}</label>
      <div className="money-input-wrapper">
        <input 
          type="text" 
          className="money-input"
          disabled={disabled}
          onChange={handleChange}
          value={formatNumber(number)}
        />
        <span className="money-input-currency">Kč</span>
      </div>
    </div>
  );
}