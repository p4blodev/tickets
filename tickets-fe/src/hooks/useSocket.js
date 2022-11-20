import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

export const useSocket = () => {
  const { onLine, socket } = useContext(SocketContext);

  return { onLine, socket };
};
