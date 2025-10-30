import React from "react";
import BooleanButton from "./BooleanButton";

interface DiscountProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  text: String;
}

export default function Discount({ isChecked, setIsChecked, text }: DiscountProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', gap: '1em' }}>
      <label>{text}</label>
      <BooleanButton isChecked={isChecked} setIsChecked={setIsChecked} />
    </div>
  );
}