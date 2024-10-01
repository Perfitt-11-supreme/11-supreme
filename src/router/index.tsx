import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { lazy } from 'react';

// 페이지 컴포넌트를 lazy로 불러오기
const ImageSearch = lazy(() => import('../components/choose-shose/image-search/ImageSearch'));
const TextSearch = lazy(() => import('../components/choose-shose/text-search/TextSearch'));
const EmptyShoesRoom = lazy(() => import('../components/empty-shoes-room/EmptyShoesRoom'));
const FootInfo = lazy(() => import('../components/foot-info/FootInfo'));
const Login = lazy(() => import('../components/login/Login'));
const EmailLogin = lazy(() => import('../components/login/emaillogin/EmailLogin'));
const FindEmail = lazy(() => import('../components/login/find/FindEmail'));
const FindPassword = lazy(() => import('../components/login/find/FindPassword'));
const LoginHello = lazy(() => import('../components/login/login-hello/LoginHello'));
const OnBoarding = lazy(() => import('../components/onboarding/OnBoarding'));
const ShoesInfo = lazy(() => import('../components/shoes-info/ShoesInfo'));
const ShoesRegistry = lazy(() => import('../components/shoes-registry/ShoesRegistry'));
const BridgePage = lazy(() => import('../pages/bridge-page/bridgePage'));
const ChatBotPage = lazy(() => import('../pages/chatbot-page/chatBotPage'));
const LikedPage = lazy(() => import('../pages/liked-page/LikedPage'));
const Mypage = lazy(() => import('../pages/mypage/Mypage'));
const NotFound = lazy(() => import('../pages/not-found/notFound'));
const SharePage = lazy(() => import('../pages/share-page/SharePage'));
const ViewedHistoryPage = lazy(() => import('../pages/viewed-history-page/ViewedHistoryPage'));

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
      {
        path: '/findemail',
        element: <FindEmail />,
      },
      {
        path: '/findpassword',
        element: <FindPassword />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
