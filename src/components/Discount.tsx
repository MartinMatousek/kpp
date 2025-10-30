import React from "react";
import BooleanButton from "./BooleanButton";
import { Tooltip } from "@mui/material";

interface DiscountProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  text: String;
}

export default function Discount({ isChecked, setIsChecked, text }: DiscountProps) {
  const spanRef = React.useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = React.useState(false);

  const checkOverflow = () => {
    if (spanRef.current) {
      setIsOverflowing(spanRef.current.scrollWidth > spanRef.current.clientWidth);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <Tooltip title={isOverflowing ? text.toString() : ""} arrow>
        <span 
          ref={spanRef}
          onMouseEnter={checkOverflow}
          style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {text}
        </span>
      </Tooltip>
      <BooleanButton isChecked={isChecked} setIsChecked={setIsChecked} />
    </div>
  );
}