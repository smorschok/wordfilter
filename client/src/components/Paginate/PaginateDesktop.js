import React, { useCallback, useEffect, useState } from "react";
import { Col, Form, Row, Pagination } from "react-bootstrap";

export const PaginateDesktop = ({
  currentPage,
  paginate,
  paginatePrev,
  paginateNext,
  wordsPerPage,
  totalWords,
  pageSize,
}) => {
  const [pages, setPages] = useState([]);
  const lastPage = Math.ceil(totalWords / wordsPerPage);
  const range = useCallback((from, to, step = 1) => {
    let i = from;
    const pageRange = [];
    while (i <= to) {
      pageRange.push(i);
      i += step;
    }

    return pageRange;
  }, []);

  const fetchPageNumbers = useCallback(() => {
    const pageNeighbours = 1;
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;
    if (lastPage > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(lastPage - 1, currentPage + pageNeighbours);
      let pageNumbers = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = lastPage - endPage > 1;
      const spillOffset = totalNumbers - (pageNumbers.length + 1);

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pageNumbers = ["LEFT_PAGE", ...extraPages, ...pageNumbers];
          break;
        }

        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pageNumbers = [...pageNumbers, ...extraPages, "RIGHT_PAGE"];
          break;
        }

        case hasLeftSpill && hasRightSpill:
        default: {
          pageNumbers = ["LEFT_PAGE", ...pageNumbers, "RIGHT_PAGE"];

          break;
        }
      }

      return [1, ...pageNumbers, lastPage];
    }

    return range(1, lastPage);
  }, [currentPage, lastPage, range]);
  useEffect(() => {
    setPages(fetchPageNumbers());
  }, [fetchPageNumbers]);

  return (
    <div className="d-flex flex-column align-items-end">
      <Form className=" d-flex ">
        <Form.Group
          as={Row}
          className="justify-content-center align-items-center"
          controlId="exampleForm.SelectCustom"
        >
          <Form.Label column>Page size</Form.Label>
          <Col>
            <Form.Control
              size="sm"
              value={wordsPerPage}
              onChange={pageSize}
              as="select"
              custom
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={totalWords}>All words</option>
            </Form.Control>
          </Col>
        </Form.Group>
      </Form>
      <Pagination>
        <Pagination.Prev disabled={currentPage === 1} onClick={paginatePrev} />

        {!!pages.length &&
          pages.map((page, i) => {
            if (page === "LEFT_PAGE" || page === "RIGHT_PAGE") {
              return <Pagination.Ellipsis key={i} disabled />;
            }

            return (
              <Pagination.Item
                active={currentPage === page}
                key={i}
                onClick={(e) => paginate(e, page)}
              >
                {page}
              </Pagination.Item>
            );
          })}
        <Pagination.Next
          disabled={currentPage === lastPage}
          onClick={() => paginateNext(lastPage)}
        />
      </Pagination>
    </div>
  );
};
