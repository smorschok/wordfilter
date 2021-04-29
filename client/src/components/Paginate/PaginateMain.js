import React from "react";
import { useMediaQuery } from "react-responsive";
import { PaginateDesktop } from "./PaginateDesktop";
import { PaginateMobile } from "./PaginateMobile";

export const PaginateMain = ({
  currentPage,
  paginate,
  paginatePrev,
  paginateNext,
  wordsPerPage,
  totalWords,
  pageSize,
}) => {
  const isDesktopOrMobile = useMediaQuery({
    query: "(min-width: 550px)",
  });

  if (isDesktopOrMobile) {
    return (
      <PaginateDesktop
        currentPage={currentPage}
        paginate={paginate}
        paginatePrev={paginatePrev}
        paginateNext={paginateNext}
        wordsPerPage={wordsPerPage}
        totalWords={totalWords}
        pageSize={pageSize}
      />
    );
  }
  return (
    <PaginateMobile
      currentPage={currentPage}
      paginate={paginate}
      paginatePrev={paginatePrev}
      paginateNext={paginateNext}
      wordsPerPage={wordsPerPage}
      totalWords={totalWords}
      pageSize={pageSize}
    />
  );
};
