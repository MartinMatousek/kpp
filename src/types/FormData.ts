export interface FormData {
  earnings: number;
  expenses: number;
  withVAT: boolean;
  isFlatRate: boolean;
  flatRate: number;
  isMonthly: boolean;

  taxpayerDiscount: boolean;
  spouseDiscount: boolean;
  spouseZTPDiscount: boolean;
  disabledDiscount: boolean;
  disabledThreeDiscount: boolean;
  ztpDiscount: boolean;
  childrenDiscount: boolean;
  numberOfChildren: number;
  numberOfZtpChildren: number;

  investmentInsurance: number;
  interestPaid: number;
  otherExpenses: number;

  selectedYear: number;
  earningsVATRate: number;
}