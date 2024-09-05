import { createBrowserRouter } from "react-router-dom";
import ChatBotPage from "../pages/chatbot-page/chatBotPage";

export const router = createBrowserRouter([
  {
    path: "/chatBot",
    element: <ChatBotPage />

  }
])