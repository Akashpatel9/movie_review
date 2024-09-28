"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Dropdown({selectId}:any) {
  const [selectedOption, setSelectedOption] = useState('');
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await axios.get("/api/movies");
      setData(response.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
    selectId(event.target.value)
  };

  return (
    <div>
      <select
        className="border-2 border-zinc-400 rounded p-2 outline-none w-full"
        id="dropdown"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="">Select a movie</option>
        {data.map((movie: any) => (
          <option key={movie._id} value={movie._id}>
            {movie.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
