import { useState } from "react";
import { useForm } from "react-hook-form";
import type { FormData } from "../types/FormData";
import { getAvailableYears, loadYearData, type YearData } from "../utils/YearData";
import { calculateVATAmounts } from "../utils/VATCalculations";
import { useFlatRateLogic } from "./useFlatRateLogic";
import { useTaxCalculator } from "./useTaxCalculator";
import { computeFlatTax } from "../utils/FlatTax";
import type { DiscountsInput } from "../utils/TaxCalculator";

export function useAppForm() {
  const currentYear = new Date().getFullYear();
  const initialYearData = loadYearData(currentYear);
  
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  
  const [yearData, setYearData] = useState<YearData>(initialYearData);
  
  const { watch, setValue } = useForm<FormData>({
    defaultValues: {
      earnings: 0,
      expenses: 0,
      withVAT: false,
      isFlatRate: false,
      flatRate: 0,
      isMonthly: false,
      taxpayerDiscount: true,
      spouseDiscount: false,
      spouseZTPDiscount: false,
      disabledDiscount: false,
      disabledThreeDiscount: false,
      ztpDiscount: false,
      childrenDiscount: false,
      numberOfChildren: 0,
      numberOfZtpChildren: 0,
      investmentInsurance: 0,
      interestPaid: 0,
      otherExpenses: 0,
      selectedYear: currentYear,
      earningsVATRate: initialYearData.vatRates[initialYearData.vatRates.length - 1] / 100,
    },
  });

  const formValues = watch();

  const { earningsWithoutVAT, earningsWithVAT } = calculateVATAmounts(
    formValues.earnings,
    formValues.withVAT,
    formValues.earningsVATRate
  );

  const {
    handleFlatRateToggle: baseFlatRateToggle,
    handleEarningsChange,
    handleFlatRateChange,
  } = useFlatRateLogic({
    formValues,
    setValue,
    yearData,
    earningsWithoutVAT,
  });

  const discountsInput: DiscountsInput = {
    taxpayer: formValues.taxpayerDiscount,
    spouse: formValues.spouseDiscount,
    spouseZTP: formValues.spouseZTPDiscount,
    disabled: formValues.disabledDiscount,
    disabledThree: formValues.disabledThreeDiscount,
    ztp: formValues.ztpDiscount,
    children: {
      enabled: formValues.childrenDiscount,
      count: formValues.numberOfChildren,
      ztpCount: formValues.numberOfZtpChildren,
    },
  };

  const taxes = useTaxCalculator({
    yearData,
    earningsWithoutVAT,
    expenses: formValues.expenses,
    discounts: discountsInput,
    investmentInsurance: formValues.investmentInsurance,
    interestPaid: formValues.interestPaid,
    otherExpenses: formValues.otherExpenses,
  });

  const flatTax = computeFlatTax(
    yearData,
    earningsWithoutVAT,
    formValues.flatRate
  );

  const handleVATToggle = (checked: boolean | ((prev: boolean) => boolean)) => {
    const value = typeof checked === "function" ? checked(formValues.withVAT) : checked;
    setValue("withVAT", value);
  };

  const handleMoneyInputChange = (newEarningsValue: number | ((prev: number) => number)) => {
    const newEarnings =
      typeof newEarningsValue === "function"
        ? newEarningsValue(
            formValues.withVAT ? formValues.earnings : earningsWithoutVAT
          )
        : newEarningsValue;

    handleEarningsChange(newEarnings);
  };

  const handleExpensesChange = (value: number | ((prev: number) => number)) => {
    setValue(
      "expenses",
      typeof value === "function" ? value(formValues.expenses) : value
    );
  };

  const handleYearChange = (value: string | number) => {
    setValue("selectedYear", Number(value));
    setYearData(loadYearData(Number(value)));
  };

  const handleVATRateChange = (value: string | number) => {
    setValue("earningsVATRate", Number(value));
  };

  const handleFlatRateToggle = (checked: boolean | ((prev: boolean) => boolean)) => {
    const value = typeof checked === "function" ? checked(formValues.isFlatRate) : checked;
    baseFlatRateToggle(value);
  };

  const availableYears = getAvailableYears();
  
  const yearOptions = availableYears.map((year) => ({
    value: year,
    label: `${year}`,
  }));

  const vatRateOptions = yearData?.vatRates.map((rate) => ({
    value: rate / 100,
    label: `${rate} %`,
  })) || [];

  const flatRateDisabledTooltip = `Paušální výdaje nelze využívat s příjmy nad ${yearData.flatRate.limit.toLocaleString("cs-CZ")} Kč`;
  
  const formattedTaxBase = taxes.taxBase.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " Kč";

  return {
    formValues,
    setValue,
    
    yearData,
    
    disclaimerOpen,
    setDisclaimerOpen,
    faqOpen,
    setFaqOpen,
    
    earningsWithoutVAT,
    earningsWithVAT,
    taxes,
    flatTax,
    discountsInput,
    
    handleVATToggle,
    handleMoneyInputChange,
    handleExpensesChange,
    handleYearChange,
    handleVATRateChange,
    handleFlatRateToggle,
    handleFlatRateChange,
    
    yearOptions,
    vatRateOptions,
    flatRateDisabledTooltip,
    formattedTaxBase,
  };
}