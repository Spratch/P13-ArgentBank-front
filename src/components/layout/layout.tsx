import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { profileApi } from "../../redux/features/profile.slice";

export default function Layout() {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (token) {
      dispatch(profileApi(token));
    }
  }, [token, dispatch]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
