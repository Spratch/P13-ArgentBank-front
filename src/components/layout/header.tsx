import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { logout } from "../../redux/features/auth.slice";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  const firstName = useSelector(
    (state: RootState) => state.profile.user?.firstName
  );

  return (
    <nav className="main-nav">
      <Link
        to="/"
        className="main-nav-logo"
      >
        <img
          className="main-nav-logo-image"
          src="/src/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      {!token ? (
        <div>
          <Link
            to="/sign-in"
            className="main-nav-item"
          >
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        </div>
      ) : (
        <div>
          <Link
            className="main-nav-item"
            to="/profile"
          >
            <i className="fa fa-user-circle"></i> {firstName}{" "}
          </Link>
          <a
            className="main-nav-item"
            href="#"
            onClick={handleLogout}
          >
            <i className="fa fa-sign-out"></i> Sign Out
          </a>
        </div>
      )}
    </nav>
  );
}
