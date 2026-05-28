import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
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
import LanguageToggle from "./components/LanguageToggle";
import { useAppForm } from "./hooks/useAppForm";
import { useDocumentMeta } from "./i18n/useDocumentMeta";
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
  const { t } = useTranslation("common");
  useDocumentMeta();

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
        <HeaderTitle>{t("appTitle")}</HeaderTitle>
        <HeaderActions>
          <LanguageToggle />
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
          text={t("withVAT")}
        />

        <InputRow>
          <MoneyInput
            number={
              formValues.withVAT ? formValues.earnings : earningsWithoutVAT
            }
            setNumber={handleMoneyInputChange}
            text={t("income")}
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
          text={t("flatRateExpenses")}
        />

        <InputRow>
          <MoneyInput
            number={formValues.expenses}
            setNumber={handleExpensesChange}
            text={t("expenses")}
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
            title={t("activeMonthsTooltip")}
            arrow
            enterTouchDelay={0}
            leaveTouchDelay={3000}
          >
            <MonthsLabel>{t("activeMonths")}</MonthsLabel>
          </Tooltip>
          <Dropdown
            value={formValues.globalMonths}
            onChange={handleGlobalMonthsChange}
            options={Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: `${i + 1}` }))}
          />
        </MonthsRow>

        <DiscountSection formValues={formValues} setValue={setValue} />

        <NonTaxableSection formValues={formValues} setValue={setValue} nonTaxableLimits={yearData.nonTaxableLimits} />

        <TaxBaseDisplay>
          <b>{t("taxBase")}</b>
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
          {t("disclaimer")}
        </DisclaimerButton>
        <CoffeeButton
          onClick={() => window.open('https://www.buymeacoffee.com/martinmatousek', '_blank')}
        >
          {t("buyMeCoffee")}
        </CoffeeButton>
        <DisclaimerButton onClick={() => setFaqOpen(true)}>
          {t("faq")}
        </DisclaimerButton>
        <DisclaimerButton onClick={() => setMcpInfoOpen(true)}>
          {t("mcpServer")}
        </DisclaimerButton>
      </FooterContainer>
    </RootContainer>
  );
}

export default App;
