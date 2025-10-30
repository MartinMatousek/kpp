import React from "react";
import { Tooltip, Box, styled } from "@mui/material";

interface NonTaxableInputProps {
  number: number;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
  text: String;
}

const NonTaxableInputContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  margin: "0.5em 0",
});

const NonTaxableInputLabel = styled("span")({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const NonTaxableInputWrapper = styled(Box)({
  position: "relative",
  display: "inline-block",
});

const StyledInput = styled("input")({
  width: "12em",
  height: "2em",
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

export default function NonTaxableInput({ number, setNumber, text }: NonTaxableInputProps) {
  const [displayValue, setDisplayValue] = React.useState(formatNumber(number));
  const spanRef = React.useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = React.useState(false);

  const checkOverflow = () => {
    if (spanRef.current) {
      setIsOverflowing(spanRef.current.scrollWidth > spanRef.current.clientWidth);
    }
  };

  function formatNumber(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\s/g, "");
    const numValue = Number(rawValue);
    if (!isNaN(numValue)) {
      setNumber(numValue);
      setDisplayValue(formatNumber(numValue));
    }
  };

  return (
    <NonTaxableInputContainer>
      <Tooltip title={isOverflowing ? text.toString() : ""} arrow>
        <NonTaxableInputLabel ref={spanRef} onMouseEnter={checkOverflow}>
          {text}
        </NonTaxableInputLabel>
      </Tooltip>
      <NonTaxableInputWrapper>
        <StyledInput type="text" onChange={handleChange} value={displayValue} />
        <CurrencyLabel>Kč</CurrencyLabel>
      </NonTaxableInputWrapper>
    </NonTaxableInputContainer>
  );
}