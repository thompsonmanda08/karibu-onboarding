import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import toast, { ToastType } from "react-hot-toast";
import axios from "axios";
import { AIRTEL_NO, MTN_NO, ZAMTEL_NO } from "./constants";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

export const authenticatedClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export function notify(type: ToastType, message: string) {
  // @ts-expect-error
  return toast[type](message);
}

export function formatCurrency(amount: number) {
  const currencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ZMW",
    minimumFractionDigits: 2,
  });
  return amount > 0 ? currencyFormat.format(amount) : "ZMW 0.00";
}

export function formatDate(inputDate: string) {
  const options: any = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const formattedDate = new Date(inputDate).toLocaleDateString("en", options);

  const [month, day, year] = formattedDate.split(" ");

  return `${parseInt(day)}-${month}-${year}`;
}

export function maskString(
  string: string,
  firstCharacters = 0,
  lastCharacters = 6
) {
  if (string?.length < 10) {
    return string;
  }

  const first = string?.slice(0, firstCharacters);
  const last = string?.slice(string?.length - lastCharacters);
  return `${first} *****${last}`;
}

export function getUserInitials(name: string) {
  return name
    ?.split(" ")
    .map((i) => i[0])
    .join("");
}

export function capitalize(str: string) {
  return str?.charAt(0).toUpperCase() + str.slice(1);
}

export function isValidZambianMobileNumber(mobileNumber: string) {
  if (mobileNumber?.replaceAll(/\D/g, "").toString()?.length < 10) {
    return false;
  }

  if (
    MTN_NO.test(mobileNumber) ||
    AIRTEL_NO.test(mobileNumber) ||
    ZAMTEL_NO.test(mobileNumber)
  )
    return true; // Valid Zambian mobile number

  return false; // INvalid Zambian mobile number
}

export function getFormattedZambianMobileNumber(mobileNumber: string) {
  if (!isValidZambianMobileNumber(mobileNumber)) {
    return {
      provider: null,
      mobileNumber: "Invalid Number",
    }; // Invalid Zambian mobile number
  }

  let provider = null;
  if (MTN_NO.test(mobileNumber)) {
    provider = "MTN ";
  } else if (AIRTEL_NO.test(mobileNumber)) {
    provider = "Airtel ";
  } else if (ZAMTEL_NO.test(mobileNumber)) {
    provider = "Zamtel";
  }
  return {
    provider,
    mobileNumber: mobileNumber.replace("+", ""),
  };
}

export function isValidNRCNo(input: string) {
  // REMOVE ALL NON-DIGITS
  const formattedID = input.trim().replaceAll(/\D/g, "");

  if (
    formattedID.charAt(formattedID.length - 1) === "1" &&
    formattedID.length === 9
  ) {
    return true;
  }

  notify("error", "Enter a Valid NRC Number");

  return false;
}
