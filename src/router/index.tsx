import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import EmptyShoesRoom from '../components/empty-shoes-room/EmptyShoesRoom';
import FootInfo from '../components/foot-info/FootInfo';
import Login from '../components/login/Login';
import EmailLogin from '../components/login/emaillogin/EmailLogin';
import FindEmail from '../components/login/find/FindEmail';
import FindPassword from '../components/login/find/FindPassword';
import LoginHello from '../components/login/login-hello/LoginHello';
import OnBoarding from '../components/onboarding/OnBoarding';
import ShoesInfo from '../components/shoes-info/ShoesInfo';
import ShoesRegistry from '../components/shoes-registry/ShoesRegistry';
import BridgePage from '../pages/bridge-page/bridgePage';
import ChatBotPage from '../pages/chatbot-page/chatBotPage';
import LikedPage from '../pages/mypage/liked-page/LikedPage';
import Mypage from '../pages/mypage/Mypage';
import NotFound from '../pages/not-found/notFound';
import SharePage from '../pages/share-page/SharePage';
import ViewedHistoryPage from '../pages/mypage/viewed-history-page/ViewedHistoryPage';
import ImageSearch from '../pages/imagesearch-page/ImageSearch';
import TextSearch from '../pages/textsearch-page/TextSearch';
import EditUser from '../components/mypage/mypage-service-button/edit-user/EditUser';
import EditPassword from '../components/mypage/mypage-service-button/edit-password/EditPassword';

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
