import dbConnect from "@/app/config/dbConnect";
import movieModel from "@/app/models/movie";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { name, releaseDate }: { name: string; releaseDate: Date } = await req.json();

    if (!name || !releaseDate) {
      return Response.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const movieData = await movieModel.findOne({ name });

    if (movieData) {
      return Response.json(
        {
          success: false,
          message: "Movie already exists in the database",
        },
        { status: 400 }
      );
    }

    const data = await movieModel.create({
      name,
      releaseDate,
    });

    return Response.json(
      {
        data,
        success: true,
        message: "Successfully added movie",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error,
      },
      { status: 500 }
    );
  }
}
