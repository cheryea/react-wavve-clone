import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [searchopen, setSearchOpen] = useState("");

  const commitSearch = (e) => {
    e.preventDefault();
    if (value.trim().length !== 0) {
      navigate(`/search/${value}`);
      setValue("");
    }
  };

  return (
    <>
      <form
        className={
          searchopen === "open"
            ? "cursor-pointers search-box search-box-open"
            : "cursor-pointers search-box"
        }
        onSubmit={commitSearch}
      >
        <label>
          <div
            onClick={() => {
              setSearchOpen("open");
              setValue("");
            }}
            className={
              searchopen === "open"
                ? "cursor-pointers search-open-nones"
                : "cursor-pointers search-open"
            }
            onSubmit={commitSearch}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <path opacity=".3" d="M0 0h22v22H0z" />
                <g stroke="#A5A5A5" strokeWidth="2">
                  <path d="M15.45 8.908A6.501 6.501 0 1 1 2.45 8.906a6.501 6.501 0 0 1 13.002.002z" />
                  <path strokeLinecap="round" d="m14.047 13.654 5.743 5.569" />
                </g>
              </g>
            </svg>
          </div>

          <input
            className={searchopen === "open" ? "search-input-open" : ""}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className={
              searchopen === "open"
                ? "cursor-pointers button-class search-btn-active"
                : "cursor-pointers button-class search-btn"
            }
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <path opacity=".3" d="M0 0h22v22H0z" />
                <g stroke="#A5A5A5" strokeWidth="2">
                  <path d="M15.45 8.908A6.501 6.501 0 1 1 2.45 8.906a6.501 6.501 0 0 1 13.002.002z" />
                  <path strokeLinecap="round" d="m14.047 13.654 5.743 5.569" />
                </g>
              </g>
            </svg>
          </button>
          <div
            className={
              searchopen === "open"
                ? "cursor-pointers search-close-btn-active"
                : "cursor-pointers search-close-btn"
            }
            onClick={() => {
              setSearchOpen("close");
              setValue("");
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zM9.364 8.234a.799.799 0 0 0-1.13 1.13L10.87 12l-2.636 2.636a.799.799 0 1 0 1.13 1.13L12 13.13l2.636 2.636a.799.799 0 1 0 1.13-1.13L13.13 12l2.636-2.636a.799.799 0 0 0-1.13-1.13L12 10.87z"
                fill="#5E5E5E"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </label>
      </form>
    </>
  );
};

export default SearchBar;
