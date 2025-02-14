import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function UserHero() {
  const user = useSelector((state: RootState) => state.profile.user);

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {user?.firstName} {user?.lastName}!
      </h1>
      <button className="edit-button">Edit Name</button>
    </div>
  );
}
