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

const ToggleButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "$active",
})<{ $active?: boolean }>(({ $active }) => ({
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
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: COLORS.borderHover,
    background: $active ? COLORS.green : COLORS.white,
    transform: "translateY(-2px)",
    boxShadow: $active 
      ? "0 4px 15px rgba(6, 187, 0, 0.3)" 
      : "0 4px 15px rgba(0, 0, 0, 0.15)",
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
