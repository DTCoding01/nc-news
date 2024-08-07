import { createContext, useEffect, useState } from "react";
import { getUserFromStorage } from "../utils/localStorage";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const storedUser = getUserFromStorage();
    if (storedUser) {
      setUser(storedUser);
    } else {

      setUser({
        username: "tickle122",
        name: "Tom Tickle",
        avatar_url:
          "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
