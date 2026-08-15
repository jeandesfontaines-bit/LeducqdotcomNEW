import React from "react";
import { motion, HTMLMotionProps } from "motion/react";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: boolean;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.9,
  yOffset = 28,
  blur = true,
  once = true,
  ...props
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: yOffset,
        filter: blur ? "blur(6px)" : "none",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once, margin: "-5% 0px -5% 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealStagger({
  children,
  className = "",
  stagger = 0.1,
  delay = 0,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-5% 0px -5% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({
  children,
  className = "",
  yOffset = 25,
}: {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  key?: React.Key;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "none",
          transition: {
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedLine({
  className = "bg-white/15",
  delay = 0,
  duration = 1.3,
  once = true,
}: {
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once, margin: "-5% 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ originX: 0 }}
      className={`w-full h-[1px] ${className}`}
    />
  );
}

