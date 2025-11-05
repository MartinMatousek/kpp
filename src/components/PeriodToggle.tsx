import { Box, Button, styled } from "@mui/material";
import { COLORS } from "../App.styles";

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

const ToggleButton = styled(Button)<{ $active?: boolean }>(({ $active }) => ({
  padding: "0.6rem 1.5rem",
  borderRadius: "1.5rem",
  border: `2px solid ${COLORS.border}`,
  background: $active ? COLORS.green : COLORS.white,
  color: $active ? COLORS.white : "inherit",
  fontWeight: 400,
  cursor: "pointer",
  fontSize: "0.8rem",
  textTransform: "none",
  outline: "none",
  "&:hover": {
    borderColor: COLORS.borderHover,
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
