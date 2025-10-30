import React from "react";
import BooleanButton from "./BooleanButton";
import { Tooltip } from "@mui/material";

interface DiscountProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  text: String;
  disabled?: boolean;
  disabledTooltip?: string;
}

export default function Discount({ isChecked, setIsChecked, text, disabled = false, disabledTooltip = "" }: DiscountProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', gap: '1em' }}>
      <Tooltip title={disabled && disabledTooltip ? disabledTooltip : ""} arrow>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <label>{text}</label>
          <BooleanButton isChecked={isChecked} setIsChecked={setIsChecked} disabled={disabled} />
        </div>
      </Tooltip>
    </div>
  );
}