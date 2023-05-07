import React, { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const SubmitButton = ({ children }: ButtonProps) => {
  return (
    <button
      type="submit"
      className="rounded-xl border border-slate-700 p-1 disabled:border-slate-400 disabled:text-slate-400"
    >
      {children}
    </button>
  );
};

export default SubmitButton;
