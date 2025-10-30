import React from "react";
import "./Components.css";

interface FormBoxProps {
  title: string;
  children: React.ReactNode;
}

export default function FormBox({ title, children }: FormBoxProps) {
  return (
    <div className="form-box">
      <div className="form-box-title">{title}</div>
      <div className="form-box-content">
        {children}
      </div>
    </div>
  );
}
