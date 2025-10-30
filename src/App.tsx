import { useState } from "react";
import "./App.css";
import Discount from "./components/Discount";
import AdditionalInfo from "./components/AdditionalInfo";
import ChildInput from "./components/ChildInput";
import MoneyInput from "./components/MoneyInput";
import VATInfo from "./components/VATInfo";
import Dropdown from "./components/Dropdown";
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
import type { DiscountsInput } from "./utils/taxCalculator";
import { computeFlatTax } from "./utils/FlatTax";

const DEFAULT_FLAT_RATE_PERCENTAGE = 60;
const PERCENTAGE_DIVISOR = 100;
const MONTHS_IN_YEAR = 12;
const MAX_CHILDREN = 20;
const CHILD_CARE_AGE_LIMIT = 3;

function App() {
  //base inputs
  const [earnings, setEarnings] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [withVAT, setWithVAT] = useState(false);
  const [isFlatRate, setIsFlatRate] = useState(false);
  const [flatRate, setFlatRate] = useState(0);
  const [isMonthly, setIsMonthly] = useState(false);

  //tmp values
  const [savedExpenses, setSavedExpenses] = useState(0);
  const [savedFlatRate, setSavedFlatRate] = useState(DEFAULT_FLAT_RATE_PERCENTAGE);

  //discounts
  const [taxpayerDiscount, setTaxpayerDiscount] = useState(true);
  const [spouseDiscount, setSpouseDiscount] = useState(false);
  const [spouseZTPDiscount, setSpouseZTPDiscount] = useState(false);
  const [disabledDiscount, setDisabledDiscount] = useState(false);
  const [disabledThreeDiscount, setDisabledThreeDiscount] = useState(false);
  const [ztpDiscount, setZtpDiscount] = useState(false);
  const [childrenDiscount, setChildrenDiscount] = useState(false);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [numberOfZtpChildren, setNumberOfZtpChildren] = useState(0);

  //expenses
  const [investmentInsurance, setInvestmentInsurance] = useState(0);
  const [interestPaid, setInterestPaid] = useState(0);
  const [otherExpenses, setOtherExpenses] = useState(0);

  //year data
  const availableYears: number[] = getAvailableYears();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [yearData, setYearData] = useState<YearData>(
    loadYearData(Number(selectedYear))
  );

  //vat calculations
  const [earningsVATRate, setEarningsVATRate] = useState(
    yearData.vatRates[yearData.vatRates.length - 1] / 100
  );
  const earningsWithoutVAT = withVAT
    ? earnings / (1 + earningsVATRate)
    : earnings;
  const earningsWithVAT = withVAT ? earnings : earnings * (1 + earningsVATRate);

  const discountsInput: DiscountsInput = {
    taxpayer: taxpayerDiscount,
    spouse: spouseDiscount,
    spouseZTP: spouseZTPDiscount,
    disabled: disabledDiscount,
    disabledThree: disabledThreeDiscount,
    ztp: ztpDiscount,
    children: {
      enabled: childrenDiscount,
      count: numberOfChildren,
      ztpCount: numberOfZtpChildren,
    },
  };

  const taxes = useTaxCalculator({
    yearData,
    earningsWithoutVAT,
    expenses,
    discounts: discountsInput,
    investmentInsurance,
    interestPaid,
    otherExpenses,
  });

  const flatTax = computeFlatTax(yearData, earningsWithoutVAT, flatRate);
  const flatTaxMonthly = flatTax.monthly;
  const flatTaxYearly = flatTax.yearly;
  const totalStandardYearly = taxes.health + taxes.social + taxes.tax;
  const diffYearly = flatTaxYearly - totalStandardYearly;
  const diffMonthly = Math.round(diffYearly / MONTHS_IN_YEAR);

  return (
    <>
      <div className="header-container">
        <h1 className="header-title">Kalkulačka</h1>
        <Dropdown
          label="Rok"
          value={selectedYear}
          onChange={(value) => {
            setSelectedYear(Number(value));
            setYearData(loadYearData(Number(value)));
          }}
          options={availableYears.map((year) => ({
            value: year,
            label: String(year),
          }))}
        />
      </div>
      <div className="card">
        <AdditionalInfo
          isChecked={withVAT}
          setIsChecked={(checked) => {
            setWithVAT(checked);
            const newEarningsWithoutVAT = checked
              ? earnings / (1 + earningsVATRate)
              : earnings;

            if (newEarningsWithoutVAT > yearData.flatRate.limit && isFlatRate) {
              setSavedFlatRate(flatRate);
              setIsFlatRate(false);
              setFlatRate(0);
              setExpenses(savedExpenses);
            } else if (isFlatRate) {
              setExpenses(
                Math.round(newEarningsWithoutVAT * (Number(flatRate) / PERCENTAGE_DIVISOR))
              );
            }
          }}
          text="s DPH"
        />
        <div className="input-row">
          <MoneyInput
            number={earnings}
            setNumber={(number) => {
              const newEarnings = Number(number);
              setEarnings(newEarnings);

              const newEarningsWithoutVAT = withVAT
                ? newEarnings / (1 + earningsVATRate)
                : newEarnings;

              if (
                newEarningsWithoutVAT > yearData.flatRate.limit &&
                isFlatRate
              ) {
                setSavedFlatRate(flatRate);
                setIsFlatRate(false);
                setFlatRate(0);
                setExpenses(savedExpenses);
              } else if (isFlatRate) {
                setExpenses(
                  Math.round(newEarningsWithoutVAT * (Number(flatRate) / PERCENTAGE_DIVISOR))
                );
              }
            }}
            text="Příjmy:"
          />
          <Dropdown
            value={earningsVATRate}
            onChange={(value) => setEarningsVATRate(Number(value))}
            options={
              yearData?.vatRates.map((rate) => ({
                value: rate / 100,
                label: `${rate} %`,
              })) || []
            }
          />
        </div>
        <VATInfo
          amount={withVAT ? earningsWithoutVAT : earningsWithVAT}
          withVAT={withVAT}
        />
        <AdditionalInfo
          isChecked={isFlatRate}
          disabled={earningsWithoutVAT > yearData.flatRate.limit}
          disabledTooltip={`Paušální výdaje nelze využívat s příjmy nad ${yearData.flatRate.limit.toLocaleString(
            "cs-CZ"
          )} Kč`}
          setIsChecked={(checked) => {
            setIsFlatRate(checked);
            if (!checked) {
              setSavedFlatRate(flatRate);
              setFlatRate(0);
              setExpenses(savedExpenses);
            } else {
              setSavedExpenses(expenses);
              const rateToUse = savedFlatRate;
              setFlatRate(rateToUse);
              setExpenses(Math.round(earningsWithoutVAT * (rateToUse / PERCENTAGE_DIVISOR)));
            }
          }}
          text="Paušální výdaje"
        />
        {earningsWithoutVAT > yearData.flatRate.limit &&
          isFlatRate &&
          (() => {
            setIsFlatRate(false);
            setSavedFlatRate(flatRate);
            setFlatRate(0);
            setExpenses(savedExpenses);
            return null;
          })()}
        <div className="input-row">
          <MoneyInput
            number={expenses}
            setNumber={setExpenses}
            text="Výdaje:"
            disabled={isFlatRate}
          />
          {isFlatRate && (
            <Dropdown
              value={flatRate}
              onChange={(value) => {
                setFlatRate(Number(value));
                setExpenses(
                  Math.round(earningsWithoutVAT * (Number(value) / PERCENTAGE_DIVISOR))
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
        </div>

        <h2>Slevy na dani</h2>
        <Discount
          isChecked={taxpayerDiscount}
          setIsChecked={setTaxpayerDiscount}
          text="Sleva na poplatníka"
        />
        <Discount
          isChecked={spouseDiscount}
          setIsChecked={setSpouseDiscount}
          text={`Sleva na manžela/manželku pečující o dítě do ${CHILD_CARE_AGE_LIMIT} let`}
        />
        {spouseDiscount ? (
          <AdditionalInfo
            isChecked={spouseZTPDiscount}
            setIsChecked={setSpouseZTPDiscount}
            text="Manžel/manželka se ZTP/P"
          />
        ) : (
          <div className="hidden-input">
            <AdditionalInfo
              isChecked={false}
              setIsChecked={() => {}}
              text="Manžel/manželka se ZTP/P"
            />
          </div>
        )}
        <Discount
          isChecked={disabledDiscount}
          setIsChecked={(checked) => {
            setDisabledDiscount(checked);
            if (checked) setDisabledThreeDiscount(false);
          }}
          text="Sleva pro invalidní důchod I. a II. Stupně"
        />
        <Discount
          isChecked={disabledThreeDiscount}
          setIsChecked={(checked) => {
            setDisabledThreeDiscount(checked);
            if (checked) setDisabledDiscount(false);
          }}
          text="Sleva pro invalidní důchod III. Stupně"
        />
        <Discount
          isChecked={ztpDiscount}
          setIsChecked={setZtpDiscount}
          text="Sleva pro držitele průkazu ZTP/P"
        />
        <Discount
          isChecked={childrenDiscount}
          setIsChecked={setChildrenDiscount}
          text="Sleva na dítě/děti"
        />
        {childrenDiscount ? (
          <div className="children-input-container">
            <ChildInput
              number={numberOfChildren}
              setNumber={setNumberOfChildren}
              text="Počet dětí"
              maxNumber={MAX_CHILDREN}
            />
            <ChildInput
              number={numberOfZtpChildren}
              setNumber={setNumberOfZtpChildren}
              text="Z toho ZTP/P"
              maxNumber={numberOfChildren}
            />
          </div>
        ) : (
          <div className="children-input-container-hidden">
            <ChildInput
              number={numberOfChildren}
              setNumber={setNumberOfChildren}
              text="Počet dětí"
              maxNumber={MAX_CHILDREN}
            />
            <ChildInput
              number={numberOfZtpChildren}
              setNumber={setNumberOfZtpChildren}
              text="Z toho ZTP/P"
              maxNumber={numberOfChildren}
            />
          </div>
        )}

        <h2>Nezdanitelné částky</h2>
        <NonTaxableInput
          number={investmentInsurance}
          setNumber={setInvestmentInsurance}
          text="Zaplacené investiční připojištění:"
        />
        <NonTaxableInput
          number={interestPaid}
          setNumber={setInterestPaid}
          text="Zaplacené úroky:"
        />
        <NonTaxableInput
          number={otherExpenses}
          setNumber={setOtherExpenses}
          text="Ostatní:"
        />

        <div className="tax-base-display">
          <b>Základ daně</b>
          <br />
          {taxes.taxBase.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Kč
        </div>
      </div>

      <div className="results-container">
        <FormBox title="Odvody a daně">
          <ResultItem
            number={isMonthly ? Math.round(taxes.health / MONTHS_IN_YEAR) : taxes.health}
            text="Zdravotní pojištění"
          />
          <ResultItem
            number={isMonthly ? Math.round(taxes.social / MONTHS_IN_YEAR) : taxes.social}
            text="Důchodové pojištění"
          />
          <ResultItem
            number={isMonthly ? Math.round(taxes.tax / MONTHS_IN_YEAR) : taxes.tax}
            text="Daň z příjmu"
          />
          <ResultItem
            number={
              isMonthly
                ? Math.round((taxes.health + taxes.social + taxes.tax) / MONTHS_IN_YEAR)
                : taxes.health + taxes.social + taxes.tax
            }
            text="Celkem"
          />
          <PeriodToggle isMonthly={isMonthly} setIsMonthly={setIsMonthly} />
        </FormBox>

        {flatTax.bandId !== null && (
          <FormBox title="Paušální daň">
            <div className="flatTax-container">
              <div>
                <b>Pásmo paušální daně</b>
              </div>
              <div className="flatTax-band">{flatTax.bandId ?? 0}</div>
            </div>
            <ResultItem number={flatTaxMonthly} text="Měsíční platba" />
            <ResultItem number={flatTaxYearly} text="Ročně celkem" />
            <ResultItem
              number={Math.round(diffMonthly)}
              text="Rozdíl měsíčně"
            />
            <ResultItem number={Math.round(diffYearly)} text="Rozdíl ročně" />
          </FormBox>
        )}
      </div>
    </>
  );
}

export default App;
