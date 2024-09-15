import Image from "next/image";
import ErrorCard from "@/components/ErrorCard";

export default function NotFound() {
  return (
    <main className="ease-soft-in-out relative flex h-full min-h-screen flex-grow flex-col justify-between transition-all duration-200">
      <section>
        <div className="relative flex h-full flex-col items-center bg-center px-5 pt-2 last:bg-cover">
          <div className="relative h-[400px] w-full overflow-clip rounded-2xl bg-gray-900">
            <Image
              className="z-0 h-full w-full object-cover"
              alt=""
              src={"/images/falls.png"}
              width={1024}
              height={300}
            />
            <div className="absolute inset-0 z-10 bg-black/30"></div>
          </div>
          <div className="container z-10">
            <div className="md:flex-0 mx-auto flex w-full shrink-0 flex-col px-3">
              <ErrorCard />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
