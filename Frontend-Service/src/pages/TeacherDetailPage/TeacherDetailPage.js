import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./TeacherDetailPage.css";

import { Card, ListGroup, Spinner } from "react-bootstrap";
import CommentForm from "../../components/commentForm/commentForm";
import DetailsJumbotron from "../../components/detailsJumbotron/detailsJumbotron";
import Comment from "../../components/comments/comments";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/selectors/authSelector";
import axios from "axios";

const TeacherDetailPage = () => {
  const cuurentUser = useSelector(selectCurrentUser);
  let { teacherId } = useParams();

  const [teacherInfo, setTeacherInfo] = useState(null);

  useEffect(() => {
    const fetchLecture = async () => {
      const res = await axios.get(
        `http://localhost:3000/instructor/${teacherId}`
      );
      console.log(res);
      setTeacherInfo(res.data.doc);
    };

    fetchLecture();
  }, []);

  if (teacherInfo) {
    return (
      <div className="details-container">
        <DetailsJumbotron
          lectureId={teacherId}
          name={teacherInfo.name}
          shortDesc={teacherInfo.description}
          rating={teacherInfo.rating}
        />
        <Card style={{ width: "100vw", marginBottom: "10px" }} body>
          {teacherInfo.description}
        </Card>
        <Card style={{ width: "100vw" }}>
          <Card.Header>Fundamental Information</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              Classes:{" "}
              {teacherInfo.lectures.map((cur) => (
                <Link
                  key={cur._id}
                  style={{
                    textDecoration: "underline",
                    color: "#67a0e0",
                    cursor: "pointer",
                  }}
                  to={`/lectures/${cur.lectureID}`}
                >
                  {cur.lectureName},{" "}
                </Link>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Card>
        {cuurentUser ? (
          <CommentForm pageId={teacherId} commentForTeacher={true} />
        ) : (
          <p>Sorry you need to sign in to comment</p>
        )}
        {teacherInfo.comments.map((cur) => (
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

export default TeacherDetailPage;
