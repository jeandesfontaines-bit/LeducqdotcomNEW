import React from "react";
import { motion } from "motion/react";

interface MaskedRevealProps {
  text: string;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "div";
  className?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
}

export default function MaskedReveal({
  text,
  as = "p",
  className = "",
  delay = 0,
  duration = 1.2,
}: MaskedRevealProps) {
  const Component = motion[as] as React.ComponentType<React.ComponentProps<typeof motion.p>>;

  return (
    <div className="overflow-hidden inline-block w-full">
      <Component
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={className}
      >
        {text}
      </Component>
    </div>
  );
}
