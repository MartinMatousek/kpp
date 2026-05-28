export interface NonTaxableLimits {
  investmentInsurance: number;
  interestPaid: number;
}

export interface YearData {
  year: number;
  vatRates: number[];
  contributions?: {
    health?: { rate: number; baseRatio: number; minMonthly: number };
    social?: { rate: number; baseRatio: number; minMonthly: number };
  };
  nonTaxableLimits: NonTaxableLimits;
  flatRate: {
    limit: number;
    bands: Array<{ id: 1 | 2 | 3; monthly: number; incomeLimit: number; expenseLimit: number }>;
  };
  discounts: {
    taxpayer: number;
    spouse: number;
    spouseZTP: number;
    disabled: number;
    disabledThree: number;
    ztp: number;
    child: { first: number; second: number; third: number };
    childZTP: number;
  };
  taxBrackets: Array<{ limit: number | null; rate: number }>;
}

export interface ChildrenDiscountInput {
  enabled: boolean;
  count: number;
  ztpCount: number;
}

export interface DiscountsInput {
  taxpayer: boolean;
  taxpayerMonths: number;
  spouse: boolean;
  spouseMonths: number;
  spouseZTP: boolean;
  disabled: boolean;
  disabledMonths: number;
  disabledThree: boolean;
  disabledThreeMonths: number;
  ztp: boolean;
  ztpMonths: number;
  children: ChildrenDiscountInput;
  childrenMonths: number;
}

export interface TaxInput {
  yearData: YearData;
  earningsWithoutVAT: number;
  expenses: number;
  discounts: DiscountsInput;
  investmentInsurance: number;
  interestPaid: number;
  otherExpenses: number;
  globalMonths: number;
}

export interface TaxOutput {
  taxBase: number;
  health: number;
  social: number;
  tax: number;
}

export interface FlatTaxResult {
  bandId: 1 | 2 | 3 | null;
  monthly: number;
  yearly: number;
}

export interface VATCalculationResult {
  earningsWithoutVAT: number;
  earningsWithVAT: number;
}
