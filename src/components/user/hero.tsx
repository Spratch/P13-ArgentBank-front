import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useState } from "react";
import { updateApi } from "../../redux/features/update.slice";
import { profileApi } from "../../redux/features/profile.slice";

export default function UserHero() {
  const user = useSelector((state: RootState) => state.profile.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);

    try {
      if (token) {
        await dispatch(updateApi({ token, body: { firstName, lastName } }));
        await dispatch(profileApi(token));
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {!isEditing && (
          <span>
            {user?.firstName} {user?.lastName}!
          </span>
        )}
      </h1>
      {!isEditing ? (
        <button
          className="edit-button"
          onClick={() => setIsEditing(true)}
        >
          Edit Name
        </button>
      ) : (
        <form className="edit-form">
          <div className="edit-inputs">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="edit-buttons">
            <button
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
