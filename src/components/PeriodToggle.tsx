import { useTranslation } from "react-i18next";
import {
  PeriodToggleContainer,
  ToggleButton,
} from "../styles/PeriodToggle.styles";

interface PeriodToggleProps {
  isMonthly: boolean;
  setIsMonthly: (value: boolean) => void;
}

export default function PeriodToggle({ isMonthly, setIsMonthly }: PeriodToggleProps) {
  const { t } = useTranslation("tax");
  return (
    <PeriodToggleContainer>
      <ToggleButton $active={isMonthly} onClick={() => setIsMonthly(true)}>
        {t("monthly")}
      </ToggleButton>
      <ToggleButton $active={!isMonthly} onClick={() => setIsMonthly(false)}>
        {t("annual")}
      </ToggleButton>
    </PeriodToggleContainer>
  );
}
