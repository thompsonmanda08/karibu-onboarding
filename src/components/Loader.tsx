import React from "react";
import Spinner from "./Spinner";
import { cn } from "@/lib/utils";

type LoaderProps = {
  size?: number;
  loadingText?: string;
  color?: string;
  className?: string;
  classNames?: {
    container?: string;
    wrapper?: string;
    spinner?: string;
    text?: string;
  };
  isLandscape?: boolean;
};

function Loader({
  size = 50,
  loadingText,
  color,
  className,
  classNames,
  isLandscape,
}: LoaderProps) {
  const { container, wrapper, spinner, text }: any = classNames || "";
  return (
    <div
      className={cn(
        "bg-slate-5/10 grid min-h-80 flex-1 flex-grow place-items-center rounded-xl py-8",
        wrapper
      )}
    >
      <div
        className={cn(
          "flex w-max flex-col items-center justify-start gap-4",
          container,
          className,
          { "flex-row": isLandscape }
        )}
      >
        <Spinner size={size} color={color} className={spinner} />
        {loadingText && (
          <p
            className={cn(
              "mt-4 max-w-sm break-words font-bold text-slate-800",
              text
            )}
          >
            {loadingText}
          </p>
        )}
      </div>
    </div>
  );
}

export default Loader;
