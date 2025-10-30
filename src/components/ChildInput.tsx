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
    <div style={{ position: "relative" }}>
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
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "100%",
            color: "red",
            fontSize: "0.85em",
            marginTop: 4,
            whiteSpace: "nowrap",
            zIndex: 10,
          }}
        >
          Zadaný počet ZTP/P je větší než počet dětí.
        </div>
      )}
    </div>
  );
}
