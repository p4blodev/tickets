import { createContext, useState } from "react";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [menuHidden, setMenuHidden] = useState(false);

  const showMenu = () => {
    setMenuHidden(false);
  };

  const hideMenu = () => {
    setMenuHidden(true);
  };

  return (
    <UIContext.Provider
      value={{
        menuHidden,
        showMenu,
        hideMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
