import { createBrowserRouter } from 'react-router-dom';
import ProductFitComment from '../components/chatbot/product-fit-comment/ProductFitComment';
import ImageSearch from '../components/choose-shose/image-search/ImageSearch';
import TextSearch from '../components/choose-shose/text-search/TextSearch';
import EmptyShoesRoom from '../components/empty-shoes-room/EmptyShoesRoom';
import ShoesRoom from '../components/empty-shoes-room/shoes-room/ShoesRoom';
import Login from '../components/login/Login';
import LoginHello from '../components/login/LoginHello';
import ShoesInfo from '../components/shoes-info/ShoesInfo';
import ShoesRegistry from '../components/shoes-registry/ShoesRegistry';
import SignUpInfoInputValid from '../components/signup/infoInput/SignUpInfoInputValid';
import SignUpSizeInputValid from '../components/signup/sizeinput/SignUpSizeInputValid';
import BridgePage from '../pages/bridge-page/bridgePage';
import ChatBotPage from '../pages/chatbot-page/chatBotPage';
import LikedPage from '../pages/liked-page/LikedPage';
import Mypage from '../pages/mypage/Mypage';
import SideMenu from '../pages/sidemenu/SideMenu';
import ViewedHistoryPage from '../pages/viewed-history-page/ViewedHistoryPage';
import EmailLogin from '../components/login/emaillogin/EmailLogin';

export const router = createBrowserRouter([
  {
    path: '/chatbot',
    element: <ChatBotPage />,
  },
  {
    path: '/test',
    element: <ProductFitComment />,
  },
  {
    path: '/redirect',
    element: <BridgePage />,
  },
  {
    path: '/text-search',
    element: <TextSearch />,
  },
  {
    path: '/image-search',
    element: <ImageSearch />,
  },
  {
    path: '/empty-shoesroom',
    element: <EmptyShoesRoom />,
  },
  {
    path: '/shoesroom',
    element: <ShoesRoom />,
  },
  {
    path: '/shoes-registry',
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
  {
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
    path: '/shoesinfo',
    element: <ShoesInfo />,
  },
  {
    path: '/emaillogin',
    element: <EmailLogin />,
  },
]);
