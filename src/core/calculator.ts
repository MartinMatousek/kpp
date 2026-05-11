import type { YearData, TaxInput, TaxOutput, DiscountsInput, FlatTaxResult, VATCalculationResult } from "./types.js";

const MONTHS_IN_YEAR = 12;
const PERCENTAGE_DIVISOR = 100;
const DEFAULT_HEALTH_RATE = 0.135;
const DEFAULT_SOCIAL_RATE = 0.292;
const DEFAULT_HEALTH_BASE_RATIO = 0.5;
const DEFAULT_SOCIAL_BASE_RATIO = 0.55;

const round = (n: number) => Math.round(n);

export function computeTax(input: TaxInput): TaxOutput {
  const { yearData, earningsWithoutVAT, expenses, discounts, investmentInsurance, interestPaid, otherExpenses, globalMonths } = input;
  const profit = earningsWithoutVAT - expenses;
  const taxBaseYear = Math.max(0, profit - investmentInsurance - interestPaid - otherExpenses);
  const tax = Math.max(0, round(progressiveTax(yearData, taxBaseYear) - computeDiscounts(yearData, discounts)));
  return {
    taxBase: round(taxBaseYear),
    health: round(computeContribution(yearData, profit, "health", globalMonths)),
    social: round(computeContribution(yearData, profit, "social", globalMonths)),
    tax,
  };
}

function progressiveTax(yearData: YearData, base: number): number {
  let remaining = base, prevLimit = 0, tax = 0;
  for (const b of yearData.taxBrackets) {
    const limit = b.limit == null ? Infinity : b.limit;
    if (remaining <= 0) break;
    const span = Math.min(remaining, limit - prevLimit);
    if (span > 0) { tax += span * (b.rate / PERCENTAGE_DIVISOR); remaining -= span; prevLimit = limit; }
    if (b.limit == null) break;
  }
  return tax;
}

function computeDiscounts(yearData: YearData, d: DiscountsInput): number {
  const ds = yearData.discounts;
  const taxpayer      = d.taxpayer      ? round(ds.taxpayer      * d.taxpayerMonths      / MONTHS_IN_YEAR) : 0;
  const spouse        = d.spouse        ? round(ds.spouse * (d.spouseZTP ? ds.spouseZTP : 1) * d.spouseMonths / MONTHS_IN_YEAR) : 0;
  const disabled      = d.disabled      ? round(ds.disabled      * d.disabledMonths      / MONTHS_IN_YEAR) : 0;
  const disabledThree = d.disabledThree ? round(ds.disabledThree * d.disabledThreeMonths / MONTHS_IN_YEAR) : 0;
  const ztp           = d.ztp           ? round(ds.ztp           * d.ztpMonths           / MONTHS_IN_YEAR) : 0;

  const c = d.children.enabled ? Math.max(0, d.children.count) : 0;
  const z = d.children.enabled ? Math.max(0, d.children.ztpCount) : 0;
  let cf = 0;
  if (c >= 1) cf += ds.child.first;
  if (c >= 2) cf += ds.child.second;
  if (c >= 3) cf += ds.child.third * (c - 2);
  if (z >= 1) cf += ds.child.first;
  if (z >= 2) cf += ds.child.second;
  if (z >= 3) cf += ds.child.third * (z - 2);

  return taxpayer + spouse + disabled + disabledThree + ztp + round(cf * d.childrenMonths / MONTHS_IN_YEAR);
}

function computeContribution(yearData: YearData, profit: number, kind: "health" | "social", months: number): number {
  const data = yearData.contributions?.[kind];
  const rate       = data?.rate       ?? (kind === "health" ? DEFAULT_HEALTH_RATE       : DEFAULT_SOCIAL_RATE);
  const baseRatio  = data?.baseRatio  ?? (kind === "health" ? DEFAULT_HEALTH_BASE_RATIO : DEFAULT_SOCIAL_BASE_RATIO);
  const minMonthly = data?.minMonthly ?? 0;
  return Math.max(profit * rate * baseRatio, minMonthly * months);
}

export function computeFlatTax(yearData: YearData, income: number, flatRate: number, months: number = MONTHS_IN_YEAR): FlatTaxResult {
  const band = [...yearData.flatRate.bands]
    .sort((a, b) => a.id - b.id)
    .find(b => b.incomeLimit >= income && b.expenseLimit <= flatRate);
  const monthly = band?.monthly ?? 0;
  return { bandId: band?.id ?? null, monthly, yearly: monthly * months };
}

export function calculateVATAmounts(earnings: number, withVAT: boolean, vatRate: number): VATCalculationResult {
  const divisor = 1 + vatRate / 100;
  const earningsWithoutVAT = withVAT ? earnings / divisor : earnings;
  const earningsWithVAT    = withVAT ? earnings : earnings * divisor;
  return { earningsWithoutVAT, earningsWithVAT };
}
