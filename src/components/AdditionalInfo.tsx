import React from "react";
import BooleanButton from "./BooleanButton";
import { Tooltip } from "@mui/material";
import "./Components.css";

interface DiscountProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  text: String;
  disabled?: boolean;
  disabledTooltip?: string;
}

export default function Discount({ isChecked, setIsChecked, text, disabled = false, disabledTooltip = "" }: DiscountProps) {
  return (
    <div className="additional-info-container">
      <Tooltip title={disabled && disabledTooltip ? disabledTooltip : ""} arrow>
        <div className="additional-info-content">
          <label>{text}</label>
          <BooleanButton isChecked={isChecked} setIsChecked={setIsChecked} disabled={disabled} />
        </div>
      </Tooltip>
    </div>
  );
}