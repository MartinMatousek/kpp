import { useState, useEffect } from "react";
import type { UseFormSetValue } from "react-hook-form";
import type { FormData } from "../types/FormData";
import type { YearData } from "../utils/YearData";
import { DEFAULT_FLAT_RATE_PERCENTAGE, PERCENTAGE_DIVISOR } from "../AppConstants";

interface UseFlatRateLogicProps {
  formValues: FormData;
  setValue: UseFormSetValue<FormData>;
  yearData: YearData;
  earningsWithoutVAT: number;
}

export function useFlatRateLogic({
  formValues,
  setValue,
  yearData,
  earningsWithoutVAT,
}: UseFlatRateLogicProps) {
  const [savedExpenses, setSavedExpenses] = useState(0);
  const [savedFlatRate, setSavedFlatRate] = useState(DEFAULT_FLAT_RATE_PERCENTAGE);

  useEffect(() => {
    if (
      earningsWithoutVAT > yearData.flatRate.limit &&
      formValues.isFlatRate
    ) {
      setSavedFlatRate(formValues.flatRate);
      setValue("isFlatRate", false);
      setValue("flatRate", 0);
      setValue("expenses", savedExpenses);
    }
  }, [earningsWithoutVAT, yearData.flatRate.limit, formValues.isFlatRate, formValues.flatRate, savedExpenses, setValue]);

  const handleFlatRateToggle = (checked: boolean) => {
    setValue("isFlatRate", checked);
    if (!checked) {
      setSavedFlatRate(formValues.flatRate);
      setValue("flatRate", 0);
      setValue("expenses", savedExpenses);
    } else {
      setSavedExpenses(formValues.expenses);
      const rateToUse = savedFlatRate;
      setValue("flatRate", rateToUse);
      setValue(
        "expenses",
        Math.round(earningsWithoutVAT * (rateToUse / PERCENTAGE_DIVISOR))
      );
    }
  };

  const handleEarningsChange = (newEarnings: number) => {
    setValue("earnings", newEarnings);

    const newEarningsWithoutVAT = formValues.withVAT
      ? newEarnings / (1 + formValues.earningsVATRate)
      : newEarnings;

    if (
      newEarningsWithoutVAT > yearData.flatRate.limit &&
      formValues.isFlatRate
    ) {
      setSavedFlatRate(formValues.flatRate);
      setValue("isFlatRate", false);
      setValue("flatRate", 0);
      setValue("expenses", savedExpenses);
    } else if (formValues.isFlatRate) {
      setValue(
        "expenses",
        Math.round(
          newEarningsWithoutVAT * (Number(formValues.flatRate) / PERCENTAGE_DIVISOR)
        )
      );
    }
  };

  const handleFlatRateChange = (rate: number) => {
    setValue("flatRate", rate);
    setValue(
      "expenses",
      Math.round(earningsWithoutVAT * (rate / PERCENTAGE_DIVISOR))
    );
  };

  return {
    savedExpenses,
    setSavedExpenses,
    savedFlatRate,
    setSavedFlatRate,
    handleFlatRateToggle,
    handleEarningsChange,
    handleFlatRateChange,
  };
}