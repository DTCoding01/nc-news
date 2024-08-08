import { Link } from "react-router-dom";
import "../css/components/Footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBookOpen,
  faCirclePlus,
  faUserLarge,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer>
      <ul>
        <li>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faHouse} />
          </Link>
        </li>
        <li>
          <Link to={"/topics"}>
            <FontAwesomeIcon icon={faBookOpen} />
          </Link>
        </li>
        <li>
          <Link to={"/post"}>
            <FontAwesomeIcon icon={faCirclePlus} />
          </Link>
        </li>
        <li>
          <Link to={"/account"}>
            <FontAwesomeIcon icon={faUserLarge} />
          </Link>
        </li>
      </ul>
    </footer>
  );
}
