export interface YearData {
  year: number;
  vatRates: number[];
  contributions?: {
    health?: {
      rate: number;
      baseRatio: number;
      minMonthly: number;
    };
    social?: {
      rate: number;
      baseRatio: number;
      minMonthly: number;
    };
  };
  flatRate: {
    bands: Array<{
      id: 1 | 2 | 3;
      monthly: number;
      incomeLimit: number;
      expenseLimit: number;
    }>;
  };
  discounts: {
    taxpayer: number;
    spouse: number;
    spouseZTP: number;
    disabled: number;
    disabledThree: number;
    ztp: number;
    child: {
      first: number;
      second: number;
      third: number;
    };
    childZTP: number;
  };
  taxBrackets: Array<{
    limit: number | null;
    rate: number;
  }>;
}

export function loadYearData(year: number): YearData {
  const modules = import.meta.glob('../data/*.json', { eager: true, import: 'default' }) as Record<string, YearData>;
  const entry = Object.entries(modules).find(([path]) => path.endsWith(`/${year}.json`));
  if (!entry) {
    throw new Error(`Year data not found for ${year}`);
  }
  return entry[1];
}

export function getAvailableYears(): number[] {
  const modules = import.meta.glob('../data/*.json', { eager: true });
  return Object.keys(modules)
    .map((path) => {
      const match = path.match(/(\d{4})\.json$/);
      return match ? parseInt(match[1], 10) : null;
    })
    .filter((year): year is number => year !== null)
    .sort((a, b) => a - b);
}
