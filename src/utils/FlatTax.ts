import type { YearData } from './YearData';

export interface FlatTaxResult {
  bandId: 1 | 2 | 3 | null;
  monthly: number;
  yearly: number;
}

export function computeFlatTax(yearData: YearData, income: number, flatRate: number): FlatTaxResult {
  const sorted = [...yearData.flatRate.bands].sort((a, b) => a.id - b.id);
  const band = sorted.find(b => b.incomeLimit >= income && b.expenseLimit <= flatRate);
  const monthly = band?.monthly ?? 0;
  const yearly = monthly * 12;
  return { bandId: band?.id ?? null, monthly, yearly };
}

