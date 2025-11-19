import { Box, Button, styled } from "@mui/material";

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
})<{ $active?: boolean }>(({ theme, $active }) => ({
  padding: "0.6rem 1.5rem",
  borderRadius: "1.5rem",
  border: `2px solid ${theme.palette.divider}`,
  background: $active ? theme.palette.success.main : theme.palette.background.paper,
  color: $active ? theme.palette.success.contrastText : theme.palette.text.primary,
  fontWeight: 400,
  cursor: "pointer",
  fontSize: "0.8rem",
  textTransform: "none",
  outline: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: theme.palette.text.secondary,
    background: $active ? theme.palette.success.main : theme.palette.background.paper,
    transform: "translateY(-2px)",
    boxShadow: $active 
      ? `0 4px 15px ${theme.palette.success.main}4D` 
      : theme.shadows[4],
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
