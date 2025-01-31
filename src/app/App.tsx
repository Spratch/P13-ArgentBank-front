import { Provider } from "react-redux";
import "../main.css";
import store from "../redux/store";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/layout";
import Home from "./home";
import SignIn from "./sign-in";
import UserProfile from "./profile";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/sign-in"
            element={<SignIn />}
          />
          <Route
            path="/profile"
            element={<UserProfile />}
          />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
