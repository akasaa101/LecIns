import React, { useState } from "react";

import "./commentForm.css";

import { Button, Form, ButtonGroup, ToggleButton } from "react-bootstrap";

import { Send, Star } from "react-feather";
//import { useSelector } from "react-redux";
//import { selectCurrentUser } from "../../redux/selectors/authSelector";
import axios from "axios";

const CommentForm = ({ pageId, commentForTeacher }) => {
  const [comment, setComment] = useState("");
  const [radioValue, setRadioValue] = useState("3");
  const [checked, setChecked] = useState(false);

  //const currentUser = useSelector(selectCurrentUser);

  const radios = [
    { name: "1", value: "1" },
    { name: "2", value: "2" },
    { name: "3", value: "3" },
    { name: "4", value: "4" },
    { name: "5", value: "5" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (commentForTeacher) {
      if (comment.length) {
        const res = await axios.post(
          `http://localhost:3000/instructor/${pageId}/add_comment`,
          {
            isAnon: checked,
            comment,
            score: parseInt(radioValue),
          }
        );
        console.log(res);
        if (res.status === 200) {
          alert("Thanks for sending a review!");
        }
      }
    } else {
      if (comment.length) {
        const res = await axios.post(
          "http://localhost:3000/lecture/add_comment",
          {
            lectureID: pageId,
            isAnon: checked,
            comment,
            score: parseInt(radioValue),
          }
        );
        console.log(res);
        if (res.status === 200) {
          alert("Thanks for sending a review!");
        }
      }
    }
  };

  return (
    <div className="comment-form-container">
      <Form
        style={{
          backgroundColor: "#ede6ff",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>
        <Form.Label>Rating</Form.Label>

        <ButtonGroup toggle style={{ display: "flex", marginBottom: "10px" }}>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant={
                radioValue === radio.value ? "warning" : "outline-secondary"
              }
              style={{ margin: "5px" }}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radioValue === radio.value ? (
                <Star
                  style={{ marginRight: "5px" }}
                  color="yellow"
                  fill="yellow"
                />
              ) : (
                <Star style={{ marginRight: "5px" }} />
              )}
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Anonymous?"
            onChange={(e) => setChecked(e.currentTarget.checked)}
            checked={checked}
          />
          <Form.Text className="text-muted">
            If you check this your name will be hidden.
          </Form.Text>
        </Form.Group>
        <Button variant="success" onClick={handleSubmit}>
          Send Comment <Send size={20} />
        </Button>
      </Form>
    </div>
  );
};

export default CommentForm;
