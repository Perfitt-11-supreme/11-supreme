import { createBrowserRouter } from 'react-router-dom';
import ImageSearch from '../components/choose-shose/image-search/ImageSearch';
import TextSearch from '../components/choose-shose/text-search/TextSearch';
import EmptyShoesRoom from '../components/empty-shoes-room/EmptyShoesRoom';
import Login from '../components/login/Login';
import LoginHello from '../components/login/LoginHello';
import EmailLogin from '../components/login/emaillogin/EmailLogin';
import OnBoarding from '../components/onboarding/OnBoarding';
import ShoesInfo from '../components/shoes-info/ShoesInfo';
import ShoesRegistry from '../components/shoes-registry/ShoesRegistry';
import SignUpInfoInputValid from '../components/signup/infoInput/SignUpInfoInputValid';
import SignUpSizeInputValid from '../components/signup/sizeinput/SignUpSizeInputValid';
import BridgePage from '../pages/bridge-page/bridgePage';
import ChatBotPage from '../pages/chatbot-page/chatBotPage';
import LikedPage from '../pages/liked-page/LikedPage';
import Mypage from '../pages/mypage/Mypage';
import ViewedHistoryPage from '../pages/viewed-history-page/ViewedHistoryPage';
import EmailLogin from '../components/login/emaillogin/EmailLogin';
import OnBoarding from '../components/onboarding/OnBoarding';
import FootInfo from '../components/foot-info/FootInfo';
import SharePage from '../pages/share-page/SharePage';
import SideMenu from '../pages/sidemenu/SideMenu';

export const router = createBrowserRouter([
  {
    path: '/chatbot',
    element: <ChatBotPage />,
  },
  {
    path: '/share/:id',
    element: <SharePage />,
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
    path: '/shoes-registry/:shoesId?',
    element: <ShoesRegistry />,
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
    path: '/shoesinfo/:shoesId',
    element: <ShoesInfo />,
  },
  {
    path: '/emaillogin',
    element: <EmailLogin />,
  },
  {
    path: '/onboarding',
    element: <OnBoarding />,
  },
  {
    path: '/footinfo',
    element: <FootInfo />,
  },
]);
