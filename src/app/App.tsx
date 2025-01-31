import { Provider } from "react-redux";
import "../main.css";
import store from "../redux/store";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/layout";
import Home from "./home";
import SignIn from "./sign-in";
import User from "./user";

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
            path="/user/:id"
            element={<User />}
          />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
