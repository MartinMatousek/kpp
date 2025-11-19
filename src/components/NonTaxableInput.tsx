import React from "react";
import { Tooltip } from "@mui/material";
import {
  NonTaxableInputContainer,
  NonTaxableInputLabel,
  StyledInput,
  CurrencyLabel,
  NonTaxableInputWrapper,
} from "../styles/NonTaxableInput.styles";

interface NonTaxableInputProps {
  number: number;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
  text: String;
}

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
      if (inputRef.current && inputRef.current.value) {
        const inputLength = inputRef.current.value.length;
        inputRef.current.setSelectionRange(inputLength, inputLength);
      }
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