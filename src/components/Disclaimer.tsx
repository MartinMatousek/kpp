import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("disclaimer");
  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>{t("title")}</StyledDialogTitle>
      <StyledDialogContent>
        <StyledTypography variant="body1">{t("body1")}</StyledTypography>
        <StyledTypography variant="body1">
          <strong>{t("authorNote")}</strong>
        </StyledTypography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <Typography variant="body2" component="li">{t("li1")}</Typography>
          <Typography variant="body2" component="li">{t("li2")}</Typography>
          <Typography variant="body2" component="li">{t("li3")}</Typography>
          <Typography variant="body2" component="li">{t("li4")}</Typography>
        </Box>
        <StyledTypography variant="body1">{t("body2")}</StyledTypography>
        <StyledTypography variant="body2" sx={{ fontStyle: "italic", mt: 2 }}>
          {t("agreement")}
        </StyledTypography>
      </StyledDialogContent>
      <DialogActions sx={{ backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.grey[900] : "#f9f9f9", borderTop: (theme) => `1px solid ${theme.palette.divider}`, padding: "16px 24px" }}>
        <StyledButton onClick={onClose}>{t("button")}</StyledButton>
      </DialogActions>
    </StyledDialog>
  );
}
