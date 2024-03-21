import React from "react";

const SearchBar = ({searchText, onChange,placeholder}) => {
  return (
    <div class="relative border-2 rounded-lg">
      <input
        type="search"
        value={searchText}
        class="relative m-0 block  w-96 rounded-md border border-solid border-black bg-transparent bg-clip-padding  py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-black focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-black dark:placeholder:text-black dark:autofill:shadow-autofill dark:focus:border-primary"
        placeholder={placeholder}
        aria-label="Search"
        id="exampleFormControlInput4"
        onChange={(e) => {
              onChange(e.target.value)}}
      />
    </div>
  );
};

export default SearchBar;
