<<<<<<< HEAD
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
=======
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import OnBoarding from '../components/onboarding/OnBoarding';
import OnBoarding2 from '../components/onboarding/OnBoarding2';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'onBoarding',
        element: <OnBoarding />,
      },
      {
        path: 'onBoarding2',
        element: <OnBoarding2 />,
      },
    ],
  },
]);

export default router;
>>>>>>> 002be67 (style: onboarding)
