import { useTranslation } from "react-i18next";
import { VATInfoContainer } from "../styles/VATInfo.styles";

interface VATInfoProps {
  amount: number;
  withVAT: boolean;
}

export default function VATInfo({ amount, withVAT }: VATInfoProps) {
  const { t } = useTranslation("common");
  const formatted = amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const label = withVAT ? t("vatExcl") : t("vatIncl");
  return (
    <VATInfoContainer>
      {formatted} {t("currency")} {label}
    </VATInfoContainer>
  );
}
