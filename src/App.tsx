import { useState } from "react";
import { useForm } from "react-hook-form";
import Discount from "./components/Discount";
import AdditionalInfo from "./components/AdditionalInfo";
import ChildInput from "./components/ChildInput";
import MoneyInput from "./components/MoneyInput";
import VATInfo from "./components/VATInfo";
import Dropdown from "./components/Dropdown";
import Disclaimer from "./components/Disclaimer";
import {
  getAvailableYears,
  loadYearData,
  type YearData,
} from "./utils/YearData";
import NonTaxableInput from "./components/NonTaxableInput";
import ResultItem from "./components/ResultItem";
import FormBox from "./components/FormBox";
import PeriodToggle from "./components/PeriodToggle";
import { useTaxCalculator } from "./hooks/useTaxCalculator";
import type { DiscountsInput } from "./utils/TaxCalculator";
import { computeFlatTax } from "./utils/FlatTax";
import {
  DEFAULT_FLAT_RATE_PERCENTAGE,
  PERCENTAGE_DIVISOR,
  MONTHS_IN_YEAR,
  MAX_CHILDREN,
  CHILD_CARE_AGE_LIMIT,
} from "./constants";
import {
  RootContainer,
  InputRow,
  HiddenInput,
  ChildrenInputContainer,
  ChildrenInputContainerHidden,
  TaxBaseDisplay,
  FlatTaxContainer,
  FlatTaxBand,
} from "./styles/AppLayout.styles";
import {
  HeaderContainer,
  HeaderTitle,
  HeaderActions,
  ThemeToggle,
  FooterContainer,
} from "./styles/AppHeader.styles";
import {
  Card,
  ResultsContainer,
} from "./styles/AppCards.styles";
import {
  DisclaimerButton,
  CoffeeButton,
} from "./styles/AppButtons.styles";
import FAQ from "./components/FAQ";
import { useTheme } from "./contexts/ThemeContext";

