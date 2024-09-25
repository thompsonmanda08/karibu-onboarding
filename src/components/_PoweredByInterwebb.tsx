import Link from "next/link";
import React from "react";
import InterwebbLogo from "/public/icons/interwebb_black.svg";
import InterwebbLogoLight from "/public/icons/interwebb.svg";

function PoweredByInterwebb() {
  return (
    <div className="flex flex-col items-center justify-center my-2 w-full mt-auto">
      <p className="flex text-slate-600 font-medium justify-center italic text-sm items-center ">
        Powered by{" "}
        <Link
          className="inline-flex hover:text-sky-400 my-1 mr-2 md:my-0 h-10"
          href={"https://inter-webb.com"}
          target="_blank"
        >
          <InterwebbLogo
            height={5}
            className="ml-2 mr-[2px] w-fit h-auto relative bottom-[2px]"
          />
          ®
        </Link>
      </p>
    </div>
  );
}

export default PoweredByInterwebb;
