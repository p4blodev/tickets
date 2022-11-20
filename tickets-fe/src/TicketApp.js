import { RouterPage } from "./pages/RouterPage";
import { UIProvider } from "./context/UIContext";
import { SocketProvider } from "./context/SocketContext";

export const TicketApp = () => {
  return (
    <SocketProvider>
      <UIProvider>
        <RouterPage />;
      </UIProvider>
    </SocketProvider>
  );
};
