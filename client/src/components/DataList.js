import React from "react";
import { ListGroup } from "react-bootstrap";
import { PaginateMain } from "./Paginate/PaginateMain";

export const DataList = ({
  currentPage,
  wordsPerPage,
  totalWords,
  paginate,
  pageSize,
  paginatePrev,
  paginateNext,
  dataList,
}) => {
  return (
    <div className="container ">
      <PaginateMain
        currentPage={currentPage}
        paginate={paginate}
        paginatePrev={paginatePrev}
        paginateNext={paginateNext}
        wordsPerPage={wordsPerPage}
        totalWords={totalWords}
        pageSize={pageSize}
      />
      <ListGroup>
        {dataList.map((data, i) => {
          return <ListGroup.Item key={i}>{data}</ListGroup.Item>;
        })}
      </ListGroup>
    </div>
  );
};
