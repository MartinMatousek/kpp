import type { UseFormSetValue } from "react-hook-form";
import NonTaxableInput from "./NonTaxableInput";
import type { FormData } from "../types/FormData";

interface NonTaxableSectionProps {
  formValues: FormData;
  setValue: UseFormSetValue<FormData>;
}

export default function NonTaxableSection({ formValues, setValue }: NonTaxableSectionProps) {
  return (
    <>
      <h2>Nezdanitelné částky</h2>
      <NonTaxableInput
        number={formValues.investmentInsurance}
        setNumber={(value) =>
          setValue(
            "investmentInsurance",
            typeof value === "function"
              ? value(formValues.investmentInsurance)
              : value
          )
        }
        text="Zaplacené investiční připojištění:"
      />
      <NonTaxableInput
        number={formValues.interestPaid}
        setNumber={(value) =>
          setValue(
            "interestPaid",
            typeof value === "function"
              ? value(formValues.interestPaid)
              : value
          )
        }
        text="Zaplacené úroky:"
      />
      <NonTaxableInput
        number={formValues.otherExpenses}
        setNumber={(value) =>
          setValue(
            "otherExpenses",
            typeof value === "function"
              ? value(formValues.otherExpenses)
              : value
          )
        }
        text="Ostatní:"
      />
    </>
  );
}