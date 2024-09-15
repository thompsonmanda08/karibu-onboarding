"use client";
import { CloseIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import React from "react";

function CardHeader({
  title,
  infoText,
  handleClose,
  className,
  classNames,
}: any) {
  const { titleClasses, infoClasses, innerWrapper } = classNames || "";
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-between ",
        className
      )}
    >
      {title && (
        <div className={cn("flex flex-col", innerWrapper)}>
          <h3
            className={cn(
              "text-sm font-semibold tracking-tight text-slate-800 md:text-base",
              titleClasses
            )}
          >
            {title}
          </h3>
          {infoText && (
            <p className={cn("text-xs text-gray-500 sm:text-sm", infoClasses)}>
              {infoText}
            </p>
          )}
        </div>
      )}
      {handleClose && (
        <div
          onClick={handleClose}
          className="absolute -right-1 -top-2 cursor-pointer rounded-full p-2 text-primary/30 transition-all duration-300 ease-in-out hover:bg-primary/5 hover:text-primary"
        >
          <CloseIcon className="aspect-square w-5" />
        </div>
      )}
    </div>
  );
}

export default CardHeader;
