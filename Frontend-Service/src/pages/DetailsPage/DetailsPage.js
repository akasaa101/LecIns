import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import "./DetailsPage.css";

import { Card, ListGroup, Spinner } from "react-bootstrap";
import CommentForm from "../../components/commentForm/commentForm";
import DetailsJumbotron from "../../components/detailsJumbotron/detailsJumbotron";
import Comment from "../../components/comments/comments";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/selectors/authSelector";
import axios from "axios";

const DetailsPage = () => {
  const location = useLocation();
  const cuurentUser = useSelector(selectCurrentUser);
  let { lectureId } = useParams();

  const [lectureInfo, setLectureInfo] = useState(null);

  useEffect(() => {
    const fetchLecture = async () => {
      const res = await axios.get(`http://localhost:3000/lecture/${lectureId}`);
      console.log(res);
      setLectureInfo(res.data.doc);
    };

    fetchLecture();
  }, []);

  if (lectureInfo) {
    return (
      <div className="details-container">
        <DetailsJumbotron
          lectureId={lectureId}
          shortDesc={lectureInfo.shortDescription}
          rating={lectureInfo.rating}
          name={`${lectureId} - ${lectureInfo.name}`}
        />
        <Card style={{ width: "100vw", marginBottom: "10px" }} body>
          {lectureInfo.description}
        </Card>
        <Card style={{ width: "100vw" }}>
          <Card.Header>Fundamental Information</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              Credit: {lectureInfo.credit} Credit / {lectureInfo.akts} AKTS
            </ListGroup.Item>
            <ListGroup.Item>
              Teachers:{" "}
              {lectureInfo.instructors.map((cur) => (
                <Link
                  key={cur._id}
                  style={{
                    textDecoration: "underline",
                    color: "#67a0e0",
                    cursor: "pointer",
                  }}
                  to={{
                    pathname: `/teachers/${cur.name}`,
                    state: { prevPath: location.pathname, name: cur.name },
                  }}
                >
                  {cur.name},{" "}
                </Link>
              ))}
            </ListGroup.Item>
            <ListGroup.Item>Semester: {lectureInfo.semester}</ListGroup.Item>
          </ListGroup>
        </Card>
        {cuurentUser ? (
          <CommentForm pageId={lectureId} commentForTeacher={false} />
        ) : (
          <p>Sorry you need to sign in to comment</p>
        )}
        {lectureInfo.comments.map((cur) => (
          <Comment
            key={cur._id}
            username={cur.user}
            rating={cur.score}
            comment={cur.comment}
            isAnonymous={cur.isAnon}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="loading-container">
        <Spinner animation="grow" variant="info" />
      </div>
    );
  }
};

export default DetailsPage;
