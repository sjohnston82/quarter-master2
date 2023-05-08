import React, { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  fontSize: string;
  disabled: boolean;
}

const Button = ({ children, onClick, fontSize, disabled }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`font-semibold rounded-xl border border-slate-700 p-1 disabled:border-slate-400 disabled:text-slate-400 ${fontSize} flex items-center disabled:border-slate-400 disabled:text-slate-400`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  fontSize: "text-base",
  disabled: false,
};

export default Button;
