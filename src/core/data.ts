import type { YearData } from "./types.js";

export const AVAILABLE_YEARS = [2024, 2025, 2026] as const;

const YEAR_DATA: Record<number, YearData> = {
  2024: {
    year: 2024, vatRates: [12, 21],
    nonTaxableLimits: { investmentInsurance: 48000, interestPaid: 150000 },
    contributions: {
      health: { rate: 0.135, baseRatio: 0.5, minMonthly: 2968 },
      social: { rate: 0.292, baseRatio: 0.5, minMonthly: 3852 },
    },
    flatRate: {
      limit: 2000000,
      bands: [
        { id: 1, monthly: 7498,  incomeLimit: 1000000, expenseLimit: 0 },
        { id: 1, monthly: 7498,  incomeLimit: 1500000, expenseLimit: 60 },
        { id: 1, monthly: 7498,  incomeLimit: 2000000, expenseLimit: 80 },
        { id: 2, monthly: 16745, incomeLimit: 1500000, expenseLimit: 0 },
        { id: 2, monthly: 16745, incomeLimit: 2000000, expenseLimit: 60 },
        { id: 3, monthly: 27139, incomeLimit: 2000000, expenseLimit: 0 },
      ],
    },
    discounts: {
      taxpayer: 30840, spouse: 24840, spouseZTP: 2,
      disabled: 2520, disabledThree: 5040, ztp: 16140,
      child: { first: 15204, second: 22320, third: 27840 }, childZTP: 2,
    },
    taxBrackets: [{ limit: 1582812, rate: 15 }, { limit: null, rate: 23 }],
  },
  2025: {
    year: 2025, vatRates: [12, 21],
    nonTaxableLimits: { investmentInsurance: 48000, interestPaid: 150000 },
    contributions: {
      health: { rate: 0.135, baseRatio: 0.5, minMonthly: 3143 },
      social: { rate: 0.292, baseRatio: 0.5, minMonthly: 4759 },
    },
    flatRate: {
      limit: 2000000,
      bands: [
        { id: 1, monthly: 8716,  incomeLimit: 1000000, expenseLimit: 0 },
        { id: 1, monthly: 8716,  incomeLimit: 1500000, expenseLimit: 60 },
        { id: 1, monthly: 8716,  incomeLimit: 2000000, expenseLimit: 80 },
        { id: 2, monthly: 16745, incomeLimit: 1500000, expenseLimit: 0 },
        { id: 2, monthly: 16745, incomeLimit: 2000000, expenseLimit: 60 },
        { id: 3, monthly: 27139, incomeLimit: 2000000, expenseLimit: 0 },
      ],
    },
    discounts: {
      taxpayer: 30840, spouse: 24840, spouseZTP: 2,
      disabled: 2520, disabledThree: 5040, ztp: 16140,
      child: { first: 15204, second: 22320, third: 27840 }, childZTP: 2,
    },
    taxBrackets: [{ limit: 1676052, rate: 15 }, { limit: null, rate: 23 }],
  },
  2026: {
    year: 2026, vatRates: [12, 21],
    nonTaxableLimits: { investmentInsurance: 48000, interestPaid: 150000 },
    contributions: {
      health: { rate: 0.135, baseRatio: 0.5, minMonthly: 3306 },
      social: { rate: 0.292, baseRatio: 0.5, minMonthly: 5720 },
    },
    flatRate: {
      limit: 2000000,
      bands: [
        { id: 1, monthly: 9984,  incomeLimit: 1000000, expenseLimit: 0 },
        { id: 1, monthly: 9984,  incomeLimit: 1500000, expenseLimit: 60 },
        { id: 1, monthly: 9984,  incomeLimit: 2000000, expenseLimit: 80 },
        { id: 2, monthly: 16745, incomeLimit: 1500000, expenseLimit: 0 },
        { id: 2, monthly: 16745, incomeLimit: 2000000, expenseLimit: 60 },
        { id: 3, monthly: 27139, incomeLimit: 2000000, expenseLimit: 0 },
      ],
    },
    discounts: {
      taxpayer: 30840, spouse: 24840, spouseZTP: 2,
      disabled: 2520, disabledThree: 5040, ztp: 16140,
      child: { first: 15204, second: 22320, third: 27840 }, childZTP: 2,
    },
    taxBrackets: [{ limit: 1762812, rate: 15 }, { limit: null, rate: 23 }],
  },
};

export function loadYearData(year: number): YearData {
  const data = YEAR_DATA[year];
  if (!data) throw new Error(`No tax data for year ${year}. Available: ${AVAILABLE_YEARS.join(", ")}`);
  return data;
}

export function getAvailableYears(): number[] {
  return [...AVAILABLE_YEARS].sort((a, b) => a - b);
}
