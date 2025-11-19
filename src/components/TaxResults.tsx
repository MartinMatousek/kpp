import type { UseFormSetValue } from "react-hook-form";
import ResultItem from "./ResultItem";
import FormBox from "./FormBox";
import PeriodToggle from "./PeriodToggle";
import type { FormData } from "../types/FormData";
import type { TaxOutput } from "../utils/TaxCalculator";
import type { FlatTaxResult } from "../utils/FlatTax";
import { FlatTaxContainer, FlatTaxBand } from "../styles/AppLayout.styles";
import { ResultsContainer } from "../styles/AppCards.styles";
import { MONTHS_IN_YEAR } from "../AppConstants";

interface TaxResultsProps {
  formValues: FormData;
  setValue: UseFormSetValue<FormData>;
  taxes: TaxOutput;
  flatTax: FlatTaxResult;
}

export default function TaxResults({ formValues, setValue, taxes, flatTax }: TaxResultsProps) {
  const flatTaxMonthly = flatTax.monthly;
  const flatTaxYearly = flatTax.yearly;
  const totalStandardYearly = taxes.health + taxes.social + taxes.tax;
  const diffYearly = flatTaxYearly - totalStandardYearly;
  const diffMonthly = Math.round(diffYearly / MONTHS_IN_YEAR);

  return (
    <ResultsContainer>
      <FormBox title="Odvody a daně">
        <ResultItem
          number={
            formValues.isMonthly
              ? Math.round(taxes.health / MONTHS_IN_YEAR)
              : taxes.health
          }
          text="Zdravotní pojištění"
        />
        <ResultItem
          number={
            formValues.isMonthly
              ? Math.round(taxes.social / MONTHS_IN_YEAR)
              : taxes.social
          }
          text="Důchodové pojištění"
        />
        <ResultItem
          number={
            formValues.isMonthly
              ? Math.round(taxes.tax / MONTHS_IN_YEAR)
              : taxes.tax
          }
          text="Daň z příjmu"
        />
        <ResultItem
          number={
            formValues.isMonthly
              ? Math.round(totalStandardYearly / MONTHS_IN_YEAR)
              : totalStandardYearly
          }
          text="Celkem"
        />
        <PeriodToggle
          isMonthly={formValues.isMonthly}
          setIsMonthly={(value) => setValue("isMonthly", value)}
        />
      </FormBox>

      {flatTax.bandId !== null && (
        <FormBox title="Paušální daň">
          <FlatTaxContainer>
            <div>
              <b>Pásmo paušální daně</b>
            </div>
            <FlatTaxBand>{flatTax.bandId ?? 0}</FlatTaxBand>
          </FlatTaxContainer>
          <ResultItem number={flatTaxMonthly} text="Měsíční platba" />
          <ResultItem number={flatTaxYearly} text="Ročně celkem" />
          <ResultItem
            number={Math.round(diffMonthly)}
            text="Rozdíl měsíčně"
            isDifference={true}
          />
          <ResultItem
            number={Math.round(diffYearly)}
            text="Rozdíl ročně"
            isDifference={true}
          />
        </FormBox>
      )}
    </ResultsContainer>
  );
}