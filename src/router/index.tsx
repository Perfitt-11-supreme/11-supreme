import { createBrowserRouter } from "react-router-dom";
import BridgePage from "../pages/bridge-page/bridgePage";
import ChatBotPage from "../pages/chatbot-page/chatBotPage";

export const router = createBrowserRouter([
  {
    path: "/chatBot",
    element: <ChatBotPage />
  },
  {
    path: "/redirect",
    element: <BridgePage />
  }
])