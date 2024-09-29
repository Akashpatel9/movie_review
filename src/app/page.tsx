"use client";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Cards from "@/components/Cards";
import axios from "axios";
import { useRouter } from "next/navigation";


function Page() {

  const [movieData, setMovieData] = useState([]);

  const[ searchData , setSearchData] = useState([]);

  const [inputData, setInputData] = useState("");

  async function getData() {
    try {
      const { data } = await axios.get("/api/movies");
      setMovieData(data?.data);
      setSearchData(data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);



  function serchDataFilter(e:any){
    console.log(e.target.value);
    
    setSearchData(movieData?.filter((item: any) => {
      return item?.name.toLowerCase().startsWith(e.target.value.toLowerCase());
    }));
  }



  return (
    <div className="px-32 mt-8">
      <div className="text-4xl font-semibold text-zinc-700">
        The best movie reviews site!
      </div>


      <div className="mt-8 w-1/2 border-2 overflow-hidden rounded border-[#6558f5] flex items-center font-semibold text-2xl p-1">
        <CiSearch />
        <input
          className=" p-2 font-semibold w-full outline-none"
          placeholder="Search for your favourit movie"
          type="text"
          onChange={serchDataFilter}
        />
      </div>

      <div className="mt-10 w-full border-[1px] border-zinc-300"></div>

      <div className="h-full w-full grid grid-cols-3 mt-5 gap-10 justify-between ">
        {movieData?.length > 0 ? (
          (searchData.length>0?searchData:movieData)?.map((movie: any) => {
            return (
              <div key={movie?._id}>
                {" "}
                <Cards setSearchData={setSearchData} movieData={movie} />
              </div>
            );
          })
        ) : (
          <>Not Avliable</>
        )}
      </div>
    </div>
  );
}

export default Page;
