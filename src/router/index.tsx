import { createBrowserRouter } from 'react-router-dom';
import ImageSearch from '../components/choose-shose/image-search/ImageSearch';
import TextSearch from '../components/choose-shose/text-search/TextSearch';
import EmptyShoesRoom from '../components/empty-shoes-room/EmptyShoesRoom';
import FootInfo from '../components/foot-info/FootInfo';
import Login from '../components/login/Login';
import LoginHello from '../components/login/LoginHello';
import EmailLogin from '../components/login/emaillogin/EmailLogin';
import FindEmail from '../components/login/find/FindEmail';
import FindPassword from '../components/login/find/FindPassword';
import OnBoarding from '../components/onboarding/OnBoarding';
import ShoesInfo from '../components/shoes-info/ShoesInfo';
import ShoesRegistry from '../components/shoes-registry/ShoesRegistry';
import BridgePage from '../pages/bridge-page/bridgePage';
import ChatBotPage from '../pages/chatbot-page/chatBotPage';
import LikedPage from '../pages/liked-page/LikedPage';
import Mypage from '../pages/mypage/Mypage';
import NotFound from '../pages/not-found/notFound';
import SharePage from '../pages/share-page/SharePage';
import ViewedHistoryPage from '../pages/viewed-history-page/ViewedHistoryPage';

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
    path: '/login',
    element: <Login />,
  },
  {
    path: '/hello/:id',
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
    path: '/',
    element: <OnBoarding />,
  },
  {
    path: '/footinfo',
    element: <FootInfo />,
  },
  // {
  //   path: '/googlesignup',
  //   element: <GoogleSignUpPlus />,
  // },
  {
    path: '/findemail',
    element: <FindEmail />,
  },
  {
    path: '/findpassword',
    element: <FindPassword />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
