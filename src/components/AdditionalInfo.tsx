import React from "react";
import BooleanButton from "./BooleanButton";
import { Tooltip, Box, styled } from "@mui/material";

interface DiscountProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  text: String;
  disabled?: boolean;
  disabledTooltip?: string;
}

const AdditionalInfoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  width: "100%",
  gap: "1em",
});

const AdditionalInfoContent = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1em",
});

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