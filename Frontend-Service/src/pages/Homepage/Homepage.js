import React, { useEffect } from "react";

import ItemCard from "../../components/itemCard/itemCard";

import "./Homepage.css";

import { useHistory } from "react-router-dom";

import { Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const Homepage = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [allLectures, setAllLectures] = useState([]);
  const [shownArray, setShownArray] = useState([]);

  const itemCardHandler = (title) => {
    console.log(title);
    history.push(`lectures/${title}`);
  };

  const searchChangedHandler = (e) => {
    setSearchText(e.target.value);
    setShownArray(
      allLectures.filter((val) => {
        const title = val.id + " " + val.name;
        return title.toLowerCase().includes(e.target.value.toLowerCase());
      })
    );
  };

  useEffect(() => {
    const fetchLectures = async () => {
      const res = await axios.get("http://localhost:3000/lecture/get_all");
      console.log(res.data.lectures);
      setAllLectures(res.data.lectures);
      setShownArray(res.data.lectures);
    };

    fetchLectures();
  }, []);

  return (
    <div className="homepage-container">
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
            lectureId={item.id}
            title={item.id + " - " + item.name}
            description={item.shortDescription}
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

export default Homepage;
