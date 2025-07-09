import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    if (!context) throw new Error("useUser must be used within Provider");
  }
  return context;
}
