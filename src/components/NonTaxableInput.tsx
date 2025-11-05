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
  "@media (max-width: 600px)": {
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5em",
  },
});

const NonTaxableInputLabel = styled("span")({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  "@media (max-width: 600px)": {
    whiteSpace: "normal",
    textOverflow: "unset",
    overflow: "visible",
  },
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
  boxSizing: "border-box",
  "&:hover": {
    borderColor: "#999",
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
  "@media (max-width: 600px)": {
    width: "100%",
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

const NonTaxableInputWrapper = styled(Box)({
  position: "relative",
  display: "inline-block",
  "@media (max-width: 600px)": {
    width: "60%",
  },
});

export default function NonTaxableInput({ number, setNumber, text }: NonTaxableInputProps) {
  const spanRef = React.useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = React.useState(false);

  const checkOverflow = () => {
    if (spanRef.current) {
      setIsOverflowing(spanRef.current.scrollWidth > spanRef.current.clientWidth);
    }
  };

  const [inputValue, setInputValue] = React.useState(number === 0 ? '' : number.toString());
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!isFocused) {
      setInputValue(number === 0 ? '' : formatNumber(number));
    }
  }, [number, isFocused]);

  function formatNumber(value: number | string): string {
    const str = typeof value === 'number' ? value.toString() : value;
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\s/g, '');
    setInputValue(raw);
    const numValue = raw === '' ? 0 : Number(raw);
    if (!isNaN(numValue)) {
      setNumber(numValue);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    setInputValue(number === 0 ? '' : formatNumber(number));
  };

  const handleFocus = () => {
    setIsFocused(true);
    setInputValue(number === 0 ? '' : number.toString());
    setTimeout(() => {
      if (inputRef.current) inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
    }, 0);
  };

  return (
    <NonTaxableInputContainer>
      <Tooltip title={isOverflowing ? text.toString() : ""} arrow>
        <NonTaxableInputLabel ref={spanRef} onMouseEnter={checkOverflow}>
          {text}
        </NonTaxableInputLabel>
      </Tooltip>
      <NonTaxableInputWrapper>
        <StyledInput
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder="0"
        />
        <CurrencyLabel>Kč</CurrencyLabel>
      </NonTaxableInputWrapper>
    </NonTaxableInputContainer>
  );
}