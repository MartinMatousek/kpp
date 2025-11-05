import { Box, styled, Select, MenuItem, InputLabel } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { COLORS } from "../App.styles";

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

const DropdownLabel = styled(InputLabel)({
  marginBottom: "0.3em",
  fontSize: "0.9em",
});

const StyledSelect = styled(Select)({
  borderRadius: "1em",
  fontSize: "1em",
  backgroundColor: COLORS.white,
  minWidth: "3em",
  width: "fit-content",
  "& .MuiOutlinedInput-notchedOutline": {
    border: `1.5px solid ${COLORS.border}`,
    borderRadius: "1em",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: COLORS.borderHover,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: COLORS.green,
    borderWidth: "1.5px",
  },
  "& .MuiSelect-select": {
    padding: "0.4em 2em 0.4em 0.7em",
    textAlign: "center",
  },
  "@media (max-width: 600px)": {
    width: "auto",
    maxWidth: "100%",
  },
});

const StyledMenuItem = styled(MenuItem)({
  justifyContent: "center",
  textAlign: "center",
  padding: "0.3em 1em",
  borderRadius: "0.5em",
  margin: "0.2em 0.5em",
  minHeight: "auto",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
  "&.Mui-selected": {
    backgroundColor: `${COLORS.green} !important`,
    color: `${COLORS.white} !important`,
    "&:hover": {
      backgroundColor: `${COLORS.greenHover} !important`,
    },
  },
  "&.Mui-selected.Mui-focusVisible": {
    backgroundColor: `${COLORS.green} !important`,
  },
  "@media (max-width: 600px)": {
    padding: "0.7em 0.5em",
  },
});

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