interface FormData {
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

function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  const availableYears: number[] = getAvailableYears();
  const currentYear = new Date().getFullYear();
  const initialYearData = loadYearData(currentYear);

  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

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
      earningsVATRate:
        initialYearData.vatRates[initialYearData.vatRates.length - 1] / 100,
    },
  });

  const formValues = watch();

  const [savedExpenses, setSavedExpenses] = useState(0);
  const [savedFlatRate, setSavedFlatRate] = useState(
    DEFAULT_FLAT_RATE_PERCENTAGE
  );

  const [yearData, setYearData] = useState<YearData>(initialYearData);

  const earningsWithoutVAT = formValues.withVAT
    ? formValues.earnings / (1 + formValues.earningsVATRate)
    : formValues.earnings;
  const earningsWithVAT = formValues.withVAT
    ? formValues.earnings
    : formValues.earnings * (1 + formValues.earningsVATRate);

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
  const flatTaxMonthly = flatTax.monthly;
  const flatTaxYearly = flatTax.yearly;
  const totalStandardYearly = taxes.health + taxes.social + taxes.tax;
  const diffYearly = flatTaxYearly - totalStandardYearly;
  const diffMonthly = Math.round(diffYearly / MONTHS_IN_YEAR);

  return (
    <RootContainer>
      <HeaderContainer>
        <HeaderTitle>Kalkulačka</HeaderTitle>
        <HeaderActions>
          <ThemeToggle onClick={toggleTheme}>
            {isDarkMode ? "☀️" : "🌘"}
          </ThemeToggle>
          <Dropdown
            value={formValues.selectedYear}
            onChange={(value) => {
              setValue("selectedYear", Number(value));
              setYearData(loadYearData(Number(value)));
            }}
            options={availableYears.map((year) => ({
              value: year,
              label: `${year}`,
            }))}
          />
        </HeaderActions>
      </HeaderContainer>

      <Disclaimer
        open={disclaimerOpen}
        onClose={() => setDisclaimerOpen(false)}
      />

      <Card>
        <AdditionalInfo
          isChecked={formValues.withVAT}
          setIsChecked={(checked) => {
            const value =
              typeof checked === "function"
                ? checked(formValues.withVAT)
                : checked;
            setValue("withVAT", value);
          }}
          text="s DPH"
        />
        <InputRow>
          <MoneyInput
            number={
              formValues.withVAT ? formValues.earnings : earningsWithoutVAT
            }
            setNumber={(newEarningsValue) => {
              const newEarnings =
                typeof newEarningsValue === "function"
                  ? newEarningsValue(
                      formValues.withVAT
                        ? formValues.earnings
                        : earningsWithoutVAT
                    )
                  : newEarningsValue;

              setValue("earnings", newEarnings);

              const newEarningsWithoutVAT = formValues.withVAT
                ? newEarnings / (1 + formValues.earningsVATRate)
                : newEarnings;

              if (
                newEarningsWithoutVAT > yearData.flatRate.limit &&
                formValues.isFlatRate
              ) {
                setSavedFlatRate(formValues.flatRate);
                setValue("isFlatRate", false);
                setValue("flatRate", 0);
                setValue("expenses", savedExpenses);
              } else if (formValues.isFlatRate) {
                setValue(
                  "expenses",
                  Math.round(
                    newEarningsWithoutVAT *
                      (Number(formValues.flatRate) / PERCENTAGE_DIVISOR)
                  )
                );
              }
            }}
            text="Příjmy:"
          />
          <Dropdown
            value={formValues.earningsVATRate}
            onChange={(value) => setValue("earningsVATRate", Number(value))}
            options={
              yearData?.vatRates.map((rate) => ({
                value: rate / 100,
                label: `${rate} %`,
              })) || []
            }
          />
        </InputRow>
        <VATInfo
          amount={formValues.withVAT ? earningsWithoutVAT : earningsWithVAT}
          withVAT={formValues.withVAT}
        />
        <AdditionalInfo
          isChecked={formValues.isFlatRate}
          disabled={earningsWithoutVAT > yearData.flatRate.limit}
          disabledTooltip={`Paušální výdaje nelze využívat s příjmy nad ${yearData.flatRate.limit.toLocaleString(
            "cs-CZ"
          )} Kč`}
          setIsChecked={(checked) => {
            const isChecked =
              typeof checked === "function"
                ? checked(formValues.isFlatRate)
                : checked;
            setValue("isFlatRate", isChecked);
            if (!isChecked) {
              setSavedFlatRate(formValues.flatRate);
              setValue("flatRate", 0);
              setValue("expenses", savedExpenses);
            } else {
              setSavedExpenses(formValues.expenses);
              const rateToUse = savedFlatRate;
              setValue("flatRate", rateToUse);
              setValue(
                "expenses",
                Math.round(
                  earningsWithoutVAT * (rateToUse / PERCENTAGE_DIVISOR)
                )
              );
            }
          }}
          text="Paušální výdaje"
        />
        {earningsWithoutVAT > yearData.flatRate.limit &&
          formValues.isFlatRate &&
          (() => {
            setValue("isFlatRate", false);
            setSavedFlatRate(formValues.flatRate);
            setValue("flatRate", 0);
            setValue("expenses", savedExpenses);
            return null;
          })()}
        <InputRow>
          <MoneyInput
            number={formValues.expenses}
            setNumber={(value) =>
              setValue(
                "expenses",
                typeof value === "function" ? value(formValues.expenses) : value
              )
            }
            text="Výdaje:"
            disabled={formValues.isFlatRate}
          />
          {formValues.isFlatRate && (
            <Dropdown
              value={formValues.flatRate}
              onChange={(value) => {
                setValue("flatRate", Number(value));
                setValue(
                  "expenses",
                  Math.round(
                    earningsWithoutVAT * (Number(value) / PERCENTAGE_DIVISOR)
                  )
                );
              }}
              options={[
                { value: 30, label: "30 %" },
                { value: 40, label: "40 %" },
                { value: 60, label: "60 %" },
                { value: 80, label: "80 %" },
              ]}
            />
          )}
        </InputRow>

        <h2>Slevy na dani</h2>
        <Discount
          isChecked={formValues.taxpayerDiscount}
          setIsChecked={(value) =>
            setValue(
              "taxpayerDiscount",
              typeof value === "function"
                ? value(formValues.taxpayerDiscount)
                : value
            )
          }
          text="Sleva na poplatníka"
        />
        <Discount
          isChecked={formValues.spouseDiscount}
          setIsChecked={(value) =>
            setValue(
              "spouseDiscount",
              typeof value === "function"
                ? value(formValues.spouseDiscount)
                : value
            )
          }
          text={`Sleva na manžela/manželku pečující o dítě do ${CHILD_CARE_AGE_LIMIT} let`}
        />
        {formValues.spouseDiscount ? (
          <AdditionalInfo
            isChecked={formValues.spouseZTPDiscount}
            setIsChecked={(value) =>
              setValue(
                "spouseZTPDiscount",
                typeof value === "function"
                  ? value(formValues.spouseZTPDiscount)
                  : value
              )
            }
            text="Manžel/manželka se ZTP/P"
          />
        ) : (
          <HiddenInput>
            <AdditionalInfo
              isChecked={false}
              setIsChecked={() => {}}
              text="Manžel/manželka se ZTP/P"
            />
          </HiddenInput>
        )}
        <Discount
          isChecked={formValues.disabledDiscount}
          setIsChecked={(value) => {
            const checked =
              typeof value === "function"
                ? value(formValues.disabledDiscount)
                : value;
            setValue("disabledDiscount", checked);
            if (checked) setValue("disabledThreeDiscount", false);
          }}
          text="Sleva pro invalidní důchod I. a II. Stupně"
        />
        <Discount
          isChecked={formValues.disabledThreeDiscount}
          setIsChecked={(value) => {
            const checked =
              typeof value === "function"
                ? value(formValues.disabledThreeDiscount)
                : value;
            setValue("disabledThreeDiscount", checked);
            if (checked) setValue("disabledDiscount", false);
          }}
          text="Sleva pro invalidní důchod III. Stupně"
        />
        <Discount
          isChecked={formValues.ztpDiscount}
          setIsChecked={(value) =>
            setValue(
              "ztpDiscount",
              typeof value === "function"
                ? value(formValues.ztpDiscount)
                : value
            )
          }
          text="Sleva pro držitele průkazu ZTP/P"
        />
        <Discount
          isChecked={formValues.childrenDiscount}
          setIsChecked={(value) =>
            setValue(
              "childrenDiscount",
              typeof value === "function"
                ? value(formValues.childrenDiscount)
                : value
            )
          }
          text="Sleva na dítě/děti"
        />
        {formValues.childrenDiscount ? (
          <ChildrenInputContainer>
            <ChildInput
              number={formValues.numberOfChildren}
              setNumber={(value) =>
                setValue(
                  "numberOfChildren",
                  typeof value === "function"
                    ? value(formValues.numberOfChildren)
                    : value
                )
              }
              text="Počet dětí"
              maxNumber={MAX_CHILDREN}
            />
            <ChildInput
              number={formValues.numberOfZtpChildren}
              setNumber={(value) =>
                setValue(
                  "numberOfZtpChildren",
                  typeof value === "function"
                    ? value(formValues.numberOfZtpChildren)
                    : value
                )
              }
              text="Z toho ZTP/P"
              maxNumber={formValues.numberOfChildren}
            />
          </ChildrenInputContainer>
        ) : (
          <ChildrenInputContainerHidden>
            <ChildInput
              number={formValues.numberOfChildren}
              setNumber={(value) =>
                setValue(
                  "numberOfChildren",
                  typeof value === "function"
                    ? value(formValues.numberOfChildren)
                    : value
                )
              }
              text="Počet dětí"
              maxNumber={MAX_CHILDREN}
            />
            <ChildInput
              number={formValues.numberOfZtpChildren}
              setNumber={(value) =>
                setValue(
                  "numberOfZtpChildren",
                  typeof value === "function"
                    ? value(formValues.numberOfZtpChildren)
                    : value
                )
              }
              text="Z toho ZTP/P"
              maxNumber={formValues.numberOfChildren}
            />
          </ChildrenInputContainerHidden>
        )}

        <h2>Nezdanitelné částky</h2>
        <NonTaxableInput
          number={formValues.investmentInsurance}
          setNumber={(value) =>
            setValue(
              "investmentInsurance",
              typeof value === "function"
                ? value(formValues.investmentInsurance)
                : value
            )
          }
          text="Zaplacené investiční připojištění:"
        />
        <NonTaxableInput
          number={formValues.interestPaid}
          setNumber={(value) =>
            setValue(
              "interestPaid",
              typeof value === "function"
                ? value(formValues.interestPaid)
                : value
            )
          }
          text="Zaplacené úroky:"
        />
        <NonTaxableInput
          number={formValues.otherExpenses}
          setNumber={(value) =>
            setValue(
              "otherExpenses",
              typeof value === "function"
                ? value(formValues.otherExpenses)
                : value
            )
          }
          text="Ostatní:"
        />

        <TaxBaseDisplay>
          <b>Základ daně</b>
          <br />
          {taxes.taxBase.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Kč
        </TaxBaseDisplay>
  </Card>
      <ResultsContainer>
        <FormBox title="Odvody a daně">
          <ResultItem
            number={
              formValues.isMonthly
                ? Math.round(taxes.health / MONTHS_IN_YEAR)
                : taxes.health
            }
            text="Zdravotní pojištění"
          />
          <ResultItem
            number={
              formValues.isMonthly
                ? Math.round(taxes.social / MONTHS_IN_YEAR)
                : taxes.social
            }
            text="Důchodové pojištění"
          />
          <ResultItem
            number={
              formValues.isMonthly
                ? Math.round(taxes.tax / MONTHS_IN_YEAR)
                : taxes.tax
            }
            text="Daň z příjmu"
          />
          <ResultItem
            number={
              formValues.isMonthly
                ? Math.round(
                    (taxes.health + taxes.social + taxes.tax) / MONTHS_IN_YEAR
                  )
                : taxes.health + taxes.social + taxes.tax
            }
            text="Celkem"
          />
          <PeriodToggle
            isMonthly={formValues.isMonthly}
            setIsMonthly={(value) => setValue("isMonthly", value)}
          />
        </FormBox>

        {flatTax.bandId !== null && (
          <FormBox title="Paušální daň">
            <FlatTaxContainer>
              <div>
                <b>Pásmo paušální daně</b>
              </div>
              <FlatTaxBand>{flatTax.bandId ?? 0}</FlatTaxBand>
            </FlatTaxContainer>
            <ResultItem number={flatTaxMonthly} text="Měsíční platba" />
            <ResultItem number={flatTaxYearly} text="Ročně celkem" />
            <ResultItem
              number={Math.round(diffMonthly)}
              text="Rozdíl měsíčně"
              isDifference={true}
            />
            <ResultItem
              number={Math.round(diffYearly)}
              text="Rozdíl ročně"
              isDifference={true}
            />
          </FormBox>
        )}
      </ResultsContainer>

      <FAQ 
        open={faqOpen}
        onClose={() => setFaqOpen(false)}
      />

      <FooterContainer>
        <DisclaimerButton onClick={() => setDisclaimerOpen(true)}>
          Vyloučení zodpovědnosti
        </DisclaimerButton>
        <DisclaimerButton onClick={() => setFaqOpen(true)}>
          Často kladené otázky
        </DisclaimerButton>
        <CoffeeButton 
          onClick={() => window.open('https://www.buymeacoffee.com/martinmatousek', '_blank')}
        >
          ☕ Kup mi kávu
        </CoffeeButton>
      </FooterContainer>
    </RootContainer>
  );
}

export default App;
