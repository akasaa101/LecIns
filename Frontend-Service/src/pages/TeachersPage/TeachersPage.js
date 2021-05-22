import React, { useEffect, useState } from "react";
import ItemCard from "../../components/itemCard/itemCard";

import "./TeachersPage.css";

import { useHistory } from "react-router-dom";

import { Form } from "react-bootstrap";
import axios from "axios";

const TeachersPage = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [allTeachers, setAllTeachers] = useState([]);
  const [shownArray, setShownArray] = useState([]);

  const itemCardHandler = (title) => {
    console.log(title);
    history.push(`teachers/${title}`);
  };

  const searchChangedHandler = (e) => {
    setSearchText(e.target.value);
    setShownArray(
      allTeachers.filter((val) =>
        val.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const fetchLectures = async () => {
      const res = await axios.get("http://localhost:3000/instructor/get_all");
      console.log(res);
      setAllTeachers(res.data.lectures);
      setShownArray(res.data.lectures);
    };

    fetchLectures();
  }, []);

  return (
    <div className="teacherspage-container">
      <div className="comment-form-container">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Search courses..."
              value={searchText}
              onChange={searchChangedHandler}
            />
          </Form.Group>
        </Form>
      </div>
      {shownArray.length ? (
        shownArray.map((item) => (
          <ItemCard
            key={item._id}
            lectureId={item._id}
            title={item.name}
            description={item.description}
            rating={item.rating}
            onClick={itemCardHandler}
          />
        ))
      ) : (
        <p>No Items Found!</p>
      )}
    </div>
  );
};

export default TeachersPage;
