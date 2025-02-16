import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { loginApi } from "../../redux/features/auth.slice";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginApi({ email, password }));
    } catch (err) {
      console.error("Échec de la connexion:", err);
    }
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button
          type="submit"
          className="sign-in-button"
          disabled={authState.status === "loading"}
          onClick={handleSubmit}
        >
          Sign In
        </button>
      </form>
      {authState.status === "loading" && <p>Chargement...</p>}
      {authState.status === "failed" && <p>Erreur: {authState.error}</p>}
    </section>
  );
}
