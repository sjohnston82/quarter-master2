import React, { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  fontSize: string;
}

const Button = ({ children, onClick, fontSize }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`rounded-xl border border-slate-700 p-1 disabled:border-slate-400 disabled:text-slate-400 ${fontSize} flex items-center`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
