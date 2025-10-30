import { Box, styled } from "@mui/material";

interface VATInfoProps {
  amount: number;
  withVAT: boolean;
}

const VATInfoContainer = styled(Box)({
  fontSize: "0.9em",
  color: "#BEBEBE",
  marginLeft: "6em",
  marginTop: "0.5em",
  textDecoration: "underline",
});

export default function VATInfo({ amount, withVAT }: VATInfoProps) {
  return (
    <VATInfoContainer>
      {amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Kč {withVAT ? "bez DPH" : "s DPH"}
    </VATInfoContainer>
  );
}
