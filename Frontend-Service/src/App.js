import "./App.css";

import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/header/header";
import Homepage from "./pages/Homepage/Homepage";
import TeachersPage from "./pages/TeachersPage/TeachersPage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import TeacherDetailPage from "./pages/TeacherDetailPage/TeacherDetailPage";
import Footer from "./components/footer/footer";
import SignInAndSignUpPage from "./pages/signin-signup/signin-signup";

import jwtDecode from "jwt-decode";

import { useSelector, useDispatch } from "react-redux";

import {
  selectCurrentUser,
} from "./redux/selectors/authSelector";
import { useEffect } from "react";

import { loginUser } from "./redux/actions/authActions";
import { setAuthorizationToken } from "./redux/helpers/setAuthorizationToken";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwtToken");
  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    if (token) {
      dispatch(loginUser(jwtDecode(token)));
      setAuthorizationToken(token)
    }
  }, [dispatch, token]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/lectures">
          <Homepage />
        </Route>
        <Route exact path="/lectures/:lectureId">
          <DetailsPage />
        </Route>
        <Route exact path="/teachers">
          <TeachersPage />
        </Route>
        <Route exact path="/teachers/:teacherId">
          <TeacherDetailPage />
        </Route>
        <Route
          exact
          path="/sign-in-sign-up"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />

        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
