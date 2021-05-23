import React, { useState } from "react";

import { Card } from "react-bootstrap";

import "./itemCard.css";

import { Star } from "react-feather";

const ItemCard = ({ title, lectureId, description, rating, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="card-container"
      onClick={() => onClick(lectureId)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Card bg={hover ? "info" : "light"} text={hover ? "light" : "dark"}>
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p> {description} </p>
            <footer className="blockquote-footer" style={{color: hover ? 'white' : 'black'}}>
              Rating: {rating.toFixed(2)} <Star color="black" fill="yellow" size={20} />
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ItemCard;
