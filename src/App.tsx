import { Tooltip } from "@mui/material";
import AdditionalInfo from "./components/AdditionalInfo";
import MoneyInput from "./components/MoneyInput";
import VATInfo from "./components/VATInfo";
import Dropdown from "./components/Dropdown";
import Disclaimer from "./components/Disclaimer";
import DiscountSection from "./components/DiscountSection";
import NonTaxableSection from "./components/NonTaxableSection";
import TaxResults from "./components/TaxResults";
import FAQ from "./components/FAQ";
import McpInfo from "./components/McpInfo";
import { useAppForm } from "./hooks/useAppForm";
import { FLAT_RATE_OPTIONS } from "./AppConstants";
import {
  RootContainer,
  InputRow,
  TaxBaseDisplay,
  HiddenInput,
  MonthsRow,
  MonthsLabel,
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
    mcpInfoOpen,
    setMcpInfoOpen,
    
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
    handleGlobalMonthsChange,
    
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
          {formValues.isFlatRate ? (
            <Dropdown
              value={formValues.flatRate}
              onChange={(value) => handleFlatRateChange(Number(value))}
              options={[...FLAT_RATE_OPTIONS]}
            />
          ) : (
            <HiddenInput>
              <Dropdown
                value={formValues.flatRate}
                onChange={() => {}}
                options={[...FLAT_RATE_OPTIONS]}
              />
            </HiddenInput>
          )}
        </InputRow>

        <MonthsRow>
          <Tooltip
            title="Počet měsíců, po které bylo IČO aktivní. Ovlivňuje minimální odvody na zdravotní a sociální pojištění a výši paušální daně."
            arrow
            enterTouchDelay={0}
            leaveTouchDelay={3000}
          >
            <MonthsLabel>Počet aktivních měsíců IČO</MonthsLabel>
          </Tooltip>
          <Dropdown
            value={formValues.globalMonths}
            onChange={handleGlobalMonthsChange}
            options={Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: `${i + 1}` }))}
          />
        </MonthsRow>

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

      <McpInfo
        open={mcpInfoOpen}
        onClose={() => setMcpInfoOpen(false)}
      />

      <FooterContainer>
        <DisclaimerButton onClick={() => setDisclaimerOpen(true)}>
          Vyloučení zodpovědnosti
        </DisclaimerButton>
        <CoffeeButton 
          onClick={() => window.open('https://www.buymeacoffee.com/martinmatousek', '_blank')}
        >
          ☕ Kup mi kávu
        </CoffeeButton>
        <DisclaimerButton onClick={() => setFaqOpen(true)}>
          Často kladené otázky
        </DisclaimerButton>
        <DisclaimerButton onClick={() => setMcpInfoOpen(true)}>
          MCP Server
        </DisclaimerButton>
      </FooterContainer>
    </RootContainer>
  );
}

export default App;