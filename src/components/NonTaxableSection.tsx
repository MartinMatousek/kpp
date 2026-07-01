import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { UseFormSetValue } from "react-hook-form";
import { Collapse, Tooltip } from "@mui/material";
import NonTaxableInput from "./NonTaxableInput";
import type { FormData } from "../types/FormData";
import type { NonTaxableLimits } from "../core/types";
import { SectionHeading, SectionToggleButton, SectionToggleChevron, TaxBaseSpacer } from "../styles/AppLayout.styles";

interface NonTaxableSectionProps {
  formValues: FormData;
  setValue: UseFormSetValue<FormData>;
  nonTaxableLimits: NonTaxableLimits;
}

export default function NonTaxableSection({ formValues, setValue, nonTaxableLimits }: NonTaxableSectionProps) {
  const { t } = useTranslation("form");
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <SectionHeading onClick={() => setIsOpen((prev) => !prev)}>
        <h2>{t("nonTaxableHeading")}</h2>
        <Tooltip title={isOpen ? t("collapseSection") : t("expandSection")} arrow>
          <SectionToggleButton
            size="small"
            className={isOpen ? "" : "collapsed"}
            aria-label={isOpen ? t("collapseSection") : t("expandSection")}
            aria-expanded={isOpen}
          >
            <SectionToggleChevron>{isOpen ? "−" : "+"}</SectionToggleChevron>
          </SectionToggleButton>
        </Tooltip>
      </SectionHeading>
      <Collapse in={isOpen}>
      <NonTaxableInput
        number={formValues.investmentInsurance}
        setNumber={(value) =>
          setValue("investmentInsurance", typeof value === "function" ? value(formValues.investmentInsurance) : value)
        }
        text={t("investmentInsurance")}
        limit={nonTaxableLimits.investmentInsurance}
      />
      <NonTaxableInput
        number={formValues.interestPaid}
        setNumber={(value) =>
          setValue("interestPaid", typeof value === "function" ? value(formValues.interestPaid) : value)
        }
        text={t("interestPaid")}
        limit={nonTaxableLimits.interestPaid}
      />
      <NonTaxableInput
        number={formValues.otherExpenses}
        setNumber={(value) =>
          setValue("otherExpenses", typeof value === "function" ? value(formValues.otherExpenses) : value)
        }
        text={t("other")}
      />
      <TaxBaseSpacer />
      </Collapse>
    </>
  );
}
