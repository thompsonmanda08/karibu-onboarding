import { Spinner } from "@nextui-org/react";
import { Suspense } from "react";
import LoadingPage from "./loading";
import Image from "next/image";
import { OnboardingSlider } from "@/components/OnboardingSlider";
import UserOnboardingForm from "@/components/onboarding/user_onboarding_form";
import Link from "next/link";
import PoweredByInterwebb from "@/components/_PoweredByInterwebb";
import NavBar from "@/components/nav_bar";

export default async function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <NavBar />
      <main className="flex min-h-screen max-h-screen flex-col items-center justify-between relative z-0">
        <section className="flex flex-col-reverse md:flex-row w-screen h-full z-0">
          <div className="bg-[#143642] relative z-50 top-0 bottom-0 flex flex-col justify-center py-20 md:p-5 items-center flex-1 h-full min-h-[50vh] md:min-h-screen">
            <div className="flex mb-auto mt-4 gap-3 z-[99]">
              <Link href="/" className="">
                <span className="sr-only">Karibu Logo</span>
                <Image
                  className="mr-auto z-50"
                  src={"/images/logo-light.svg"}
                  alt="Stanbic Logo"
                  width={150}
                  height={36}
                />
              </Link>
            </div>
            <OnboardingSlider />
          </div>
          <div className="md:flex-[2] self-start overflow-y-auto no-scrollbar relative md:max-h-screen flex flex-col flex-grow">
            <UserOnboardingForm />
            <PoweredByInterwebb />
          </div>
        </section>
      </main>
    </Suspense>
  );
}
