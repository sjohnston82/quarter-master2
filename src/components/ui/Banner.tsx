import React from "react";

interface BannerProps {
  children: React.ReactNode;
  fontSize: string;
}
const Banner = ({ children, fontSize }: BannerProps) => {
  return (
    <h1
      className={`${fontSize} w-full bg-slate-800 text-center text-slate-200`}
    >
      {children}
    </h1>
  );
};

export default Banner;
