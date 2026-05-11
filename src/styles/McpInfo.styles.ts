import { Box, DialogActions, styled } from "@mui/material";

export const McpDialogActions = styled(DialogActions)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : "#f9f9f9",
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: "16px 24px",
}));

export const McpCodeBlock = styled(Box)(({ theme }) => ({
  marginTop: "8px",
  marginBottom: "16px",
  padding: "12px",
  borderRadius: "4px",
  fontSize: "0.78rem",
  overflowX: "auto",
  backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[100],
  fontFamily: "monospace",
  whiteSpace: "pre",
}));

export const McpList = styled(Box)({
  paddingLeft: "24px",
  marginBottom: "16px",
});
