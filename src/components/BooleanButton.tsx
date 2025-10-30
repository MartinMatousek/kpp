import React from "react";
import { Switch } from "@mui/material";
import "./Components.css";

interface BooleanButtonProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}

export default function BooleanButton({ isChecked, setIsChecked, disabled = false }: BooleanButtonProps) {
  return (
    <Switch className="styled-switch" checked={isChecked} disabled={disabled} onClick={() => setIsChecked(!isChecked)} />
  );
}