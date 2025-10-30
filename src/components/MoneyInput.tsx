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
    <div style={{ display: 'flex', alignItems: 'center', margin: '0.5em 0' }}>
      <label style={{ minWidth: '5em' }}>{text}</label>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <input 
          type="text" 
          className="money-input"
          disabled={disabled}
          onChange={handleChange}
          value={formatNumber(number)}
        />
        <span style={{ position: 'absolute', right: '1em', top: '50%', transform: 'translateY(-50%)', color: '#666', pointerEvents: 'none' }}>Kč</span>
      </div>
    </div>
  );
}