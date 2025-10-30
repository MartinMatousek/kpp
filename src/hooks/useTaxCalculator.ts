import { useMemo } from 'react';
import { computeTax, type TaxInput, type TaxOutput } from '../utils/TaxCalculator';

export function useTaxCalculator(input: TaxInput): TaxOutput {
  return useMemo(() => computeTax(input), [
    input.yearData,
    input.earningsWithoutVAT,
    input.expenses,
    input.discounts?.taxpayer,
    input.discounts?.spouse,
    input.discounts?.spouseZTP,
    input.discounts?.disabled,
    input.discounts?.disabledThree,
    input.discounts?.ztp,
    input.discounts?.children?.enabled,
    input.discounts?.children?.count,
    input.discounts?.children?.ztpCount,
    input.investmentInsurance,
    input.interestPaid,
    input.otherExpenses,
  ]);
}
