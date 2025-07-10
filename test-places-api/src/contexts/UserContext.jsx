import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

// context: UserContext
// DESCRIPTION: A global context for managing the authenticated user state.
// When user first logins in to the app or when they upgrade to PRO we use this to set
// the current state of the user
// Privides 'user' and 'setUser' throughout the app
const UserContext = createContext();

// component: UserProvider
// DESCRIPTION: Wraps your application and provides the user state to all child components.
// PARAM: children (React.ReactNode): All components that should have access to the user context.
// RETURNS: JSX: Provides the 'user' and 'setUser' values
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// custom hook: useUser

// DESCRIPTION: Custom hook to access the user context easily.
// Throws an error if used outside of <UserProvider>

// RETURNS: {user, setUser} The user state and the function
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    if (!context) throw new Error("useUser must be used within Provider");
  }
  return context;
}
