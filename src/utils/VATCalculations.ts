export interface VATCalculationResult {
  earningsWithoutVAT: number;
  earningsWithVAT: number;
}

export function calculateVATAmounts(
  earnings: number,
  withVAT: boolean,
  vatRate: number
): VATCalculationResult {
  const earningsWithoutVAT = withVAT
    ? earnings / (1 + vatRate)
    : earnings;
  
  const earningsWithVAT = withVAT
    ? earnings
    : earnings * (1 + vatRate);

  return {
    earningsWithoutVAT,
    earningsWithVAT,
  };
}