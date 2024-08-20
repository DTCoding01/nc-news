import { Link } from "react-router-dom";
import "../css/components/Footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBookOpen,
  faCirclePlus,
  faUserLarge,
  faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer>
      
      <ul>
        <li>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faHouse} size="xl" />
          </Link>
        </li>
        <li>
          <Link to={"/articles"}>
            <FontAwesomeIcon icon={faBookOpen} size="xl" />
          </Link>
        </li>
        <li>
          <Link to={"/topics"}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
          </Link>
        </li>
        <li>
          <Link to={"/post"}>
            <FontAwesomeIcon icon={faCirclePlus} size="xl" />
          </Link>
        </li>
        <li>
          <Link to={"/account"}>
            <FontAwesomeIcon icon={faUserLarge} size="xl" />
          </Link>
        </li>
      </ul>
    </footer>
  );
}
