import { createBrowserRouter } from 'react-router-dom';
import BridgePage from '../pages/bridge-page/bridgePage';
import ChatBotPage from '../pages/chatbot-page/chatBotPage';
import SideMenu from '../pages/sidemenu/SideMenu';
import TextSearch from '../components/choose-shose/text-search/TextSearch';
import ImageSearch from '../components/choose-shose/image-search/ImageSearch';
import ShoesRegistry from '../components/shoes-registry/ShoesRegistry';
import LikedPage from '../pages/liked-page/LikedPage';
import ViewedHistoryPage from '../pages/viewed-history-page/ViewedHistoryPage';
import Mypage from '../pages/mypage/Mypage';

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
    path: '/mypage',
    element: <Mypage />,
  },
  {
    path: '/likedpage',
    element: <LikedPage />,
  },
  {
    path: '/viewedhistorypage',
    element: <ViewedHistoryPage />,
  },
]);
