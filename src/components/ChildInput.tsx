import React, { useState } from "react";
import { Box, styled } from "@mui/material";

interface ChildInputProps {
  number: number;
  maxNumber: number;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
  text: String;
}

const ChildInputContainer = styled(Box)({
  position: "relative",
});

const StyledInput = styled("input")(({ theme }) => ({
  width: "4em",
  height: "2.5em",
  marginLeft: "2em",
  paddingLeft: "0.5em",
  paddingRight: "0.3em",
  borderRadius: "1em",
  fontSize: "1em",
  border: `2px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  transition: "border-color 0.2s ease",
  textAlign: "center",
  appearance: "textfield",
  MozAppearance: "textfield",
  "&:hover": {
    borderColor: theme.palette.text.secondary,
  },
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.success.main,
  },
  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    opacity: 1,
    cursor: "pointer",
    transform: "scale(1.2)",
    marginLeft: "0.2em",
  },
}));

const WarningMessage = styled(Box)({
  position: "absolute",
  left: 0,
  top: "100%",
  color: "red",
  fontSize: "0.85em",
  marginTop: 4,
  whiteSpace: "nowrap",
  zIndex: 10,
});

export default function ChildInput({
  number,
  setNumber,
  text,
  maxNumber,
}: ChildInputProps) {
  const [showWarning, setShowWarning] = useState(false);
  return (
    <ChildInputContainer>
      <label>{text}</label>
      <StyledInput
        type="number"
        onChange={(e) => {
          const val = Number(e.target.value);
          if (val > maxNumber) {
            setShowWarning(true);
            const timer = setTimeout(() => {
              setShowWarning(false);
            }, 3000);
            return () => clearTimeout(timer);
          } else {
            setShowWarning(false);
          }
          setNumber(val);
        }}
        min={0}
        value={number}
      />
      {showWarning && (
        <WarningMessage>
          Zadaný počet ZTP/P je větší než počet dětí.
        </WarningMessage>
      )}
    </ChildInputContainer>
  );
}
