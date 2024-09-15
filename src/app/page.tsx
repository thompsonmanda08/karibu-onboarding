import { Spinner } from "@nextui-org/react";
import { Suspense } from "react";
import LoadingPage from "./loading";
import { getServerSession } from "./actions";
import Image from "next/image";
import { OnboardingSlider } from "@/components/OnboardingSlider";
import UserOnboardingForm from "@/components/user_onboarding_form";
import Link from "next/link";

export default async function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <main className="flex min-h-screen max-h-screen flex-col items-center justify-between relative overflow-hidden z-0">
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
          <div className="flex-[2] flex flex-col items-center overflow-y-auto no-scrollbar overflow-clip relative max-h-screen max-w-full z-0">
            <UserOnboardingForm />
          </div>
        </section>
      </main>
    </Suspense>
  );
}
