import { Box, styled } from "@mui/material";

interface DropdownProps {
  value: string | number;
  onChange: (value: string) => void;
  options: { value: string | number; label: string }[];
  label?: string;
}

const DropdownContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  margin: "0.5em 0",
});

const DropdownLabel = styled("label")({
  marginBottom: "0.3em",
  fontSize: "0.9em",
});

const StyledSelect = styled("select")({
  padding: "0.5em 0.5em 0.5em 0.5em",
  borderRadius: "1em",
  border: "1.5px solid #BEBEBE",
  fontSize: "1em",
  backgroundColor: "white",
  cursor: "pointer",
  outline: "none",
  minWidth: "3em",
  width: "fit-content",
  "&:hover": {
    borderColor: "#999",
  },
  "&:focus": {
    outline: "none",
    borderColor: "#06bb00ff",
  },
});

export default function Dropdown({ value, onChange, options, label }: DropdownProps) {
  return (
    <DropdownContainer>
      {label && <DropdownLabel>{label}</DropdownLabel>}
      <StyledSelect value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </DropdownContainer>
  );
}
