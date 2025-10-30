import Colors from "./Colors";

interface VATInfoProps {
  amount: number;
  withVAT: boolean;
}

export default function VATInfo({ amount, withVAT }: VATInfoProps) {
  return (
    <div style={{ fontSize: '0.9em', color: Colors.gray(), marginLeft: '6em', marginTop: '0.5em', textDecoration: 'underline' }}>
      {amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} Kč {withVAT ? 'bez DPH' : 's DPH'}
    </div>
  );
}
