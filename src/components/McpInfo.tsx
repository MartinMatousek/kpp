import { useTranslation, Trans } from "react-i18next";
import { Typography } from "@mui/material";
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledTypography,
  StyledButton,
} from "../styles/Disclaimer.styles";
import { McpDialogActions, McpCodeBlock, McpList } from "../styles/McpInfo.styles";
import { AVAILABLE_YEARS } from "../core/data";

interface McpInfoProps {
  open: boolean;
  onClose: () => void;
}

export default function McpInfo({ open, onClose }: McpInfoProps) {
  const { t } = useTranslation("mcp");
  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>{t("title")}</StyledDialogTitle>
      <StyledDialogContent>
        <StyledTypography variant="body1">
          <Trans i18nKey="mcp:intro" components={{ strong: <strong /> }} />
        </StyledTypography>
        <StyledTypography variant="body1">
          <strong>{t("howToConnect")}</strong>
        </StyledTypography>
        <StyledTypography variant="body2">{t("addConfig")}</StyledTypography>
        <McpCodeBlock component="pre">
{`{
  "mcpServers": {
    "kpp-tax": {
      "type": "http",
      "url": "https://dane.martinmatousek.dev/mcp"
    }
  }
}`}
        </McpCodeBlock>
        <StyledTypography variant="body1">
          <strong>{t("whatItCanDo")}</strong>
        </StyledTypography>
        <McpList component="ul">
          <Typography variant="body2" component="li">{t("li1")}</Typography>
          <Typography variant="body2" component="li">{t("li2")}</Typography>
          <Typography variant="body2" component="li">{t("li3")}</Typography>
          <Typography variant="body2" component="li">{t("li4")}</Typography>
          <Typography variant="body2" component="li">{t("li5")}</Typography>
        </McpList>
        <StyledTypography variant="body2" sx={{ fontStyle: "italic" }}>
          {t("availableYears", { years: AVAILABLE_YEARS.join(", ") })}
        </StyledTypography>
      </StyledDialogContent>
      <McpDialogActions>
        <StyledButton onClick={onClose}>{t("close")}</StyledButton>
      </McpDialogActions>
    </StyledDialog>
  );
}
