import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import EmptyShoesRoom from '../components/empty-shoes-room/EmptyShoesRoom';
import FootInfo from '../components/foot-info/FootInfo';
import Login from '../components/login/Login';
import EmailLogin from '../components/login/emaillogin/EmailLogin';
import FindEmail from '../components/login/find/FindEmail';
import FindPassword from '../components/login/find/FindPassword';
import EditPassword from '../components/mypage/mypage-service-button/edit-password/EditPassword';
import EditUser from '../components/mypage/mypage-service-button/edit-user/EditUser';
import ShoesInfo from '../components/shoes-info/ShoesInfo';
import ShoesRegistry from '../components/shoes-registry/ShoesRegistry';
import BridgePage from '../pages/bridge-page/bridgePage';
import ChatBotPage from '../pages/chatbot-page/chatBotPage';
import LoginHello from '../pages/chatbot-page/login-hello/LoginHello';
import ImageSearch from '../pages/imagesearch-page/ImageSearch';
import Mypage from '../pages/mypage/Mypage';
import LikedPage from '../pages/mypage/liked-page/LikedPage';
import ViewedHistoryPage from '../pages/mypage/viewed-history-page/ViewedHistoryPage';
import NotFound from '../pages/not-found/notFound';
import OnBoarding from '../pages/onboarding-page/OnBoarding';
import SharePage from '../pages/share-page/SharePage';
import TextSearch from '../pages/textsearch-page/TextSearch';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <OnBoarding />,
      },
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
        path: '/my',
        element: <Mypage />,
      },
      {
        path: '/liked',
        element: <LikedPage />,
      },
      {
        path: '/viewedhistory',
        element: <ViewedHistoryPage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/chat/:chatId?',
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
        path: '/edituser',
        element: <EditUser />,
      },
      {
        path: '/editpassword',
        element: <EditPassword />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
