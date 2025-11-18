import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  styled,
  Box,
} from "@mui/material";
import { COLORS } from "../App.styles";

interface DisclaimerProps {
  open: boolean;
  onClose: () => void;
}

const StyledDialog = styled(Dialog)({
  "& .MuiPaper-root": {
    borderRadius: "8px",
    border: `1px solid ${COLORS.border}`,
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

const StyledDialogTitle = styled(DialogTitle)({
  backgroundColor: COLORS.white,
  borderBottom: `1px solid ${COLORS.border}`,
  fontSize: "1.3em",
  fontWeight: 600,
});

const StyledDialogContent = styled(DialogContent)({
  padding: "24px",
  marginTop: "16px",
  backgroundColor: COLORS.white,
});

const StyledTypography = styled(Typography)({
  marginBottom: "16px",
  lineHeight: 1.6,
  color: COLORS.black,
});

const StyledButton = styled(Button)({
  backgroundColor: COLORS.green,
  color: COLORS.white,
  padding: "0.5em 1.5em",
  borderRadius: "6px",
  textTransform: "none",
  fontSize: "0.95em",
  "&:hover": {
    backgroundColor: COLORS.greenHover,
  },
  "&:focus": {
    outline: "none",
    boxShadow: "none",
  },
});

export default function Disclaimer({ open, onClose }: DisclaimerProps) {
  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>Vyloučení odpovědnosti</StyledDialogTitle>
      <StyledDialogContent>
        <StyledTypography variant="body1">
          Tato kalkulačka slouží pouze pro informativní a orientační účely. 
          Výsledky kalkulace jsou založeny na zadaných údajích a platných právních 
          předpisech v době vytvoření této aplikace.
        </StyledTypography>
        <StyledTypography variant="body1">
          <strong>Autor aplikace nenese žádnou odpovědnost za:</strong>
        </StyledTypography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <Typography variant="body2" component="li">
            Správnost, přesnost nebo úplnost poskytnutých výpočtů a informací
          </Typography>
          <Typography variant="body2" component="li">
            Případné finanční nebo jiné škody vzniklé v důsledku použití této kalkulačky
          </Typography>
          <Typography variant="body2" component="li">
            Aktuálnost údajů vzhledem k možným změnám v legislativě
          </Typography>
          <Typography variant="body2" component="li">
            Individuální daňové a finanční situace uživatelů
          </Typography>
        </Box>
        <StyledTypography variant="body1">
          Pro přesné informace a poradenství se prosím obraťte na odborného daňového 
          poradce, účetního nebo příslušný finanční úřad.
        </StyledTypography>
        <StyledTypography variant="body2" sx={{ fontStyle: "italic", mt: 2 }}>
          Používáním této kalkulačky souhlasíte s výše uvedeným vyloučením odpovědnosti.
        </StyledTypography>
      </StyledDialogContent>
      <DialogActions sx={{ backgroundColor: "#f9f9f9", borderTop: "1px solid #ddd", padding: "16px 24px" }}>
        <StyledButton onClick={onClose}>
          Rozumím
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
}
