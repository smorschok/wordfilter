import React, { useCallback, useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { DataList } from "../components/DataList";
import { FilterForm } from "../components/FilterForm";
import { useHttp } from "../hooks/http.hook";

export const HomePage = () => {
  const { loading, request, error, clearError } = useHttp();
  const [dataList, setDataList] = useState([]);
  const [input, setInput] = useState({ value: "" });
  const [substringBtnDisabled, setSubstringBtnDisabled] = useState(true);
  const [wordLengthBtnDisabled, setWordLengthBtnDisabled] = useState(true);
  const [checkBox, setCheckBox] = useState(false);
  const [currentPage, setCurentPage] = useState(1);
  const [wordsPerPage, setWordsPerPAge] = useState(5);
  const [currentWords, setCurrentWords] = useState([]);

  const getDataWordLength = async (event) => {
    try {
      const data = await request("api/data/wordlength", "POST", {
        value: input.value.trim(),
      });
      setDataList(data);
      setInput({ ...input, value: "" });
      setCurentPage(1);
      clearError();
    } catch (e) {
      setDataList([]);
    }
  };
  const getDataSubstring = async (event) => {
    try {
      const data = await request("api/data/substring", "POST", {
        value: input.value.trim(),
        checkBox,
      });
      setDataList(data);
      setInput({ ...input, value: "" });
      setCurentPage(1);
      clearError();
    } catch (e) {
      setDataList([]);
    }
  };

  const getCheckbox = useCallback(() => {
    setCheckBox(!checkBox);
  }, [checkBox]);

  const changeHandler = (event) => {
    setInput({ ...input, value: event.target.value });
    if (
      event.target.value &&
      event.target.value.trim() !== "" &&
      !isNaN(Number(event.target.value))
    ) {
      setWordLengthBtnDisabled(false);
    } else {
      setWordLengthBtnDisabled(true);
    }
    if (
      event.target.value &&
      !Number(event.target.value) &&
      Number(event.target.value) !== 0
    ) {
      setSubstringBtnDisabled(false);
    } else {
      setSubstringBtnDisabled(true);
    }
  };
  useEffect(() => {
    const indexLastWord = currentPage * wordsPerPage;
    const indexFirstWord = indexLastWord - wordsPerPage;
    const data = dataList.slice(indexFirstWord, indexLastWord);

    setCurrentWords(data);
  }, [dataList, currentPage, wordsPerPage]);
  const paginate = (e, pageNumber) => {
    if (e.target.active) {
      e.target.active = true;
    } else {
      e.target.active = false;
    }
    setCurentPage(pageNumber);
  };

  const paginatePrev = () => {
    if (currentPage > 1) {
      setCurentPage((prev) => prev - 1);
    }
  };
  const paginateNext = (pageNumbers) => {
    if (currentPage !== pageNumbers.length) {
      setCurentPage((prev) => prev + 1);
    }
  };
  const pageSize = (e) => {
    setWordsPerPAge(Number(e.target.value));
    setCurentPage(1);
  };
  return (
    <div className="container mb-2 border rounded border-primary">
      <div className="p-2">
        <FilterForm
          changeHandler={changeHandler}
          value={input.value}
          getCheckbox={getCheckbox}
          checkBox={checkBox}
          wordLengthBtnDisabled={wordLengthBtnDisabled}
          getDataWordLength={getDataWordLength}
          substringBtnDisabled={substringBtnDisabled}
          getDataSubstring={getDataSubstring}
        />
        {loading && (
          <Spinner
            style={{ width: "6rem", height: "6rem", margin: "1rem" }}
            animation="border"
            variant="primary"
          />
        )}
        {error && !loading && <Alert variant={"danger"}>{error}</Alert>}

        {!loading && !!dataList.length && (
          <DataList
            dataList={currentWords}
            currentPage={currentPage}
            paginatePrev={paginatePrev}
            paginateNext={paginateNext}
            pageSize={pageSize}
            wordsPerPage={wordsPerPage}
            totalWords={dataList.length}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
};
