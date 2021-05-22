import React from "react";

import "./signin-signup.scss";

import SignUp from "../../components/sign-up/sign-up";
import SignIn from "../../components/sign-in/sign-in";

const SignInAndSignUpPage = () => (
  <div className="sign-in-and-sign-up">
    <SignUp />
    <SignIn />
  </div>
);

export default SignInAndSignUpPage;
