import React from "react";
import { Switch, styled } from "@mui/material";
import { COLORS } from "../App.styles";

interface BooleanButtonProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}

const StyledSwitch = styled(Switch)({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: COLORS.white,
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: COLORS.green,
    border: `1px solid ${COLORS.border}`,
  },
  "& .MuiSwitch-switchBase": {
    color: COLORS.border,
  },
  "& .MuiSwitch-thumb": {
    border: `1px solid ${COLORS.border}`,
    width: 20,
    height: 20,
    boxSizing: "border-box",
  },
  "& .MuiSwitch-track": {
    backgroundColor: COLORS.white,
    border: `1px solid ${COLORS.border}`,
  },
});

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