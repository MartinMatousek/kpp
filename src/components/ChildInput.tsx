import React from "react";
import "./Components.css";
import { useState } from "react";

interface ChildInputProps {
  number: number;
  maxNumber: number;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
  text: String;
}

export default function ChildInput({
  number,
  setNumber,
  text,
  maxNumber,
}: ChildInputProps) {
  const [showWarning, setShowWarning] = useState(false);
  return (
    <div className="child-input-container">
      <label>{text}</label>
      <input
        type="number"
        className="child-input"
        onChange={(e) => {
          const val = Number(e.target.value);
          if (val > maxNumber) {
            setShowWarning(true);
            const timer = setTimeout(() => {
              setShowWarning(false);
            }, 3000);
            return () => clearTimeout(timer);
          } else {
            setShowWarning(false);
          }
          setNumber(val);
        }}
        min={0}
        value={number}
      />
      {showWarning && (
        <div className="child-input-warning">
          Zadaný počet ZTP/P je větší než počet dětí.
        </div>
      )}
    </div>
  );
}
