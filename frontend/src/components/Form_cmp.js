import React, { useEffect, useState } from "react";
import axios from "axios";
import Table_cmp from "./Table_cmp";

const Form_cmp = () => {
  const [value, setValue] = useState("");

  const [data, setData] = useState(null);

  const [sortValue, setSortValue] = useState("");
  const sortOptions = ["companyName", "revenue", "foundedYear", "location"];

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, [page, perPage, sortValue, value]);

  // let currPage = {};

  const fetchData = async () => {
    try {
      let apiUrl = `https://connexa-backend.onrender.com/api/v1/all/companies?page=${page}&perPage=${perPage}`;

      if (value) {
        apiUrl += `&q=${value}`;
      }

      if (sortValue) {
        apiUrl += `&_sort=${sortValue}&_order=asc`;
      }

      const response = await axios.get(apiUrl);
      setData(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchData();
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSortValue(value);
    setPage(1);
    fetchData();
  };

  const goToPage = (pageNumber) => {
    setPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      goToPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (data && data.length === perPage) {
      goToPage(page + 1);
    }
  };

  // console.log(currPage)
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <form className="flex items-center" onSubmit={handleSubmit}>
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search"
                required=""
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <form className="max-w-sm mx-auto">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select an option
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleSort}
              value={sortValue}
            >
              {sortOptions?.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </form>
        </div>
      </div>

      <Table_cmp data={data} />

      {data && (
        <div className="flex justify-center mt-4 space-x-4 mb-4">
        <button
          className="px-4 py-2 font-bold text-gray-500 bg-gray-300 rounded-md hover:bg-teal-400 hover:text-white"
          style={{ transition: "all 0.2s ease" }}
          onClick={handlePrevPage}
          // aria-disabled={true}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 font-bold text-gray-500 bg-gray-300 rounded-md hover:bg-teal-400 hover:text-white"
          style={{ transition: "all 0.2s ease" }}
          onClick={handleNextPage}
          // disabled={true}
        >
          Next
        </button>

        </div>
      )}
    </>
  );
};

export default Form_cmp;
