import React from "react";

import "./comments.css";

import { Card } from "react-bootstrap";

import { Star } from "react-feather";

const Comment = ({ username, rating, comment, isAnonymous }) => {
  const ratingAppreance = [];
  for (let i = 0; i < rating; i++) {
    ratingAppreance.push(<Star key={i} color="black" fill="yellow" />);
  }
  return (
    <div className="comments-container">
      <Card>
        <Card.Header as="h5">{isAnonymous ? 'Anonymous' : username}</Card.Header>
        <Card.Body>
          <Card.Title>{ratingAppreance}</Card.Title>
          <Card.Text>{comment}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Comment;
