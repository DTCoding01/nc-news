import { Link } from "react-router-dom";
import "../css/components/Header.scss";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">
          <Link to={"/articles"}>NCNews</Link>
        </h1>
        {user && <img src={user.avatar_url}></img>}
      </div>
    </header>
  );
}
