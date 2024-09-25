import { IoSearchSharp } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { FaArrowRightLong } from "react-icons/fa6";

import React, { useState } from "react";
import { RootState } from "../../feature/store";
import { setInputValueSearchBox } from "../../feature/reducers/appSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const [showArrowIcon, setShowArrowIcon] = useState(false);
  const { isSearchBoxActive, inputValueSearchBox } = useSelector(
    (state: RootState) => state.app
  );
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowArrowIcon(event.target.value !== "");
    dispatch(setInputValueSearchBox(event.target.value));
  };

  return (
    <>
      <div
        className={`${
          isSearchBoxActive
            ? "flex items-center justify-between px-5 w-full bg-WHITE border-2 border-SECONDARY_GRAY rounded-md gap-2"
            : "hidden"
        } `}
        onClick={(event) => event.stopPropagation()}
      >
        <IoSearchSharp className="w-6 h-6  cursor-pointer text-SECONDARY_GRAY" />
        <input
          type="text"
          className={`outline-0 w-full bg-transparent py-2 font-FONT_SALSA  text-xl leading-10 -tracking-tighter `}
          placeholder="Search..."
          onChange={handleInputChange}
          value={inputValueSearchBox}
        />

        <FaArrowRightLong
          className={`${
            showArrowIcon
              ? "w-8 h-8 cursor-pointer text-BRAND_COLOR animate-pulse"
              : "hidden"
          }`}
        />
      </div>
    </>
  );
};

export default SearchBox;
