import { createRoot } from "react-dom/client";
import "./App.css";
import AppRoutes from "./routes/index.tsx";
import { Toaster } from "sonner";
import { PopupManager } from "./components/PopupManager.tsx";
import { ModalProvider } from "./components/ModalManager/ModalManager.tsx";

const Root = () => {
  return (
    <ModalProvider>
      <Toaster position="top-center" />
      <AppRoutes />
      <PopupManager />
    </ModalProvider>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
