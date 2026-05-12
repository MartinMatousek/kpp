import { useTranslation } from "react-i18next";
import type { UseFormSetValue } from "react-hook-form";
import NonTaxableInput from "./NonTaxableInput";
import type { FormData } from "../types/FormData";

interface NonTaxableSectionProps {
  formValues: FormData;
  setValue: UseFormSetValue<FormData>;
}

export default function NonTaxableSection({ formValues, setValue }: NonTaxableSectionProps) {
  const { t } = useTranslation("form");
  return (
    <>
      <h2>{t("nonTaxableHeading")}</h2>
      <NonTaxableInput
        number={formValues.investmentInsurance}
        setNumber={(value) =>
          setValue("investmentInsurance", typeof value === "function" ? value(formValues.investmentInsurance) : value)
        }
        text={t("investmentInsurance")}
      />
      <NonTaxableInput
        number={formValues.interestPaid}
        setNumber={(value) =>
          setValue("interestPaid", typeof value === "function" ? value(formValues.interestPaid) : value)
        }
        text={t("interestPaid")}
      />
      <NonTaxableInput
        number={formValues.otherExpenses}
        setNumber={(value) =>
          setValue("otherExpenses", typeof value === "function" ? value(formValues.otherExpenses) : value)
        }
        text={t("other")}
      />
    </>
  );
}
