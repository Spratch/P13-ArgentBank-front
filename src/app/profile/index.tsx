import Accounts from "../../components/user/accounts";
import UserHero from "../../components/user/hero";

export default function UserProfile() {
  return (
    <main className="main bg-dark">
      <UserHero />
      <h2 className="sr-only">Accounts</h2>
      <Accounts />
    </main>
  );
}
