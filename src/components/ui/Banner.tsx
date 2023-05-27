import React from "react";

interface BannerProps {
  children: React.ReactNode;
  fontSize: string;
}
const Banner = ({ children, fontSize }: BannerProps) => {
  return (
    <h1
      className={`${fontSize} w-full bg-woodsmoke text-center text-slate-200`}
    >
      {children}
    </h1>
  );
};

Banner.defaultProps = {
  fontSize: "text-xl",
};

export default Banner;
