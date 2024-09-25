// InputPagePagination.tsx
import React, { useRef } from "react";
import { PiCursorClickLight } from "react-icons/pi";

interface InputPagePaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

const InputPagePagination: React.FC<InputPagePaginationProps> = ({ totalPages, onPageChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const val = inputRef.current?.value;
    if (val && !isNaN(parseInt(val))) {
      const pageNumber = parseInt(val);
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        onPageChange(pageNumber);
        inputRef.current!.value = ""; // Clear the input field after submission
      } else {
        console.log("Invalid page number.");
      }
    }
  };

  return (
    <form className="hidden relative md:flex items-center font-nunito mr-4" onSubmit={handleSubmit}>
      <input
        type="number"
        name="pageNumber"
        min={1}
        max={totalPages}
        ref={inputRef}
        placeholder={`Page 1 - ${totalPages}`}
        className="w-40 rounded bg-black  placeholder:text-white text-sm text-white p-1 pl-2 required outline-0 border border-transparent focus:border-cyan leading-4"
      />
      <button type="submit" className="ml-1 cursor-pointer">
        <PiCursorClickLight className="w-full h-5" />

      </button>
    </form>
  );
};

export default InputPagePagination;
