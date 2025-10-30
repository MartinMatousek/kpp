import React from "react";
import { Switch, styled } from "@mui/material";

interface BooleanButtonProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}

const StyledSwitch = styled(Switch)({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#ffffff",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#06bb00ff",
    border: "1px solid #BEBEBE",
  },
  "& .MuiSwitch-switchBase": {
    color: "#BEBEBE",
  },
  "& .MuiSwitch-thumb": {
    border: "1px solid #BEBEBE",
    width: 20,
    height: 20,
    boxSizing: "border-box",
  },
  "& .MuiSwitch-track": {
    backgroundColor: "#ffffff",
    border: "1px solid #BEBEBE",
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