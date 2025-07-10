import { createContext, useContext, useState } from "react";

// context: SelectedBusinessContext
// DESCRIPTION: Global context for storing the business selected by the user.
// When a user types in the "Search your business" input, they get to choose which business
//  they own. This allows to store their business globally
// Provides 'selectedBusiness' and 'setSelectedBusiness' throughout the app.
const SelectedBusinessContext = createContext();

// component: SelectedBusinessProvider
// DESCRIPTION: Wraps your application or routes that need access to a selected business.
// PARAM: children (React.ReactNode): Components that need to access selected business state.
// RETURNS: JSX: Provides 'selectedBusiness' and 'setSelectedBusiness' to the app.
export function SelectedBusinessProvider({ children }) {
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  return (
    <SelectedBusinessContext.Provider
      value={{ selectedBusiness, setSelectedBusiness }}
    >
      {children}
    </SelectedBusinessContext.Provider>
  );
}

// custom hook: useSelectedBusiness
// DESCRIPTION: Custom hook to access the selected business context easily.
// Ensures usage is within <SelectedBusinessProvider>.
// RETURNS: { selectedBusiness, setSelectedBusiness } - Selected business object and setter.
export function useSelectedBusiness() {
  const context = useContext(SelectedBusinessContext);
  if (!context)
    throw new Error("useSelectedBusiness must be used within Provider");
  return context;
}
