"use client";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function Page() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [reviewDetails, setReviewDetails] = useState<any>(null);
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<string>("");
  const [movieError, setMovieError] = useState<boolean>(false);

  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();

  const reviewId = searchParams.get("id");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("/api/movies");
        setMovies(res.data.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();

    if (reviewId) {
      setIsEdit(true);
      const fetchReviewDetails = async () => {
        try {
          const res = await axios.get(`/api/getReview/${reviewId}`);
          setReviewDetails(res.data.data);
          setSelectedMovie(res.data.data.movieId.name);
          setValue("reviewerName", res.data.data.reviewerName);
          setValue("rating", res.data.data.rating);
          setValue("reviewComments", res.data.data.reviewComments);
        } catch (error) {
          console.error("Failed to fetch review details:", error);
        }
      };
      fetchReviewDetails();
    }
  }, [reviewId, setValue]);

  const onSubmit = async (data: any) => {
    if (!selectedMovie) {
      setMovieError(true);
      return;
    }

    setSubmitting(true);

    try {
      if (isEdit) {
        await axios.put(`/api/editReview/${reviewId}`, {
          ...data,
          movieId: selectedMovie,
        });
      } else {
        console.log(data);
        console.log(selectedMovie);
        await axios.post(`/api/addReview/${selectedMovie}`, {
          ...data,
          movieId: selectedMovie,
        });
      }

      router.replace("/");
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col gap-5 w-1/4 border-2 border-zinc-300 p-10 rounded">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-semibold">
            {isEdit ? "Edit Review" : "Add New Review"}
          </h1>

          {!isEdit && (
            <div>
              <select
                className="border-2 bottom-zinc-400 rounded p-2 outline-none w-full"
                value={selectedMovie}
                onChange={(e) => {
                  setSelectedMovie(e.target.value);
                  setMovieError(false);
                }}
              >
                <option value="">Select a Movie</option>
                {movies.map((movie) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.name}
                  </option>
                ))}
              </select>
              {movieError && (
                <p className="text-red-500 text-sm">Please select a movie.</p>
              )}
            </div>
          )}

          <input
            className="border-2 bottom-zinc-400 rounded p-2 outline-none w-full"
            type="text"
            placeholder="Your name"
            {...register("reviewerName")}
            required={true}
          />

          <input
            className="border-2 bottom-zinc-400 rounded p-2 outline-none w-full"
            type="number"
            placeholder="Rating out of 10"
            max="10"
            min="0"
            {...register("rating")}
            required={true}
          />

          <textarea
            {...register("reviewComments")}
            required={true}
            className="border-2 bottom-zinc-400 rounded p-2 outline-none w-full"
            placeholder="Your review"
          ></textarea>

          <div className="w-full flex justify-end">
            <button
              disabled={submitting}
              className={`${
                submitting ? "bg-[#463e9b]" : "bg-[#6558f5]"
              } w-fit font-semibold px-4 text-white py-2 rounded`}
            >
              {!submitting
                ? isEdit
                  ? "Update Review"
                  : "Add Review"
                : "Please wait..."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
