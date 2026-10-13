"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type From = "bottom" | "top" | "left" | "right" | "none";

type RevealProps = {
  children: ReactNode;
  from?: From;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
};

function getOffset(from: From, distance: number) {
  switch (from) {
    case "bottom":
      return { y: distance };
    case "top":
      return { y: -distance };
    case "left":
      return { x: -distance };
    case "right":
      return { x: distance };
    default:
      return {};
  }
}

export default function Reveal({
  children,
  from = "bottom",
  delay = 0,
  duration = 0.5,
  distance = 28,
  once = true,
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...getOffset(from, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "0px 0px -60px 0px" }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}