import { Box, styled } from "@mui/material";

interface PeriodToggleProps {
  isMonthly: boolean;
  setIsMonthly: (value: boolean) => void;
}

const PeriodToggleContainer = styled(Box)({
  display: "flex",
  gap: "1rem",
  justifyContent: "center",
  marginTop: "1rem",
});

const ToggleButton = styled("button")<{ $active?: boolean }>(({ $active }) => ({
  padding: "0.6rem 1.5rem",
  borderRadius: "1.5rem",
  border: $active ? "2px solid #FFFFFF" : "2px solid #BEBEBE",
  background: $active ? "#06bb00ff" : "#fff",
  color: $active ? "#fff" : "inherit",
  fontWeight: 400,
  cursor: "pointer",
  fontSize: "1rem",
  outline: "none",
  "&:hover": {
    borderColor: $active ? "#FFFFFF" : "#BEBEBE",
  },
  "&:focus": {
    outline: "none",
  },
}));

export default function PeriodToggle({ isMonthly, setIsMonthly }: PeriodToggleProps) {
  return (
    <PeriodToggleContainer>
      <ToggleButton $active={isMonthly} onClick={() => setIsMonthly(true)}>
        Měsíčně
      </ToggleButton>
      <ToggleButton $active={!isMonthly} onClick={() => setIsMonthly(false)}>
        Ročně
      </ToggleButton>
    </PeriodToggleContainer>
  );
}
