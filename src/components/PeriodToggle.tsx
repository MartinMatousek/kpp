import {
  PeriodToggleContainer,
  ToggleButton,
} from "../styles/PeriodToggle.styles";

interface PeriodToggleProps {
  isMonthly: boolean;
  setIsMonthly: (value: boolean) => void;
}

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
