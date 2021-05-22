import React from "react";

import "./detailsJumbotron.css";

import { Jumbotron, Button } from "react-bootstrap";
import { Star } from "react-feather";

const DetailsJumbotron = ({ lectureId, rating, shortDesc, name }) => {
  return (
    <div className="details-jumbotron-container">
      <Jumbotron style={{ width: "100vw" }}>
        <h1>
          {name} - {rating} <Star color="black" fill="yellow" size={26} />
        </h1>
        <p>{shortDesc}</p>
        <p>
          <Button
            variant="primary"
            href="https://akts.bau.edu.tr/bilgipaketi/index/dersara/ln/en"
            target="_blank"
          >
            Learn more
          </Button>
        </p>
      </Jumbotron>
    </div>
  );
};

export default DetailsJumbotron;
