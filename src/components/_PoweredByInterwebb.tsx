import Link from "next/link";
import React from "react";
import InterwebbLogo from "/public/icons/interwebb_black.svg";
import InterwebbLogoLight from "/public/icons/interwebb.svg";

function PoweredByInterwebb() {
  return (
    <div className="flex flex-col items-center justify-center my-2 mt-6 scale-90">
      <p className="flex  text-slate-600 font-medium justify-center italic text-xs items-center ">
        Powered by{" "}
        <Link
          className="inline-flex hover:text-sky-400 my-1 mr-2 md:my-0"
          href={"https://inter-webb.com"}
          target="_blank"
        >
          <InterwebbLogo
            height={16}
            className="ml-2 mr-[2px] relative bottom-[2px]"
          />
          ®
        </Link>
      </p>
    </div>
  );
}

export default PoweredByInterwebb;
