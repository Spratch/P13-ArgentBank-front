import { Link } from "react-router-dom";

export default function Header() {
  const isSignedIn = false;
  const user = {
    firstName: "Tony"
  };

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

      {!isSignedIn ? (
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
          <a
            className="main-nav-item"
            href="./user.html"
          >
            <i className="fa fa-user-circle"></i> {user.firstName}{" "}
          </a>
          <a
            className="main-nav-item"
            href="./index.html"
          >
            <i className="fa fa-sign-out"></i> Sign Out
          </a>
        </div>
      )}
    </nav>
  );
}
