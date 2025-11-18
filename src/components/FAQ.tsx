import React, { useState } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography,
  Link 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { COLORS } from '../App.styles';

interface FAQProps {
  open: boolean;
  onClose: () => void;
}

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: "8px",
    maxWidth: "600px",
    width: "90vw",
    maxHeight: "80vh",
  },
});

const StyledDialogTitle = styled(DialogTitle)({
  backgroundColor: "#f0f0f0",
  borderBottom: `1px solid ${COLORS.border}`,
  fontSize: "1.3em",
  fontWeight: 600,
});

const StyledDialogContent = styled(DialogContent)({
  padding: "16px",
  marginTop: "16px",
  backgroundColor: COLORS.white,
});

const StyledAccordion = styled(Accordion)({
  marginBottom: "8px",
  border: `1px solid ${COLORS.border}`,
  borderRadius: "8px !important",
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: "8px 0",
  },
});

const StyledAccordionSummary = styled(AccordionSummary)({
  backgroundColor: COLORS.white,
  borderRadius: "8px",
  "&.Mui-expanded": {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  "& .MuiAccordionSummary-content": {
    margin: "12px 0",
    "&.Mui-expanded": {
      margin: "12px 0",
    },
  },
});

const StyledAccordionDetails = styled(AccordionDetails)({
  backgroundColor: "#f9f9f9",
  borderTop: `1px solid ${COLORS.border}`,
  padding: "16px 24px",
});

const QuestionText = styled(Typography)({
  fontWeight: 500,
  fontSize: "1em",
  color: COLORS.black,
});

const AnswerText = styled(Typography)({
  fontSize: "0.9em",
  lineHeight: 1.6,
  color: COLORS.black,
  marginBottom: "8px",
});

const OfficialLink = styled(Link)({
  color: COLORS.green,
  textDecoration: "none",
  fontWeight: 500,
  "&:hover": {
    textDecoration: "underline",
  },
});

const faqData = [
  {
    id: 1,
    question: "Jaké jsou sazby paušální daně pro OSVČ v roce 2025?",
    answer: "I. pásmo: 8 716 Kč\nII. pásmo: 16 745 Kč\nIII. pásmo: 27 139 Kč\n Další informace najdete na oficiálních stránkách Finanční správy ČR.",
    link: "https://financnisprava.gov.cz/cs/dane/dane/dan-z-prijmu/pausalni-dan/informace-k-institutu-pausalni-dane-pro-rok-2025",
    linkText: "Paušální daň pro rok 2025"
  },
  {
    id: 2,
    question: "Kde najdu aktuální výši slev na dani?",
    answer: "Sleva na poplatníka pro rok 2025 činí 30 840 Kč ročně. Další slevy a daňová zvýhodnění jsou uvedena na oficiálních stránkách veřejné správy.",
    link: "https://portal.gov.cz/informace/danove-zvyhodneni-a-slevy-na-dani-z-prijmu-INF-410",
    linkText: "Kompletní přehled slev na dani pro rok 2025"
  },
  {
    id: 3,
    question: "Jaké jsou sazby pojistného pro OSVČ?",
    answer: "Sociální pojištění 29,2%, zdravotní pojištění 13,5%.",
    link: "https://www.kurzy.cz/podnikani/osvc-zalohy-2025/",
    linkText: "Sazby pojistného pro OSVČ"
  },
  {
    id: 4,
    question: "Kdy a jak podat daňové přiznání?",
    answer: "Základní lhůta: do 1. dubna následujícího roku.\nElektronické podání: do 1. května následujícího roku.\nProstřednictvím daňového poradce: do 1. července následujícího roku.",
    link: "https://portal.gov.cz/rozcestniky/dan-z-prijmu-fyzickych-osob-RZC-100",
    linkText: "Více informací o podání daňového přiznání"
  },
  {
    id: 5,
    question: "Kde najdu oficiální sazby DPH?",
    answer: "Sazby DPH jsou upraveny zákonem č. 235/2004 Sb. o dani z přidané hodnoty. Základní sazba je 21%, snížená sazba 12%.",
    link: "https://www.zakonyprolidi.cz/cs/2004-235#f2549355",
    linkText: "Sazby DPH"
  },
  {
    id: 6,
    question: "Kde získám pomoc s daňovými povinnostmi?",
    answer: "Oficiální poradenství poskytuje Finanční správa ČR prostřednictvím infolinky, e-mailu nebo osobně na finančních úřadech.",
    link: "https://www.financnisprava.cz/cs/financni-sprava/kontakty",
    linkText: "Kontaktní údaje Finanční správy ČR"
  }
];

const FAQ: React.FC<FAQProps> = ({ open, onClose }) => {
  const [expanded, setExpanded] = useState<number | false>(false);

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
      <StyledDialogTitle>
        Často kladené otázky o daních a pojistném
      </StyledDialogTitle>
      <StyledDialogContent>
        {faqData.map((faq) => (
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
              <QuestionText>
                {faq.question}
              </QuestionText>
            </StyledAccordionSummary>
            <StyledAccordionDetails>
              <AnswerText style={{ whiteSpace: 'pre-line' }}>
                {faq.answer}
              </AnswerText>
              <OfficialLink 
                href={faq.link} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {faq.linkText} ↗
              </OfficialLink>
            </StyledAccordionDetails>
          </StyledAccordion>
        ))}
      </StyledDialogContent>
      <DialogActions sx={{ backgroundColor: "#f9f9f9", borderTop: "1px solid #ddd", padding: "16px 24px" }}>
        <Button 
          onClick={onClose}
          sx={{
            backgroundColor: COLORS.green,
            color: COLORS.white,
            padding: "0.5em 1.5em",
            borderRadius: "6px",
            textTransform: "none",
            fontSize: "0.95em",
            "&:hover": {
              backgroundColor: COLORS.greenHover,
            },
          }}
        >
          Zavřít
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default FAQ;