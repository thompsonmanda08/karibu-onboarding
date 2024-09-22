"use server";
import { PrismaClient, Prisma, University } from "@prisma/client";

const prisma = new PrismaClient();

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL;

type ErrorBody = Error & { message: string; status: number };

export async function createNewUser<APIResponse>(userData: any) {
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

export async function addNewPropertyAddress<APIResponse>(userData: any) {
  const {
    plotNo,
    street,
    city,
    area,
    province,
    country,
    rentalType,
    propertyType,
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
      },
    });

    return {
      success: true,
      message: "Property created successfully",
      data: address,
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

export async function addCloseByUniversities<APIResponse>(
  universities: University[],
  id: number
) {
  try {
    // await prisma.propertyAddress.update({
    //   where: {
    //     id,
    //   },
    //   data: {
    //     closestUniversity: {
    //       connectOrCreate: universities.map((university) => ({
    //         name: university.name,
    //         location: university.location,
    //       })),
    //     },
    //   },
    // });
    // return {
    //   success: true,
    //   message: "Property created successfully",
    //   data: user,
    // };
  } catch (error) {
    const errorBody = error as ErrorBody;
    return {
      success: false,
      message: errorBody.message,
      status: errorBody.status,
    };
  }
}

export async function createNewUniversity<APIResponse>(university: University) {
  try {
    await prisma.university.create({
      data: {
        name: university.name,
        location: university.location,
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


export async function getAllUniversities<APIResponse>(university: University) {
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
