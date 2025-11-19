import React from "react";
import BooleanButton from "./BooleanButton";
import { Tooltip } from "@mui/material";
import {
  AdditionalInfoContainer,
  AdditionalInfoContent,
} from "../styles/AdditionalInfo.styles";

interface DiscountProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  text: String;
  disabled?: boolean;
  disabledTooltip?: string;
}

export default function Discount({
  isChecked,
  setIsChecked,
  text,
  disabled = false,
  disabledTooltip = "",
}: DiscountProps) {
  return (
    <AdditionalInfoContainer>
      <Tooltip title={disabled && disabledTooltip ? disabledTooltip : ""} arrow>
        <AdditionalInfoContent>
          <label>{text}</label>
          <BooleanButton isChecked={isChecked} setIsChecked={setIsChecked} disabled={disabled} />
        </AdditionalInfoContent>
      </Tooltip>
    </AdditionalInfoContainer>
  );
}