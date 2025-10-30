import "./Components.css";

interface PeriodToggleProps {
  isMonthly: boolean;
  setIsMonthly: (value: boolean) => void;
}

export default function PeriodToggle({ isMonthly, setIsMonthly }: PeriodToggleProps) {
  return (
    <div className="period-toggle">
      <button 
        className={`period-toggle-btn ${isMonthly ? 'active' : ''}`}
        onClick={() => setIsMonthly(true)}
      >
        Měsíčně
      </button>
      <button 
        className={`period-toggle-btn ${!isMonthly ? 'active' : ''}`}
        onClick={() => setIsMonthly(false)}
      >
        Ročně
      </button>
    </div>
  );
}
