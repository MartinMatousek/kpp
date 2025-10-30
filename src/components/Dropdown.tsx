import "./Components.css";

interface DropdownProps {
  value: string | number;
  onChange: (value: string) => void;
  options: { value: string | number; label: string }[];
  label?: string;
}

export default function Dropdown({ value, onChange, options, label }: DropdownProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '0.5em 0'}}>
      {label && <label style={{ marginBottom: '0.3em', fontSize: '0.9em' }}>{label}</label>}
      <select
        className="dropdown"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
