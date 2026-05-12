import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogActions, Button } from '@mui/material';
import { loadYearData } from '../core/data';
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledAccordion,
  StyledAccordionSummary,
  StyledAccordionDetails,
  QuestionText,
  AnswerText,
  OfficialLink,
} from '../styles/FAQ.styles';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  link: string;
  linkText: string;
}

interface FAQProps {
  open: boolean;
  onClose: () => void;
}

const FAQ: React.FC<FAQProps> = ({ open, onClose }) => {
  const { t, i18n } = useTranslation('faq');
  const [expanded, setExpanded] = useState<number | false>(false);

  const yearData = useMemo(() => {
    const year = new Date().getFullYear();
    try { return loadYearData(year); } catch { return loadYearData(2025); }
  }, []);

  const interpolation = useMemo(() => {
    const year = yearData.year;
    const bands = yearData.flatRate.bands;
    const band1 = bands.find(b => b.id === 1)!.monthly.toLocaleString('cs-CZ');
    const band2 = bands.find(b => b.id === 2)!.monthly.toLocaleString('cs-CZ');
    const band3 = bands.find(b => b.id === 3)!.monthly.toLocaleString('cs-CZ');
    const taxpayer = yearData.discounts.taxpayer.toLocaleString('cs-CZ');
    const social = (yearData.contributions?.social?.rate ?? 0.292) * 100;
    const health = (yearData.contributions?.health?.rate ?? 0.135) * 100;
    const vatRates = [...yearData.vatRates].sort((a, b) => a - b);
    const vatReduced = vatRates[0];
    const vatStandard = vatRates[vatRates.length - 1];
    return { year, band1, band2, band3, taxpayer, social, health, vatReduced, vatStandard };
  }, [yearData]);

  const faqItems = useMemo(() => {
    const raw = t('items', { returnObjects: true }) as FAQItem[];
    return raw.map(item => ({
      ...item,
      question: t(`items.${item.id - 1}.question`, interpolation),
      answer: t(`items.${item.id - 1}.answer`, interpolation),
      linkText: t(`items.${item.id - 1}.linkText`, interpolation),
    }));
  }, [t, interpolation]);

  useEffect(() => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/\n/g, ' ') },
      })),
    };
    let script = document.getElementById('faq-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'faq-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
    return () => { document.getElementById('faq-jsonld')?.remove(); };
  }, [i18n.language, faqItems]);

  const handleChange = (panel: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      disableRestoreFocus={true}
      disableEnforceFocus={false}
      keepMounted={false}
    >
      <StyledDialogTitle>{t('title')}</StyledDialogTitle>
      <StyledDialogContent>
        {faqItems.map((faq) => (
          <StyledAccordion
            key={faq.id}
            expanded={expanded === faq.id}
            onChange={handleChange(faq.id)}
          >
            <StyledAccordionSummary
              expandIcon={<span style={{ fontSize: '1.2em', transform: expanded === faq.id ? 'rotate(édeg)' : 'rotate(0deg)', transition: 'transform 0.4s' }}>{expanded === faq.id ? '-' : '+'}</span>}
              aria-controls={`panel${faq.id}-content`}
              id={`panel${faq.id}-header`}
            >
              <QuestionText>{faq.question}</QuestionText>
            </StyledAccordionSummary>
            <StyledAccordionDetails>
              <AnswerText style={{ whiteSpace: 'pre-line' }}>{faq.answer}</AnswerText>
              <OfficialLink href={faq.link} target="_blank" rel="noopener noreferrer">
                {faq.linkText} ↗
              </OfficialLink>
            </StyledAccordionDetails>
          </StyledAccordion>
        ))}
      </StyledDialogContent>
      <DialogActions sx={{ backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.grey[900] : "#f9f9f9", borderTop: (theme) => `1px solid ${theme.palette.divider}`, padding: "16px 24px" }}>
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: (theme) => theme.palette.success.main,
            color: (theme) => theme.palette.success.contrastText,
            padding: "0.5em 1.5em",
            borderRadius: "6px",
            textTransform: "none",
            fontSize: "0.95em",
            "&:hover": { backgroundColor: (theme) => theme.palette.success.dark },
          }}
        >
          {t('close')}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default FAQ;
