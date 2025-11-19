import type { SelectChangeEvent } from "@mui/material";
import {
  DropdownContainer,
  DropdownLabel,
  StyledSelect,
  StyledMenuItem,
} from "../styles/Dropdown.styles";

interface DropdownProps {
  value: string | number;
  onChange: (value: string) => void;
  options: { value: string | number; label: string }[];
  label?: string;
}

export default function Dropdown({ value, onChange, options, label }: DropdownProps) {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    onChange(String(event.target.value));
  };

  return (
    <DropdownContainer>
      {label && <DropdownLabel>{label}</DropdownLabel>}
      <StyledSelect
        value={value}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: "1em",
              marginTop: "0.5em",
            },
          },
        }}
      >
        {options.map((option) => (
          <StyledMenuItem key={option.value} value={option.value}>
            {option.label}
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </DropdownContainer>
  );
}
