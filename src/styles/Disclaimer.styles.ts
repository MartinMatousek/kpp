import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  styled,
} from "@mui/material";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "8px",
    border: `1px solid ${theme.palette.divider}`,
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
}));

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

export const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: "16px",
  lineHeight: 1.6,
  color: theme.palette.text.primary,
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: theme.palette.success.contrastText,
  padding: "0.5em 1.5em",
  borderRadius: "6px",
  textTransform: "none",
  fontSize: "0.95em",
  "&:hover": {
    backgroundColor: theme.palette.success.dark,
  },
  "&:focus": {
    outline: "none",
    boxShadow: "none",
  },
}));