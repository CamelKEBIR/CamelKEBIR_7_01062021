import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import DesactivateAccount from "./pages/DesactivateAccount.js";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import LogoWS from "./logo/LogoWS.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSignInAlt, faUserPlus, faHome, faUpload } from '@fortawesome/free-solid-svg-icons';


function App() {



  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
              {!authState.status ? (
                <>
                  <a className="svg-container" href="/">
                    <div className="logo-image">
                      <img src={LogoWS} />
                    </div>
                  </a>
                  <div className="logIn">
                    <Link className="signin-icon" to="/login">
                      <FontAwesomeIcon className="signin" icon={faSignInAlt} />
                    </Link>
                  </div>
                  <div className="signUp">
                    <Link className="registration-icon" to="/registration">
                      <FontAwesomeIcon className="registration" icon={faUserPlus} />
                    </Link>
                  </div>


                </>
              ) : (
                <>
                  <div className="svg-container2">
                    <div className="logo-image2">
                      <img src={LogoWS} />
                    </div>
                  </div>
                  <Link className="home" to="/">
                    <FontAwesomeIcon className="Home" icon={faHome} />
                  </Link>
                  <Link className="upload" to="/createpost">
                    <FontAwesomeIcon className="Upload" icon={faUpload} />
                  </Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h1><Link to="/profile">{authState.username}</Link></h1>
              <Link to="/login">
              {authState.status && <FontAwesomeIcon className="logout" icon={faSignOutAlt} onClick={logout} ></FontAwesomeIcon>}
              </Link>
            </div>
          </div>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/createpost" exact element={<CreatePost />} />
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/registration" exact element={<Registration />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/changepassword" exact element={<ChangePassword />} />
            <Route path="/desactivateaccount" exact element={<DesactivateAccount />} />
            <Route path="*" exact element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
