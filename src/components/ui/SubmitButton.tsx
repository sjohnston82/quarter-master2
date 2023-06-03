import React, { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled: boolean;
  fontSize: string;
}

const SubmitButton = ({ children, disabled, fontSize }: ButtonProps) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`font-semibold rounded-xl border ${fontSize} border-slate-700 p-1 disabled:border-slate-400 disabled:text-slate-400`}
    >
      {children}
    </button>
  );
};


SubmitButton.defaultProps = {
  fontSize: "text-base",
  disabled: false,
};

export default SubmitButton;
