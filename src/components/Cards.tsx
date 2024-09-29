"use client";
import React from "react";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/navigation";

function Cards({ setSearchData, movieData }: any) {
  const router = useRouter();

  async function deleteHandler() {
    try {
      setSearchData((pre: any) =>
        pre?.filter((items: any) => {
          return items?._id != movieData?._id;
        })
      );
      const res = await axios.delete(`/api/deleteMovie/${movieData?._id}`);

    } catch (error) {
      console.log(error);
    }
  }

  // ----------------------------------------------------------------------------------------
  async function editMovieHandler() {
    router.replace(`/addmovie?id=${movieData?._id}`);
  }

  return (
    <div className="bg-[#e0defd] min-h-48 text-lg p-5 cursor-pointer border-2 border-zinc-400 rounded">
      <div
        onClick={() => router.push(`/reviews/${movieData?._id}`)}
        className=" flex flex-col gap-2"
      >
        <h4 className="font-semibold text-2xl">{movieData?.name}</h4>
        <h4 className="italic text-balance">
          {new Date(movieData?.releaseDate).toDateString()}
        </h4>
        <h4 className="font-bold">
          Rating:{" "}
          { movieData?.averageRating !== 0.0 && movieData?.averageRating !== undefined
            ? movieData.averageRating.toFixed(1)
            : "0"}
          /10
        </h4>
      </div>
      <div className="flex items-center justify-end gap-5">
        <AiFillEdit
          onClick={() => editMovieHandler()}
          className="cursor-pointer hover:text-green-600 hover:scale-150"
        />
        <MdDelete
          onClick={() => {
            deleteHandler();
          }}
          className="cursor-pointer hover:text-red-900 hover:scale-150"
        />
      </div>
    </div>
  );
}

export default Cards;
