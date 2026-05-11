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
  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>MCP Server</StyledDialogTitle>
      <StyledDialogContent>
        <StyledTypography variant="body1">
          Tato kalkulačka je dostupná jako <strong>MCP server</strong>.
        </StyledTypography>
        <StyledTypography variant="body1">
          <strong>Jak připojit kalkulačku k AI:</strong>
        </StyledTypography>
        <StyledTypography variant="body2">
          Přidejte do konfigurace vašeho AI nástroje:
        </StyledTypography>
        <McpCodeBlock component="pre">
{`{
  "mcpServers": {
    "kpp-dan": {
      "type": "http",
      "url": "https://kpp-mcp.martinmatousek.com/mcp"
    }
  }
}`}
        </McpCodeBlock>
        <StyledTypography variant="body1">
          <strong>Co kalkulačka umí spočítat:</strong>
        </StyledTypography>
        <McpList component="ul">
          <Typography variant="body2" component="li">Daň z příjmu</Typography>
          <Typography variant="body2" component="li">Zdravotní a sociální odvody</Typography>
          <Typography variant="body2" component="li">Paušální daň — pásmo a výše platby</Typography>
          <Typography variant="body2" component="li">Slevy na dani</Typography>
          <Typography variant="body2" component="li">Přepočet příjmů s DPH i bez DPH</Typography>
        </McpList>
        <StyledTypography variant="body2" sx={{ fontStyle: "italic" }}>
          Dostupná data pro roky: {AVAILABLE_YEARS.join(", ")}.
        </StyledTypography>
      </StyledDialogContent>
      <McpDialogActions>
        <StyledButton onClick={onClose}>Zavřít</StyledButton>
      </McpDialogActions>
    </StyledDialog>
  );
}
