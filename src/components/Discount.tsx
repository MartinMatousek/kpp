import React from "react";
import BooleanButton from "./BooleanButton";
import { MenuItem, Tooltip } from "@mui/material";
import {
  DiscountContainer,
  DiscountControls,
  DiscountLabel,
  MonthsSelectWrapper,
  MonthsSelectLabel,
  MonthsSelect,
} from "../styles/Discount.styles";

interface DiscountProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  text: String;
  months?: number;
  setMonths?: (n: number) => void;
  maxMonths?: number;
}

export default function Discount({ isChecked, setIsChecked, text, months, setMonths, maxMonths = 12 }: DiscountProps) {
  const spanRef = React.useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = React.useState(false);

  const checkOverflow = () => {
    if (spanRef.current) {
      setIsOverflowing(spanRef.current.scrollWidth > spanRef.current.clientWidth);
    }
  };

  return (
    <DiscountContainer>
      <Tooltip title={isOverflowing ? text.toString() : ""} arrow>
        <DiscountLabel ref={spanRef} onMouseEnter={checkOverflow}>
          {text}
        </DiscountLabel>
      </Tooltip>
      <DiscountControls>
        {isChecked && months !== undefined && setMonths !== undefined && (
          <MonthsSelectWrapper>
            <MonthsSelectLabel>měs.</MonthsSelectLabel>
            <MonthsSelect
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              MenuProps={{
                PaperProps: { sx: { borderRadius: "1em", marginTop: "0.5em" } },
              }}
            >
              {Array.from({ length: maxMonths }, (_, i) => (
                <MenuItem key={i + 1} value={i + 1} sx={{ justifyContent: "center", borderRadius: "0.5em", margin: "0.1em 0.4em", minHeight: "auto", padding: "0.3em 0.8em" }}>
                  {i + 1}
                </MenuItem>
              ))}
            </MonthsSelect>
          </MonthsSelectWrapper>
        )}
        <BooleanButton isChecked={isChecked} setIsChecked={setIsChecked} />
      </DiscountControls>
    </DiscountContainer>
  );
}