import React, { useEffect, useState } from "react";
import { Col, Form, Row, Pagination } from "react-bootstrap";
export const PaginateMobile = ({
  currentPage,
  paginate,
  paginatePrev,
  paginateNext,
  wordsPerPage,
  totalWords,
  pageSize,
}) => {
  const [pages, setPages] = useState([]);
  useEffect(() => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalWords / wordsPerPage); i++) {
      pageNumbers.push(i);
    }
    setPages(pageNumbers);
  }, [setPages, totalWords, wordsPerPage]);

  return (
    <div className="d-flex flex-column align-items-center">
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
        <Pagination.First
          disabled={currentPage === 1}
          onClick={(e) => paginate(e, 1)}
        />
        <Pagination.Prev disabled={currentPage === 1} onClick={paginatePrev} />

        <Pagination.Item
          active={currentPage}
          onClick={(e) => paginate(e, currentPage)}
        >
          {currentPage} of {pages.length}
        </Pagination.Item>

        <Pagination.Next
          disabled={currentPage === pages.length}
          onClick={() => paginateNext(pages.length)}
        />
        <Pagination.Last
          disabled={currentPage === pages.length}
          onClick={(e) => paginate(e, pages.length)}
        />
      </Pagination>
    </div>
  );
};
