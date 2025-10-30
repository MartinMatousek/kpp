import "./Components.css";

interface VATInfoProps {
  amount: number;
  withVAT: boolean;
}

export default function VATInfo({ amount, withVAT }: VATInfoProps) {
  return (
    <div className="vat-info">
      {amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} Kč {withVAT ? 'bez DPH' : 's DPH'}
    </div>
  );
}
