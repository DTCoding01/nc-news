import { Link } from "react-router-dom";
import "../css/components/Header.scss";

export default function Header() {
  return (
    <header className="header">
      <h1 className="logo">
        <Link to={"/"}>NCNews</Link>
      </h1>
    </header>
  );
}
