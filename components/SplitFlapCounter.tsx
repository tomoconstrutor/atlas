"use client";

import { useEffect, useRef, useState } from "react";

type SplitFlapCounterProps = {
  value: number;
  label: string;
  sublabel?: string;
  minDigits?: number;
  size?: "large" | "small";
  quiet?: boolean;
};

type SplitFlapDigitProps = {
  digit: string;
  size: "large" | "small";
};

function SplitFlapDigit({ digit, size }: SplitFlapDigitProps) {
  const previousDigitRef = useRef(digit);
  const [previousDigit, setPreviousDigit] = useState(digit);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (previousDigitRef.current === digit) {
      return;
    }

    setPreviousDigit(previousDigitRef.current);
    previousDigitRef.current = digit;
    setIsFlipping(true);

    const timeout = window.setTimeout(() => {
      setIsFlipping(false);
      setPreviousDigit(digit);
    }, 620);

    return () => window.clearTimeout(timeout);
  }, [digit]);

  return (
    <span
      className={`split-flap-digit ${isFlipping ? "split-flap-digit-changing" : ""} ${
        size === "small" ? "split-flap-digit-small" : "split-flap-digit-large"
      }`}
      aria-hidden="true"
      data-previous={previousDigit}
    >
      <span className="split-flap-digit-value">{digit}</span>
    </span>
  );
}

export function SplitFlapCounter({
  value,
  label,
  sublabel,
  minDigits = 1,
  size = "large",
  quiet = false
}: SplitFlapCounterProps) {
  const digits = Math.max(0, value).toString().padStart(minDigits, "0").split("");

  return (
    <div className={`split-flap-counter ${quiet ? "split-flap-counter-quiet" : ""}`}>
      <div
        className={`split-flap-display ${
          size === "small" ? "split-flap-display-small" : "split-flap-display-large"
        }`}
        aria-label={`${value} ${label}`}
      >
        {digits.map((digit, index) => (
          <SplitFlapDigit
            key={`${digits.length}-${index}`}
            digit={digit}
            size={size}
          />
        ))}
      </div>
      <div className={`split-flap-label ${size === "small" ? "split-flap-label-small" : ""}`}>
        {label}
      </div>
      {sublabel ? <p className="split-flap-sublabel">{sublabel}</p> : null}
    </div>
  );
}
