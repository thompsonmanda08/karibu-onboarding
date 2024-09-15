"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";

export function OnboardingSlider({ slides }: any) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex flex-col items-center gap-10">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent className="bg-red-00 mx-auto w-full">
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="object-contain max-w-[360px] w-auto h-auto mb-10 mx-auto">
                <Image
                  className=""
                  src={slides?.image || `/images/onboarding${index + 1}.svg`}
                  alt=""
                  width={280}
                  height={280}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden lg:block">
          <CarouselPrevious className="bg-slate-50 text-primary border-transparent hover:bg-slate-50/80 hover:text-primary" />
          <CarouselNext className="bg-slate-50 text-primary border-transparent hover:bg-slate-50/80 hover:text-primary" />
        </div>
      </Carousel>
      <div className="flex flex-col justify-center items-center gap-4 max-w-[380px] mb-8">
        <h3 className="text-center text-white text-base lg:text-xl font-semibold  leading-10">
          {slides?.title || "Title goes here"}
        </h3>

        <p className="max-w-sm md:w-full text-center text-neutral-200 lg:text-xl  leading-7">
          {slides?.infoText ||
            "Descrip[tion for the purpose of this foprm being implemented at any point while the product is in developemnt"}
        </p>
      </div>
    </div>
  );
}
