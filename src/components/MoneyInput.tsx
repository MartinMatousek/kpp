import React from "react";
import { Box, Input, InputLabel, styled } from "@mui/material";
import { COLORS } from "../App.styles";

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

const MoneyInputLabel = styled(InputLabel)({
  minWidth: "5em",
  "@media (max-width: 600px)": {
    minWidth: "3em",
  },
});

const MoneyInputWrapper = styled(Box)({
  position: "relative",
  display: "inline-block",
});

const StyledInput = styled(Input)({
  width: "15em",
  height: "2em",
  marginLeft: "2em",
  paddingLeft: "1em",
  paddingRight: "2.5em",
  borderRadius: "1em",
  fontSize: "1.2em",
  border: `2px solid ${COLORS.border}`,
  transition: "border-color 0.2s ease",
  textAlign: "right",
  boxSizing: "border-box",
  "&:before, &:after": {
    display: "none",
  },
  "&:hover": {
    borderColor: COLORS.borderHover,
  },
  "&:focus": {
    outline: "none",
    borderColor: COLORS.green,
  },
  "@media (max-width: 910px)": {
    width: "10em",
  },
});

const CurrencyLabel = styled("span")({
  position: "absolute",
  right: "1em",
  top: "50%",
  transform: "translateY(-50%)",
  color: COLORS.border,
  pointerEvents: "none",
});

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
      if (inputRef.current) inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
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