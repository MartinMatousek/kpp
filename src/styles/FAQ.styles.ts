import { 
  Dialog,
  DialogTitle,
  DialogContent,
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography,
  Link 
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: "8px",
    maxWidth: "600px",
    width: "90vw",
    maxHeight: "80vh",
  },
});

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : "#f0f0f0",
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontSize: "1.3em",
  fontWeight: 600,
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  "&.MuiDialogContent-root": {
    padding: "24px 24px 24px 24px",
  },
}));

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: "8px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px !important",
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: "8px 0",
  },
}));

export const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
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
}));

export const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : "#f9f9f9",
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: "16px 24px",
}));

export const QuestionText = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: "1em",
  color: theme.palette.text.primary,
}));

export const AnswerText = styled(Typography)(({ theme }) => ({
  fontSize: "0.9em",
  lineHeight: 1.6,
  color: theme.palette.text.primary,
  marginBottom: "8px",
}));

export const OfficialLink = styled(Link)(({ theme }) => ({
  color: theme.palette.success.main,
  textDecoration: "none",
  fontWeight: 500,
  "&:hover": {
    textDecoration: "underline",
  },
}));