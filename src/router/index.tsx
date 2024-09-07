import { createBrowserRouter } from 'react-router-dom';
import BridgePage from '../pages/bridge-page/bridgePage';
import ChatBotPage from '../pages/chatbot-page/chatBotPage';
import SideMenu from '../pages/sidemenu/SideMenu';
import LikedAndViewedHistory from '../pages/liked-and-viewedhistory/LikedAndViewedHistory';
import TextSearch from '../components/choose-shose/text-search/TextSearch';
import ImageSearch from '../components/choose-shose/image-search/ImageSearch';
import ShoesRegistry from '../components/shoes-registry/ShoesRegistry';

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
  {
    path: '/textSearch',
    element: <TextSearch />,
  },
  {
    path: '/imageSearch',
    element: <ImageSearch />,
  },
  {
    path: '/shoesRegistry',
    element: <ShoesRegistry />,
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
