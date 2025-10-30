import React from "react";
import { Switch } from "@mui/material";
import "./Components.css";

interface BooleanButtonProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BooleanButton({ isChecked, setIsChecked }: BooleanButtonProps) {
  return (
    <Switch className="styled-switch" checked={isChecked} onClick={() => setIsChecked(!isChecked)} />
  );
}