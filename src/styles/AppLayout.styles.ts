import { Box, IconButton, styled, Typography } from "@mui/material";

export const RootContainer = styled(Box)({
  maxWidth: "555px",
  width: "100%",
  margin: "0 auto",
  padding: "0 1rem",
  textAlign: "center",
  "@media (min-width: 780px)": {
    width: "60vw",
    padding: "0",
  },
});

export const SectionHeading = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  cursor: "pointer",
  "& h2": {
    margin: 0,
  },
});

export const SectionToggleButton = styled(IconButton)(({ theme }) => ({
  position: "relative",
  width: "1.75em",
  height: "1.75em",
  padding: 0,
  color: theme.palette.secondary.main,
  "&.collapsed": {
    color: theme.palette.primary.main,
  },
}));

export const SectionToggleChevron = styled("span")({
  display: "block",
  lineHeight: 1,
  fontSize: "1.2em",
  fontWeight: 400,
});

export const InputRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1em",
  flexWrap: "wrap",
  "@media (max-width: 470px)": {
    gap: "0.5em",
    flexWrap: "nowrap",
  },
});

export const HiddenInput = styled(Box)({
  visibility: "hidden",
  pointerEvents: "none",
});

export const ChildrenInputContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
  marginTop: "8px",
  flexWrap: "wrap",
});

export const ChildrenInputContainerHidden = styled(Box)({
  visibility: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
  marginTop: "8px",
  flexWrap: "wrap",
});

export const MonthsRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75em",
  padding: "0.6em 0",
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: "0.5em",
}));

export const MonthsLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.95em",
  color: theme.palette.text.secondary,
  fontWeight: 500,
  cursor: "default",
  textDecorationLine: "underline",
  textDecorationStyle: "dotted",
  textUnderlineOffset: "3px",
}));

export const TaxBaseDisplay = styled(Box)(({ theme }) => ({
  fontSize: "1.3em",
  marginTop: "0.6em",
  paddingTop: "0.6em",
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export const TaxBaseSpacer = styled(Box)({
  height: "1em",
});

export const FlatTaxContainer = styled(Box)({
  textAlign: "center",
  marginTop: "0.8em",
});

export const FlatTaxBand = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.8rem",
  height: "1.8rem",
  borderRadius: "20%",
  border: `2px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  fontSize: "1.2em",
  fontWeight: "bold",
  marginTop: "0.4em",
}));

export const FlatTaxWarning = styled(Box)(({ theme }) => ({
  marginTop: "0.8em",
  fontSize: "0.85em",
  color: theme.palette.warning.main,
  "& a": {
    color: "inherit",
  },
}));