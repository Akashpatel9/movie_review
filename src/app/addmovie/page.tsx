"use client";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";

function MovieForm() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false); 

  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const movieId = searchParams.get("id");

  useEffect(() => {
    if (movieId) {
      setIsEdit(true);
      setLoading(true);
      const fetchMovieDetails = async () => {
        try {
          const res = await axios.get(`/api/getMovie/${movieId}`);
          setMovieDetails(res.data);
          setValue("name", res.data.data.name);
          setValue("releaseDate", res.data.data.releaseDate.split("T")[0]);
        } catch (error) {
          console.error("Error fetching movie details", error);
        } finally {
          setLoading(false); 
        }
      };
      fetchMovieDetails();
    }
  }, [movieId, setValue]);

  const onSubmit = async (data: any) => {
    setSubmitting(true);

    try {
      if (isEdit) {
        await axios.put(`/api/editMovie/${movieId}`, data);
      } else {
        await axios.post("/api/addMovie", data);
      }
      router.replace("/");
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading movie details...</div>;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col gap-5 w-1/4 border-2 border-zinc-300 p-10 rounded">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-semibold">
            {isEdit ? "Edit movie" : "Add new movie"}
          </h1>
          <input
            className="border-2 bottom-zinc-400 rounded p-2 outline-none w-full"
            type="text"
            placeholder="Name"
            {...register("name")}
            required
          />
          <input
            className="border-2 bottom-zinc-400 rounded p-2 outline-none w-full"
            type="date"
            placeholder="Date"
            {...register("releaseDate")}
            required
          />
          <div className="w-full flex justify-end">
            <button
              disabled={submitting}
              className={`${
                submitting ? "bg-[#463e9b]" : "bg-[#6558f5]"
              } w-fit font-semibold px-4 text-white py-2 rounded`}
            >
              {!submitting
                ? isEdit
                  ? "Update Movie"
                  : "Create Movie"
                : "Please wait..."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Page() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <MovieForm />
    </Suspense>
  );
}

export default Page;
