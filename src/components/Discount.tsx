import React from "react";
import BooleanButton from "./BooleanButton";
import { Tooltip, Box, styled } from "@mui/material";

interface DiscountProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  text: String;
}

const DiscountContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const DiscountLabel = styled("span")({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export default function Discount({ isChecked, setIsChecked, text }: DiscountProps) {
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
      <BooleanButton isChecked={isChecked} setIsChecked={setIsChecked} />
    </DiscountContainer>
  );
}