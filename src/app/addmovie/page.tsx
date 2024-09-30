"use client";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function Page() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [movieDetails, setMovieDetails] = useState<any>(null);

  const { register, handleSubmit, setValue } = useForm();

  const router = useRouter();
  const searchParams = useSearchParams();

  const movieId = searchParams.get("id");

  useEffect(() => {
    if (movieId) {
      setIsEdit(true);
      const fetchMovieDetails = async () => {
        console.log("coming");
        
        const res = await axios.get(`/api/getMovie/${movieId}`);
        console.log(res);
        
        setMovieDetails(res.data);
        setValue("name", res.data.data.name);
        setValue("releaseDate", res.data.data.releaseDate.split("T")[0]);
      };
      fetchMovieDetails();
    }
  }, [movieId, setValue]);

  const onSubmit = async (data: any) => {
    setSubmitting(true);

    if (isEdit) {
      await axios.put(`/api/editMovie/${movieId}`, data);
    } else {
      await axios.post("/api/addMovie", data);
    }

    router.replace("/");
    setSubmitting(false);
  };

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
            required={true}
          />
          <input
            className="border-2 bottom-zinc-400 rounded p-2 outline-none w-full"
            type="date"
            placeholder="date"
            {...register("releaseDate")}
            required={true}
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
                  ? "Update  Movie"
                  : "Create Movie"
                : "Please wait..."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
