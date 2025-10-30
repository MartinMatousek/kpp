import React from "react";
import { Tooltip } from "@mui/material";
import "./Components.css";

interface NonTaxableInputProps {
  number: number;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
  text: String;
}

export default function NonTaxableInput({ number, setNumber, text }: NonTaxableInputProps) {
  const [displayValue, setDisplayValue] = React.useState(formatNumber(number));
  const spanRef = React.useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = React.useState(false);

  const checkOverflow = () => {
    if (spanRef.current) {
      setIsOverflowing(spanRef.current.scrollWidth > spanRef.current.clientWidth);
    }
  };

  function formatNumber(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\s/g, '');
    const numValue = Number(rawValue);
    if (!isNaN(numValue)) {
      setNumber(numValue);
      setDisplayValue(formatNumber(numValue));
    }
  };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', margin: '0.5em 0' }}>
      <Tooltip title={isOverflowing ? text.toString() : ""} arrow>
        <span
          ref={spanRef}
          onMouseEnter={checkOverflow}
          style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {text}
        </span>
      </Tooltip>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <input 
          type="text" 
          className="non-taxable-input"
          onChange={handleChange}
          value={displayValue}
        />
        <span style={{ position: 'absolute', right: '1em', top: '50%', transform: 'translateY(-50%)', color: '#666', pointerEvents: 'none' }}>Kč</span>
      </div>
    </div>
  );
}