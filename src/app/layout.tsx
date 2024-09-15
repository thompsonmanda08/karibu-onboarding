import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import { PropsWithChildren } from "react";

const inter = localFont({
  src: "font/Inter-VariableFont_slnt,wght.ttf",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Karibu | Home Sweet Home",
  description:
    "Karibu, meaning 'welcome' in Swahili, is an innovative platform designed to transform the accommodation landscape in Lusaka and extend its impact to other hospitality businesses",
};

type RootLayoutProps = PropsWithChildren & {};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="light">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="preload" href="/favicon-32x32.png" as="image" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </head>

      <body
        className={`${inter.variable} ${inter.className} overflow-x-clip  bg-transparent`}
      >
        <Providers>
          <div className="flex flex-col font-inter">{children}</div>
          <Toaster
            toastOptions={{
              duration: 3000,
            }}
            position="top-center"
            containerClassName="z-[10000000!important]"
          />
        </Providers>
      </body>
    </html>
  );
}
