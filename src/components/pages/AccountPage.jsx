import { useContext, useState } from "react";
import "../../css/pages/AccountPage.scss";
import { getUserByUsername } from "../../../api";
import { UserContext } from "../../contexts/UserContext";
import { saveUserToStorage } from "../../utils/localStorage";
import { useError } from "../../contexts/ErrorContext";

export default function AccountPage() {
  const { setUser } = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");
  const { setError } = useError();

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    getUserByUsername(inputValue)
      .then((user) => {
        setUser(user);
        saveUserToStorage(user);
        setInputValue("");
        setError("");
      })
      .catch((err) => {
        setError("User not found. Please check your username and try again.");
      });
  }

  return (
    <section className="log-in-page">
      <form onSubmit={handleSubmit} className="log-in-form">
        <label htmlFor="log-in-input">
          Username
          <input onChange={handleChange} value={inputValue} id="log-in-input" />
        </label>
        <button>Log-in</button>
      </form>
    </section>
  );
}
