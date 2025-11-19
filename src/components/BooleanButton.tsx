import React from "react";
import { Switch, styled } from "@mui/material";

interface BooleanButtonProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}

const StyledSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.mode === 'dark' ? theme.palette.grey[300] : '#ffffff',
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.success.main,
    border: `1px solid ${theme.palette.success.main}`,
  },
  "& .MuiSwitch-switchBase": {
    color: theme.palette.text.secondary,
  },
  "& .MuiSwitch-thumb": {
    border: `1px solid ${theme.palette.divider}`,
    width: 20,
    height: 20,
    boxSizing: "border-box",
  },
  "& .MuiSwitch-track": {
    backgroundColor: theme.palette.grey[300],
    border: `1px solid ${theme.palette.divider}`,
  },
}));

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