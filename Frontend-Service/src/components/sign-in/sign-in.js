import React, { useEffect, useState } from "react";
import "./sign-in.scss";

import { Button } from "react-bootstrap";

import FormInput from "../form-input/form-input";

//import { auth } from "../../firebase/firebase";

import { useSelector, useDispatch } from "react-redux";

import { login } from "../../redux/actions/authActions";

import {
  selectError,
} from "../../redux/selectors/authSelector";

const SignIn = () => {
  const dispatch = useDispatch();
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [errMessage, setErrMessage] = useState("");

  const { email, password } = userCredentials;

  const err = useSelector(selectError);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = userCredentials;

    try {
      dispatch(login(email, password));
      //console.log(a.user.uid)

      setCredentials({ email: "", password: "" });
    } catch (error) {
      alert("There was an error!");
      //console.log(error);
    }
  };

  useEffect(() => {
    if (err) {
      setErrMessage(
        "There was an error! Please check your credentials and try again."
      );
    }
  }, [err]);

  const handleChange = (event) => {
    const { value, name } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };
  return (
    <div className="sign-in">
      <h2 className="title">Sign In</h2>
      <span className="subtitle">Sign in with email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={email}
          label="Email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="Password"
          required
        />
        <p style={{color: 'tomato'}}>{errMessage}</p>
        <div className="buttons">
          <Button type="submit" variant="outline-dark">
            {" "}
            Sign In{" "}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
