import React from "react";
import {
  MoneyInputContainer,
  MoneyInputLabel,
  MoneyInputWrapper,
  StyledInput,
  CurrencyLabel,
} from "../styles/MoneyInput.styles";

interface MoneyInputProps {
  number: number;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
  text: String;
  disabled?: boolean;
}

export default function MoneyInput({ number, setNumber, text, disabled = false }: MoneyInputProps) {
  function formatNumber(value: number | string): string {
    const str = typeof value === 'number' ? value.toString() : value;
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  const [inputValue, setInputValue] = React.useState(number === 0 ? '' : number.toString());
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!isFocused) {
      setInputValue(number === 0 ? '' : formatNumber(number));
    }
  }, [number, isFocused]);

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
    <MoneyInputContainer>
      <MoneyInputLabel>{text}</MoneyInputLabel>
      <MoneyInputWrapper>
        <StyledInput
          ref={inputRef}
          type="text"
          disabled={disabled}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder="0"
        />
        <CurrencyLabel>Kč</CurrencyLabel>
      </MoneyInputWrapper>
    </MoneyInputContainer>
  );
}