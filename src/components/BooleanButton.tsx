import React from "react";
import { StyledSwitch } from "../styles/BooleanButton.styles";

interface BooleanButtonProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}

export default function BooleanButton({
  isChecked,
  setIsChecked,
  disabled = false,
}: BooleanButtonProps) {
  return (
    <StyledSwitch
      checked={isChecked}
      disabled={disabled}
      onClick={() => setIsChecked(!isChecked)}
    />
  );
}