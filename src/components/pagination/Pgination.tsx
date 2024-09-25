import React from "react";
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";
import InputPerPagePagination from "./InputPerPagePagination";

interface PaginationProps {
  perPage: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  perPage,
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / perPage);

  const next = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const multiStepNext = () => {
    const nextAfterMultiStep = currentPage + 3;
    onPageChange(nextAfterMultiStep > totalPages ? totalPages : nextAfterMultiStep);
  };

  const multiStepPrev = () => {
    const prevAfterMultiStep = currentPage - 3;
    onPageChange(prevAfterMultiStep < 1 ? 1 : prevAfterMultiStep);
  };

  if (totalItems > perPage) {
    return (
      <div className="flex items-center justify-center">
      <InputPerPagePagination totalPages={totalPages} onPageChange={onPageChange} />
        <ul className="flex items-center justify-end text-sm">
          <li className="flex items-center">
            <button className="outline-0 hover:text-cyan w-8" onClick={prev}>
              <IoArrowBackCircleOutline className="w-full h-auto" />
            </button>
          </li>
          {/* Render multi step previous button */}
          {currentPage > 3 && (
            <li>
              <button
                onClick={multiStepPrev}
                className="outline-0 hover:text-cyan rounded-full w-5 h-5 flex items-center justify-center text-lg mx-1.5"
              >
                ...
              </button>
            </li>
          )}
          {/* Render page numbers */}
          {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => currentPage - 2 + index).map((pageNumber) => (
            pageNumber > 0 && pageNumber <= totalPages && (
              <li key={pageNumber}>
                <button
                  onClick={() => onPageChange(pageNumber)}
                  className={`outline-0 hover:text-cyan rounded-full w-5 h-5 md:w-8 md:h-8 flex items-center justify-center mx-1.5 ${
                    pageNumber === currentPage ? "bg-gray-700 text-gray-400" : "bg-green-300 text-gray-800" // Ändere die Hintergrundfarbe hier
                  }`}
                >
                  {pageNumber}
                </button>
              </li>
            )
          ))}
          {/* Render multi step next button */}
          {currentPage + 3 < totalPages && (
            <li>
              <button
                onClick={multiStepNext}
                className="outline-0 hover:text-cyan rounded-full w-5 h-5 flex items-center justify-center text-lg mx-1.5"
              >
                ...
              </button>
            </li>
          )}
          {/* Render last page button */}
          {currentPage !== totalPages && (
            <li>
              <button
                onClick={() => onPageChange(totalPages)}
                className={`outline-0 hover:text-cyan rounded-full w-5 h-5 flex items-center justify-center mx-1.5 bg-red-400`}
              >
                {totalPages}
              </button>
            </li>
          )}
          <li className="flex items-center">
            <button className="outline-0 hover:text-cyan w-8" onClick={next}>
              <IoArrowForwardCircleOutline className="w-full h-auto" />
            </button>
          </li>
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default Pagination;
