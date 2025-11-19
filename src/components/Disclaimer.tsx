import { DialogActions, Box, Typography } from "@mui/material";
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledTypography,
  StyledButton,
} from "../styles/Disclaimer.styles";

interface DisclaimerProps {
  open: boolean;
  onClose: () => void;
}

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
      <DialogActions sx={{ backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.grey[900] : "#f9f9f9", borderTop: (theme) => `1px solid ${theme.palette.divider}`, padding: "16px 24px" }}>
        <StyledButton onClick={onClose}>
          Rozumím
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
}
