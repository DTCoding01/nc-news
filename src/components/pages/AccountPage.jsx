import { useContext, useState } from "react";
import "../../css/pages/AccountPage.scss";
import { getUserByUsername } from "../../../api";
import { UserContext } from "../../contexts/UserContext";
import { saveUserToStorage } from "../../utils/localStorage";

export default function AccountPage() {
  const { setUser, user } = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");

  function handleChange(e) {
    setInputValue(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    getUserByUsername(inputValue)
      .then((user) => {
        setUser(user);
        saveUserToStorage(user)
      })
      .then(() => {
        setInputValue("");
      })
      .catch((err) => {
        console.log("User not found", err);
      });
  }
  return (
    <section className="log-in-page">
      <form onSubmit={handleSubmit} className="log-in-form">
        <label htmlFor="log-in-input">
          Username
          <input onChange={handleChange} id="log-in-input"></input>
        </label>
        <button>Log-in</button>
      </form>
    </section>
  );
}
