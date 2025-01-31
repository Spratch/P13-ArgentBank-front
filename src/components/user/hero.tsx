export default function UserHero() {
  const user = {
    firstName: "Tony",
    lastName: "Jarvis"
  };

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {user.firstName} {user.lastName}!
      </h1>
      <button className="edit-button">Edit Name</button>
    </div>
  );
}
