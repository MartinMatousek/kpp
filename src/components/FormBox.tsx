import React from "react";
import {
  FormBoxContainer,
  FormBoxTitle,
  FormBoxContent,
} from "../styles/FormBox.styles";

interface FormBoxProps {
  title: string;
  children: React.ReactNode;
}

export default function FormBox({ title, children }: FormBoxProps) {
  return (
    <FormBoxContainer>
      <FormBoxTitle variant="body1">{title}</FormBoxTitle>
      <FormBoxContent>{children}</FormBoxContent>
    </FormBoxContainer>
  );
}
