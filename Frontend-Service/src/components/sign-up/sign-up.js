import React, { useState } from "react";

import "./sign-up.scss";

import { Button } from "react-bootstrap";

import FormInput from "../form-input/form-input";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/authActions";

//import { auth, createUserProfileDocument } from "../../firebase/firebase";

const SignUp = () => {
  const dispatch = useDispatch();
  const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errMessage, setErrMessage] = useState("");

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrMessage("Passwords does not match!!");
      return;
    }

    if (!email.includes("@bahcesehir.edu.tr")) {
      setErrMessage(
        "Please sign up with Bahcesehir University email address. (name.surname@bahcesehir.edu.tr)"
      );
      return;
    }

    try {
      setErrMessage("");
      const response = await axios.post("http://localhost:3000/user/signup", {
        email,
        password,
        displayname: displayName,
      });

      if (response.status === 201) {
        dispatch(login(email, password));
      } else {
        alert("Sorry, There was an error!");
      }

      setUserCredentials({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert("There was an error! Please try again later.");
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2 className="title">Sign Up</h2>
      <span className="subtitle">
        Create an account with email and password
      </span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />
        <p style={{ color: "tomato" }}>{errMessage}</p>
        <div className="buttons">
          <Button type="submit" variant="outline-dark">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
