import AdditionalInfo from "./components/AdditionalInfo";
import MoneyInput from "./components/MoneyInput";
import VATInfo from "./components/VATInfo";
import Dropdown from "./components/Dropdown";
import Disclaimer from "./components/Disclaimer";
import DiscountSection from "./components/DiscountSection";
import NonTaxableSection from "./components/NonTaxableSection";
import TaxResults from "./components/TaxResults";
import FAQ from "./components/FAQ";
import { useAppForm } from "./hooks/useAppForm";
import { FLAT_RATE_OPTIONS } from "./AppConstants";
import {
  RootContainer,
  InputRow,
  TaxBaseDisplay,
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
} from "./styles/AppCards.styles";
import {
  DisclaimerButton,
  CoffeeButton,
} from "./styles/AppButtons.styles";
import { useTheme } from "./contexts/ThemeContext";

function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  const {
    formValues,
    setValue,
    
    yearData,
    
    disclaimerOpen,
    setDisclaimerOpen,
    faqOpen,
    setFaqOpen,
    
    earningsWithoutVAT,
    earningsWithVAT,
    taxes,
    flatTax,
    
    handleVATToggle,
    handleMoneyInputChange,
    handleExpensesChange,
    handleYearChange,
    handleVATRateChange,
    handleFlatRateToggle,
    handleFlatRateChange,
    
    yearOptions,
    vatRateOptions,
    flatRateDisabledTooltip,
    formattedTaxBase,
  } = useAppForm();

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
            onChange={handleYearChange}
            options={yearOptions}
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
          setIsChecked={handleVATToggle}
          text="s DPH"
        />
        
        <InputRow>
          <MoneyInput
            number={
              formValues.withVAT ? formValues.earnings : earningsWithoutVAT
            }
            setNumber={handleMoneyInputChange}
            text="Příjmy:"
          />
          <Dropdown
            value={formValues.earningsVATRate}
            onChange={handleVATRateChange}
            options={vatRateOptions}
          />
        </InputRow>

        <VATInfo
          amount={formValues.withVAT ? earningsWithoutVAT : earningsWithVAT}
          withVAT={formValues.withVAT}
        />

        <AdditionalInfo
          isChecked={formValues.isFlatRate}
          disabled={earningsWithoutVAT > yearData.flatRate.limit}
          disabledTooltip={flatRateDisabledTooltip}
          setIsChecked={handleFlatRateToggle}
          text="Paušální výdaje"
        />

        <InputRow>
          <MoneyInput
            number={formValues.expenses}
            setNumber={handleExpensesChange}
            text="Výdaje:"
            disabled={formValues.isFlatRate}
          />
          {formValues.isFlatRate && (
            <Dropdown
              value={formValues.flatRate}
              onChange={(value) => handleFlatRateChange(Number(value))}
              options={[...FLAT_RATE_OPTIONS]}
            />
          )}
        </InputRow>

        <DiscountSection formValues={formValues} setValue={setValue} />

        <NonTaxableSection formValues={formValues} setValue={setValue} />

        <TaxBaseDisplay>
          <b>Základ daně</b>
          <br />
          {formattedTaxBase}
        </TaxBaseDisplay>
      </Card>

      <TaxResults
        formValues={formValues}
        setValue={setValue}
        taxes={taxes}
        flatTax={flatTax}
      />

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