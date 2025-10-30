import React from "react";
import { Box, styled } from "@mui/material";

interface MoneyInputProps {
  number: number;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
  text: String;
  disabled?: boolean;
}

const MoneyInputContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  margin: "0.5em 0",
});

const MoneyInputLabel = styled("label")({
  minWidth: "5em",
});

const MoneyInputWrapper = styled(Box)({
  position: "relative",
  display: "inline-block",
});

const StyledInput = styled("input")({
  width: "12em",
  height: "2em",
  marginLeft: "2em",
  paddingLeft: "1em",
  paddingRight: "2.5em",
  borderRadius: "1em",
  fontSize: "1.2em",
  border: "2px solid #BEBEBE",
  transition: "border-color 0.2s ease",
  textAlign: "right",
  "&:hover": {
    borderColor: "#BEBEBE",
  },
  "&:focus": {
    outline: "none",
    borderColor: "#06bb00ff",
  },
  "&:disabled": {
    backgroundColor: "#f5f5f5",
    color: "#999",
    borderColor: "#DDDDDD",
    cursor: "not-allowed",
  },
  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "&[type=number]": {
    appearance: "textfield",
    MozAppearance: "textfield",
  },
});

const CurrencyLabel = styled("span")({
  position: "absolute",
  right: "1em",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#666",
  pointerEvents: "none",
});

export default function MoneyInput({ number, setNumber, text, disabled = false }: MoneyInputProps) {
  function formatNumber(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\s/g, "");
    const numValue = Number(rawValue);
    if (!isNaN(numValue)) {
      setNumber(numValue);
    }
  };

  return (
    <MoneyInputContainer>
      <MoneyInputLabel>{text}</MoneyInputLabel>
      <MoneyInputWrapper>
        <StyledInput
          type="text"
          disabled={disabled}
          onChange={handleChange}
          value={formatNumber(number)}
        />
        <CurrencyLabel>Kč</CurrencyLabel>
      </MoneyInputWrapper>
    </MoneyInputContainer>
  );
}