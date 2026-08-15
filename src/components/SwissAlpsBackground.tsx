import React from "react";
import footerMontagne from "@/assets/images/10_footer_montagne.svg";

interface SwissAlpsBackgroundProps {
  className?: string;
}

export const SwissAlpsBackground: React.FC<SwissAlpsBackgroundProps> = ({ className = "" }) => {
  return (
    <img
      src={footerMontagne}
      alt="Swiss Alps Footer Background"
      loading="lazy"
      decoding="async"
      className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`}
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, transparent 20%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,1) 80%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, transparent 20%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,1) 80%)",
      }}
      aria-hidden="true"
    />
  );
};

export default SwissAlpsBackground;
