import type { YearData } from "./YearData";
import {
  HEALTH_BASE_RATIO,
  SOCIAL_BASE_RATIO,
  DEFAULT_HEALTH_RATE,
  DEFAULT_SOCIAL_RATE,
  MONTHS_IN_YEAR,
  PERCENTAGE_DIVISOR,
  CHILD_DISCOUNT_THRESHOLD_SECOND,
  CHILD_DISCOUNT_THRESHOLD_THIRD,
} from "../AppConstants";

export interface ChildrenDiscountInput {
	enabled: boolean;
	count: number;
	ztpCount: number;
}

export interface DiscountsInput {
	taxpayer: boolean;
	spouse: boolean;
	spouseZTP: boolean;
	disabled: boolean;
	disabledThree: boolean;
	ztp: boolean;
	children: ChildrenDiscountInput;
	taxpayerMonths: number;
	spouseMonths: number;
	disabledMonths: number;
	disabledThreeMonths: number;
	ztpMonths: number;
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

const round = (n: number) => Math.round(n);

export function computeTax(input: TaxInput): TaxOutput {
	const {
		yearData,
		earningsWithoutVAT,
		expenses,
		discounts,
		investmentInsurance,
		interestPaid,
		otherExpenses,
		globalMonths,
	} = input;

	const profit = earningsWithoutVAT - expenses;
	const nonTaxables = investmentInsurance + interestPaid + otherExpenses;
	const taxBaseYear = Math.max(0, profit - nonTaxables);

	const tax = Math.max(0, round(progressiveTax(yearData, taxBaseYear) - computeDiscounts(yearData, discounts)));

	const healthYear = computeContribution(yearData, profit, 'health', globalMonths);
	const socialYear = computeContribution(yearData, profit, 'social', globalMonths);

	return {
		taxBase: round(taxBaseYear),
		health: round(healthYear),
		social: round(socialYear),
		tax: round(tax),
	};
}

function progressiveTax(yearData: YearData, base: number): number {
	let remaining = base;
	let prevLimit = 0;
	let tax = 0;
	for (const b of yearData.taxBrackets) {
		const limit = b.limit == null ? Infinity : b.limit;
		if (remaining <= 0) break;
		const span = Math.min(remaining, limit - prevLimit);
		if (span > 0) {
			tax += span * (b.rate / PERCENTAGE_DIVISOR);
			remaining -= span;
			prevLimit = limit;
		}
		if (b.limit == null) break;
	}
	return tax;
}

function computeDiscounts(yearData: YearData, d: DiscountsInput): number {
	const ds = yearData.discounts;
	const taxpayer = d.taxpayer ? round(ds.taxpayer * d.taxpayerMonths / MONTHS_IN_YEAR) : 0;
	const spouse = d.spouse ? round(ds.spouse * (d.spouseZTP ? ds.spouseZTP : 1) * d.spouseMonths / MONTHS_IN_YEAR) : 0;
	const disabled = d.disabled ? round(ds.disabled * d.disabledMonths / MONTHS_IN_YEAR) : 0;
	const disabledThree = d.disabledThree ? round(ds.disabledThree * d.disabledThreeMonths / MONTHS_IN_YEAR) : 0;
	const ztp = d.ztp ? round(ds.ztp * d.ztpMonths / MONTHS_IN_YEAR) : 0;

	const childCount = d.children.enabled ? Math.max(0, d.children.count) : 0;
	const ztpCount = d.children.enabled
		? Math.max(0, d.children.ztpCount)
		: 0;

	let childrenFull = 0;
	if (childCount >= 1) childrenFull += ds.child.first;
	if (childCount >= CHILD_DISCOUNT_THRESHOLD_SECOND) childrenFull += ds.child.second;
	if (childCount >= CHILD_DISCOUNT_THRESHOLD_THIRD) childrenFull += ds.child.third * (childCount - CHILD_DISCOUNT_THRESHOLD_SECOND);

	if (ztpCount >= 1) childrenFull += ds.child.first;
	if (ztpCount >= CHILD_DISCOUNT_THRESHOLD_SECOND) childrenFull += ds.child.second;
	if (ztpCount >= CHILD_DISCOUNT_THRESHOLD_THIRD) childrenFull += ds.child.third * (ztpCount - CHILD_DISCOUNT_THRESHOLD_SECOND);

	const children = round(childrenFull * d.childrenMonths / MONTHS_IN_YEAR);

	return taxpayer + spouse + disabled + disabledThree + ztp + children;
}

function computeContribution(yearData: YearData, profit: number, kind: 'health' | 'social', months: number): number {
	const data = yearData.contributions?.[kind];
	const rate = data?.rate ?? (kind === 'health' ? DEFAULT_HEALTH_RATE : DEFAULT_SOCIAL_RATE);
	const baseRatio = data?.baseRatio ?? (kind === 'health' ? HEALTH_BASE_RATIO : SOCIAL_BASE_RATIO);
	const minMonthly = data?.minMonthly ?? 0;

	const yearly = profit * rate * baseRatio;
	const minYearly = minMonthly * months;
	return Math.max(yearly, minYearly);
}

