import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logUserSuccess } from "./actions/actions";
import MainPage from "./pages/main-page/main-page-component";
import SignUpPage from "./pages/signup-page/signup-page-component";
import "@fontsource/roboto/300.css";

function App() {
  const myUserName = useSelector((state) => state.user.username)
  const [loggedUserName, setLoggedUserName] = useState(localStorage.getItem("userName"));
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');


  useEffect(() => {
    if (!myUserName.length && loggedUserName !== null) {
      dispatch(logUserSuccess(loggedUserName));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    dispatch(logUserSuccess(userName));
    setLoggedUserName(userName);
    setUserName("");
  }

  return (
    <>
      {loggedUserName !== null && loggedUserName === myUserName ?
        <MainPage />
        :
        <SignUpPage
          userName={userName}
          setUserName={(username) => setUserName(username)}
          handleSubmit={(e) => handleSubmit(e)}
        />
      }
    </>
  );

}

export default App;