import { useState } from 'react'
import './App.css'
import Discount from './components/Discount'
import AdditionalInfo from './components/AdditionalInfo';
import ChildInput from './components/ChildInput';
import MoneyInput from './components/MoneyInput';
import VATInfo from './components/VATInfo';
import Dropdown from './components/Dropdown';
import { getAvailableYears, loadYearData, type YearData } from './utils/YearData';
import NonTaxableInput from './components/NonTaxableInput';
import ResultItem from './components/ResultItem';
import FormBox from './components/FormBox';
import PeriodToggle from './components/PeriodToggle';
import { useTaxCalculator } from './hooks/useTaxCalculator';
import type { DiscountsInput } from './utils/taxCalculator';
import { computeFlatTax } from './utils/FlatTax';

function App() {
  //base inputs
  const [earnings, setEarnings] = useState(0)
  const [expenses, setExpenses] = useState(0)
  const [withVAT, setWithVAT] = useState(false)
  const [isFlatRate, setIsFlatRate] = useState(false)
  const [flatRate, setFlatRate] = useState(0)
  const [isMonthly, setIsMonthly] = useState(false);

  //discounts
  const [taxpayerDiscount, setTaxpayerDiscount] = useState(true)
  const [spouseDiscount, setSpouseDiscount] = useState(false)
  const [spouseZTPDiscount, setSpouseZTPDiscount] = useState(false)
  const [disabledDiscount, setDisabledDiscount] = useState(false)
  const [disabledThreeDiscount, setDisabledThreeDiscount] = useState(false)
  const [ztpDiscount, setZtpDiscount] = useState(false)
  const [childrenDiscount, setChildrenDiscount] = useState(false)
  const [numberOfChildren, setNumberOfChildren] = useState(0)
  const [numberOfZtpChildren, setNumberOfZtpChildren] = useState(0)

  //expenses
  const [investmentInsurance, setInvestmentInsurance] = useState(0)
  const [interestPaid, setInterestPaid] = useState(0)
  const [otherExpenses, setOtherExpenses] = useState(0)

  //year data
  const availableYears: number[] = getAvailableYears();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [yearData, setYearData] = useState<YearData>(loadYearData(Number(selectedYear)));

  //vat calculations
  const [earningsVATRate, setEarningsVATRate] = useState((yearData.vatRates[yearData.vatRates.length - 1]) / 100)
  const earningsWithoutVAT = withVAT ? earnings / (1 + earningsVATRate) : earnings;
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
  const diffMonthly = Math.round(diffYearly / 12);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
        <h1 style={{ marginLeft: '15%' }}>Kalkulačka</h1>
        <Dropdown
          label="Rok" 
          value={selectedYear}
          onChange={value => {setSelectedYear(Number(value)); setYearData(loadYearData(Number(value)))}}
          options={availableYears.map(year => ({ value: year, label: String(year) }))}
        />
      </div>
      <div className="card">
        <AdditionalInfo isChecked={withVAT} setIsChecked={(checked) => { 
          setWithVAT(checked); 
          if (isFlatRate) {
            const newEarningsWithoutVAT = checked ? earnings / (1 + earningsVATRate) : earnings;
            setExpenses(Math.round(newEarningsWithoutVAT * (Number(flatRate) / 100))); 
          }
        }} text="s DPH" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
            <MoneyInput number={earnings} setNumber={(number) => { 
              const newEarnings = Number(number);
              setEarnings(newEarnings); 
              if (isFlatRate) {
                const newEarningsWithoutVAT = withVAT ? newEarnings / (1 + earningsVATRate) : newEarnings;
                setExpenses(Math.round(newEarningsWithoutVAT * (Number(flatRate) / 100))); 
              }
            }} text="Příjmy:" />
            <Dropdown
              value={earningsVATRate}
              onChange={value => setEarningsVATRate(Number(value))}
              options={
                yearData?.vatRates.map(rate => ({ value: rate / 100, label: `${rate} %` })) || []
              }
            />
          </div>
        <VATInfo amount={withVAT ? earningsWithoutVAT : earningsWithVAT} withVAT={withVAT} />
        <AdditionalInfo isChecked={isFlatRate} setIsChecked={(checked) => { setIsFlatRate(checked); if (!checked) setFlatRate(0); }} text="Paušální výdaje" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
            <MoneyInput number={expenses} setNumber={setExpenses} text="Výdaje:" disabled={isFlatRate} />
            {isFlatRate && <Dropdown
              value={flatRate}
              onChange={value => {setFlatRate(Number(value)); setExpenses(Math.round(earningsWithoutVAT * (Number(value) / 100))) }}
              options={
                [
                  { value: 30, label: '30 %' },
                  { value: 40, label: '40 %' },
                  { value: 60, label: '60 %' },
                  { value: 80, label: '80 %' }
                ]
              }
            />}
          </div>
        
        <h2>Slevy na dani</h2>
        <Discount isChecked={taxpayerDiscount} setIsChecked={setTaxpayerDiscount} text="Sleva na poplatníka" />
        <Discount isChecked={spouseDiscount} setIsChecked={setSpouseDiscount} text="Sleva na manžela/manželku pečující o dítě do 3 let" />
        {spouseDiscount ? (
          <AdditionalInfo isChecked={spouseZTPDiscount} setIsChecked={setSpouseZTPDiscount} text="Manžel/manželka se ZTP/P" />
        ) : (
          <div style={{ visibility: 'hidden', pointerEvents: 'none' }}>
            <AdditionalInfo isChecked={false} setIsChecked={() => {}} text="Manžel/manželka se ZTP/P" />
          </div>
        )}
        <Discount isChecked={disabledDiscount} setIsChecked={(checked) => { setDisabledDiscount(checked); if (checked) setDisabledThreeDiscount(false); }} text="Sleva pro invalidní důchod I. a II. Stupně" />
        <Discount isChecked={disabledThreeDiscount} setIsChecked={(checked) => { setDisabledThreeDiscount(checked); if (checked) setDisabledDiscount(false); }} text="Sleva pro invalidní důchod III. Stupně" />
        <Discount isChecked={ztpDiscount} setIsChecked={setZtpDiscount} text="Sleva pro držitele průkazu ZTP/P" />
        <Discount isChecked={childrenDiscount} setIsChecked={setChildrenDiscount} text="Sleva na dítě/děti" />
        {childrenDiscount ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 8 }}>
            <ChildInput number={numberOfChildren} setNumber={setNumberOfChildren} text="Počet dětí" maxNumber={20} />
            <ChildInput number={numberOfZtpChildren} setNumber={setNumberOfZtpChildren} text="Z toho ZTP/P" maxNumber={numberOfChildren} />
          </div>
        ) : <div style={{ visibility : 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 8 }}>
            <ChildInput number={numberOfChildren} setNumber={setNumberOfChildren} text="Počet dětí" maxNumber={20} />
            <ChildInput number={numberOfZtpChildren} setNumber={setNumberOfZtpChildren} text="Z toho ZTP/P" maxNumber={numberOfChildren} />
          </div>}
        
        <h2>Nezdanitelné částky</h2>
        <NonTaxableInput number={investmentInsurance} setNumber={setInvestmentInsurance} text="Zaplacené investiční připojištění:" />
        <NonTaxableInput number={interestPaid} setNumber={setInterestPaid} text="Zaplacené úroky:" />
        <NonTaxableInput number={otherExpenses} setNumber={setOtherExpenses} text="Ostatní:" />

    <div style={{ fontSize: '1.3em', marginTop: '2em'}}>
      <b>Základ daně</b><br />{taxes.taxBase.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} Kč
    </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'center' }}>
        <FormBox title="Odvody a daně">
          <ResultItem number={isMonthly ? Math.round(taxes.health / 12) : taxes.health} text="Zdravotní pojištění" />
          <ResultItem number={isMonthly ? Math.round(taxes.social / 12) : taxes.social} text="Důchodové pojištění" />
          <ResultItem number={isMonthly ? Math.round(taxes.tax / 12) : taxes.tax} text="Daň z příjmu" />
          <ResultItem number={isMonthly ? Math.round((taxes.health + taxes.social + taxes.tax) / 12) : taxes.health + taxes.social + taxes.tax} text="Celkem" />
          <PeriodToggle isMonthly={isMonthly} setIsMonthly={setIsMonthly} />
        </FormBox>

        {flatTax.bandId !== null && <FormBox title="Paušální daň">
          <div className="flatTax-container">
            <div><b>Pásmo paušální daně</b></div>
            <div className="flatTax-band">{flatTax.bandId ?? 0}</div>
          </div>
          <ResultItem number={flatTaxMonthly} text="Měsíční platba" />
          <ResultItem number={flatTaxYearly} text="Ročně celkem" />
          <ResultItem number={Math.round(diffMonthly)} text="Rozdíl měsíčně" />
          <ResultItem number={Math.round(diffYearly)} text="Rozdíl ročně" />
        </FormBox>}
      </div>
    </>
  )
}

export default App
