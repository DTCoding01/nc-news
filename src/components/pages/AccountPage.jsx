import { useContext, useState } from "react";
import "../../css/pages/AccountPage.scss";
import { getUserByUsername } from "../../../api";
import { UserContext } from "../../contexts/UserContext";
import { saveUserToStorage } from "../../utils/localStorage";
import { useError } from "../../contexts/ErrorContext";
import AccountDetails from "./AccountDetails";

export default function AccountPage() {
  const { user, setUser } = useContext(UserContext);
  const [inputValue, setInputValue] = useState("tickle122");
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
          <select id="log-in-input" value={inputValue} onChange={handleChange}>
            <option value="tickle122">tickle122</option>
            <option value="grumpy19">grumpy19</option>
            <option value="happyamy2016">happyamy2016</option>
            <option value="cooljmessy">cooljmessy</option>
            <option value="weegembump">weegembump</option>
            <option value="jessjelly">jessjelly</option>
          </select>
        </label>
        <button>Log-in</button>
      </form>
    </section>
  );
}
