"use client";
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

const navigation = [
  { name: "Home", href: "#home" },
  { name: "FAQ", href: "#faq" },
  // { name: "Marketplace", href: "#" },
  // { name: "Company", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isOnboarding = pathname == "/onboarding/create-account";

  return (
    <header className="flex absolute inset-x-0 top-2 md:top-0 z-10 md:bg-transparent bg-white shadow md:shadow-none">
      <nav
        className="flex justify-between w-full px-4 sm:px-8 lg:px-20 p-4 items-center"
        aria-label="nav-bar"
      >
        <Link href="/" className="-m-1.5 ml-2 p-1.5 md:hidden">
          <span className="sr-only">Stanbic Bank Logo</span>
          <Image
            className=" z-50"
            src={"/images/logo-dark.svg"}
            alt="Stanbic Logo"
            width={150}
            height={36}
          />
        </Link>

        {/* <>
          <div className="hidden md:flex md:gap-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <Link
            href={"/onboarding/create-account"}
            className="hidden md:block lg:justify-end"
          >
            <Button className="bg-primary text-white min-w-fit px-4">
              Create an Account
            </Button>
          </Link>
        </> */}

        <button
          type="button"
          className="-m-2.5 inline-flex md:hidden items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6 " aria-hidden="true" />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Karibu</span>
                <Image
                  className="mr-auto z-50 md:hidden"
                  src={"/images/logo_black.png"}
                  alt=""
                  width={150}
                  height={36}
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link href={"/"}>
                    <Button
                      onClick={() => setMobileMenuOpen(false)}
                      className="bg-primary text-white min-w-fit px-4"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
