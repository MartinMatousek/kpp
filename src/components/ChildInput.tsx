import React, { useState } from "react";
import {
  ChildInputContainer,
  StyledInput,
  WarningMessage,
} from "../styles/ChildInput.styles";

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
    <ChildInputContainer>
      <label>{text}</label>
      <StyledInput
        type="number"
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
        <WarningMessage>
          Zadaný počet ZTP/P je větší než počet dětí.
        </WarningMessage>
      )}
    </ChildInputContainer>
  );
}
