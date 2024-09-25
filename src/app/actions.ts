"use server";
import { APIResponse } from "@/lib/types";
import { PrismaClient, Prisma, University } from "@prisma/client";

const prisma = new PrismaClient();

type ErrorBody = Error & { message: string; status: number };

export async function createNewUser(userData: any): Promise<APIResponse> {
  const { firstName, lastName, email, gender, phoneNumber, userType } =
    userData;

  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        gender,
        phoneNumber,
        userType,
      },
    });

    return {
      success: true,
      message: "User created successfully",
      data: user,
      status: 201,
    };
  } catch (error) {
    const errorBody = error as ErrorBody;
    return {
      success: false,
      message: errorBody.message,
      status: errorBody.status,
      data: null,
    };
  }
}

export async function addNewPropertyAddress(userData: {
  [x: string]: any;
  userId: number;
}): Promise<APIResponse> {
  const {
    plotNo,
    street,
    city,
    area,
    province,
    country,
    rentalType,
    propertyType,
    details,
    userId,
  } = userData;
  try {
    const address = await prisma.propertyAddress.create({
      data: {
        plotNo,
        street,
        city,
        area,
        province,
        country,
        rentalType,
        propertyType,
        details,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return {
      success: true,
      message: "Property created successfully",
      data: address,
      status: 201,
    };
  } catch (error) {
    const errorBody = error as ErrorBody;
    return {
      success: false,
      message: errorBody.message,
      status: errorBody.status,
      data: null,
    };
  }
}

export async function addCloseByUniversities(
  universities: University[],
  addressId: number
): Promise<APIResponse> {
  try {
    const address = await prisma.propertyAddress.update({
      where: {
        id: addressId,
      },
      data: {
        closestUniversity: {
          connectOrCreate: universities.map((university) => ({
            where: {
              id: university.id, // Specify the unique field used to identify the university
            },
            create: {
              name: university.name,
              location: university.location,
            },
          })),
        },
      },
    });

    return {
      success: true,
      message: "Property created successfully",
      data: address,
      status: 200,
    };
  } catch (error) {
    const errorBody = error as ErrorBody;
    return {
      success: false,
      message: errorBody.message,
      status: errorBody.status,
      data: null,
    };
  }
}

export async function createNewUniversity<APIResponse>(university: University) {
  try {
    await prisma.university.create({
      data: {
        name: university.name,
        location: university.location,
        abbreviation: university.abbreviation,
      },
    });

    const universities = await prisma.university.findMany();

    return {
      success: true,
      message: "University added successfully",
      data: universities,
    };
  } catch (error) {
    const errorBody = error as ErrorBody;
    return {
      success: false,
      message: errorBody.message,
      status: errorBody.status,
    };
  }
}

export async function getAllUniversities<APIResponse>() {
  try {
    const universities = await prisma.university.findMany();
    return {
      success: true,
      message: "University added successfully",
      data: universities,
    };
  } catch (error) {
    const errorBody = error as ErrorBody;
    return {
      success: false,
      message: errorBody.message,
      status: errorBody.status,
    };
  }
}
