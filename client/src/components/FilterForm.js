import React from "react";
import { Button, Form } from "react-bootstrap";
export const FilterForm = ({
  changeHandler,
  value,
  getCheckbox,
  checkBox,
  wordLengthBtnDisabled,
  getDataWordLength,
  substringBtnDisabled,
  getDataSubstring,
}) => {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <div className="d-flex flex-column align-items-center">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Enter a request</Form.Label>
          <Form.Control
            onChange={changeHandler}
            value={value}
            type="text"
            placeholder="Enter text or number"
          />
        </Form.Group>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            onChange={getCheckbox}
            checked={checkBox}
            type="checkbox"
            label="Case-sensitive"
          />
        </Form.Group>
      </div>
      <div className="d-flex justify-content-center">
        <Button
          disabled={wordLengthBtnDisabled || !value}
          variant="primary"
          onClick={getDataWordLength}
          className="m-1"
        >
          Word length
        </Button>
        <Button
          variant="primary"
          disabled={substringBtnDisabled || !value}
          onClick={getDataSubstring}
          className="m-1"
        >
          Substring
        </Button>
      </div>
    </Form>
  );
};
