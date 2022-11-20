import { useContext, useEffect } from "react";
import { UIContext } from "../context/UIContext";

export const useHideMenu = (hide) => {
  const { showMenu, hideMenu } = useContext(UIContext);

  useEffect(() => {
    hide ? hideMenu() : showMenu();
  }, [hideMenu, hide, showMenu]);
};
