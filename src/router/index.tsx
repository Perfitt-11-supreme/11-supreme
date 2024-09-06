import { createBrowserRouter } from 'react-router-dom';
import BridgePage from '../pages/bridge-page/bridgePage';
import ChatBotPage from '../pages/chatbot-page/chatBotPage';
import SideMenu from '../pages/sidemenu/SideMenu';
import LikedAndViewedHistory from '../pages/liked-and-viewedhistory.tsx/LikedAndViewedHistory';

export const router = createBrowserRouter([
  {
    path: '/chatBot',
    element: <ChatBotPage />,
  },
  {
    path: '/redirect',
    element: <BridgePage />,
  },
  {
    path: '/sidemenu',
    element: <SideMenu />,
  },
  {
    path: '/likedandviewedhistory',
    element: <LikedAndViewedHistory />,
  },
]);
