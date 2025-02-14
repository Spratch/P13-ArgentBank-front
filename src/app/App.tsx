import { Provider, useSelector } from "react-redux";
import "../main.css";
import store, { RootState } from "../redux/store";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/layout";
import Home from "./home";
import SignIn from "./sign-in";
import UserProfile from "./profile";

const ProtectedRoute = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? <Outlet /> : <Navigate to="/sign-in" />;
};

const NoProtectedRoute = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? <Navigate to="/profile" /> : <Outlet />;
};

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<Home />}
          />
          <Route element={<NoProtectedRoute />}>
            <Route
              path="/sign-in"
              element={<SignIn />}
            />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route
              path="/profile"
              element={<UserProfile />}
            />
          </Route>
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
