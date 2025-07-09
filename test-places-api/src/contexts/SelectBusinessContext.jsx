import { createContext, useContext, useState } from "react";

const SelectedBusinessContext = createContext();

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

export function useSelectedBusiness() {
  const context = useContext(SelectedBusinessContext);
  if (!context)
    throw new Error("useSelectedBusiness must be used within Provider");
  return context;
}
