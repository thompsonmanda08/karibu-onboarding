"use client";
import { useState, useEffect } from "react";

type CompletionProps = {
  totalSteps?: number;
  currentStep?: number;
};

const CompletionBar = ({
  totalSteps = 0,
  currentStep = 0,
}: CompletionProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let step = (currentStep / totalSteps) * 100;
    setProgress(step);
  }, [progress, currentStep, totalSteps]);

  return (
    <div className="flex flex-col gap-1 fixed top-0 left-0 lg:left-[18%] right-0 z-[9999999]">
      <div
        style={{}}
        className="relative h-2 bg-slate-100 max-w-full w-full transition-all duration-300 ease-in-out"
      >
        <span
          style={{
            width: `${progress}%`,
          }}
          className="absolute h-full  max-w-full bg-primary transition-all duration-300 ease-in-out"
        />
      </div>
    </div>
  );
};

export default CompletionBar;
