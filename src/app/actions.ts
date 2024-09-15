"use server";
import { AUTH_SESSION } from "@/lib/constants";
import { createSession, decrypt, verifySession } from "@/lib/session";
import { APIResponse, LoginDetails, SignupDetails } from "@/lib/types";
import { apiClient } from "@/lib/utils";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL;

type ErrorBody = Error & { message: string; status: number };

export async function createNewUserAccount<APIResponse>(
  newUserData: SignupDetails
) {
  try {
    const response = await fetch(
      `${BASE_URL}/auth/register`, // URL
      {
        body: JSON.stringify(newUserData),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e) {
    console.log("ERROR: ", e);
  }
}

export async function authenticateUser(
  loginDetails: LoginDetails
): Promise<APIResponse> {
  try {
    const res = await apiClient.post(`${BASE_URL}/auth/login`, loginDetails, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // console.log("SERVER RESPONSE: ", res);
    // Check if the response status is OK before parsing JSON
    if (res.status !== 200) {
      const error: ErrorBody = res?.data || res;
      // console.error("Response Error: ", error);
      return {
        success: false,
        message: `${error?.message}`,
        data: null,
        status: error?.status,
      };
    }

    const response: APIResponse = res.data;
    const user = response?.data?.user;
    const role = response?.data?.user?.role;
    const accessToken = response?.data?.accessToken;

    await createSession(user, role, accessToken);

    // SET COOKIE HERE...
    // cookies().set({
    //   name: AUTH_SESSION,
    //   value: accessToken,
    //   maxAge: 300 * 3,
    //   httpOnly: true,
    //   sameSite: "none",
    //   secure: true,
    // });

    return {
      success: true,
      message: response.message,
      data: response.data,
      status: response.status,
    };
  } catch (error: Error | any) {
    // console.log("ERROR DETAILS: ", error.response.data);
    // let errorMassage;
    // if (error.response) {
    //   if

    // }
    return {
      success: false,
      message: error?.response?.data?.message || "No Server Response",
      data: null,
      status: error?.response?.status || error.status,
    };
  }
}

export async function getServerSession() {
  const { isAuthenticated, session } = await verifySession();
  return { isAuthenticated, session };
}

export async function revokeToken() {
  cookies().delete(AUTH_SESSION);
  cookies().set("theme", "");
  return verifySession();
}
