import dbConnect from "@/app/config/dbConnect";
import ReviewsModel from "@/app/models/review";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const reviewData = await ReviewsModel.find();

    if (!reviewData) {
      return NextResponse.json(
        {
          success: false,
          message: "reviews not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: reviewData,
        success: true,
        message: "Successfully retrieved review data",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching reviews data:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
