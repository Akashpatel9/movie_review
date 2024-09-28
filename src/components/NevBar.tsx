"use client";
import { useRouter } from "next/navigation";
import React from "react";

function NevBar() {
  
  const router = useRouter();

  return (
    <div className="flex justify-between items-center py-4 px-32 bg-zinc-200">
      <div
        onClick={() => router.replace("/")}
        className="uppercase font-bold cursor-pointer"
      >
        moviecritic
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => router.replace("/addmovie")}
          className="py-1 px-2 border-2 border-blue-400 rounded bg-white text-blue-700 font-bold"
        >
          Add new movie
        </button>
        <button
          onClick={() => router.replace("/addreview")}
          className="py-1 px-2 border-2 border-blue-400 rounded bg-blue-700 text-white font-bold"
        >
          Add new review
        </button>
      </div>
    </div>
  );
}

export default NevBar;
