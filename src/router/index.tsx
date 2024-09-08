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
import SignUpSizeInputValid from '../components/signup/sizeinput/SignUpSizeInputValid';
import SignUpInfoInputValid from '../components/signup/infoInput/SignUpInfoInputValid';
import Login from '../components/login/Login';
import LoginHello from '../components/login/LoginHello';
import ShoesInfo from '../components/shoes-info/ShoesInfo';
import EmptyShoesRoom from '../components/empty-shoes-room/EmptyShoesRoom';
import ShoesRoom from '../components/empty-shoes-room/shoes-room/ShoesRoom';

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
    path: '/emptyShoesRoom',
    element: <EmptyShoesRoom />,
  },
  {
    path: '/shoesRoom',
    element: <ShoesRoom />,
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
    path: '/signupinfo',
    element: <SignUpInfoInputValid />,
  },
  {
    path: '/signupsize',
    element: <SignUpSizeInputValid />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/hello',
    element: <LoginHello />,
  },
  {
    path: '/shoesInfo',
    element: <ShoesInfo />,
  },
]);
