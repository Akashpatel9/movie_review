"use client";
import { useRouter } from "next/navigation";
import React from "react";

function NevBar() {
  
  const router = useRouter();

  return (
    <div className="flex justify-between items-center py-4 px-32 bg-[#e3e8ed]">
      <div
        onClick={() => router.replace("/")}
        className="uppercase font-bold cursor-pointer hover:text-[#463e9b]"
      >
        moviecritic
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => router.push("/addmovie")}
          className="py-1 px-2 border-2 border-[#6558f5] rounded bg-white text-[#6558f5] font-bold"
        >
          Add new movie
        </button>
        <button
          onClick={() => router.push("/addreview")}
          className="py-1 px-2 border-2 border-white rounded bg-[#6558f5] text-white font-bold"
        >
          Add new review
        </button>
      </div>
    </div>
  );
}

export default NevBar;
