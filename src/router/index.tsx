import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import OnBoarding from '../components/onboarding/OnBoarding';
import OnBoarding2 from '../components/onboarding/OnBoarding2';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'onBoarding',
        element: <OnBoarding />,
      },
      {
        path: 'onBoarding2',
        element: <OnBoarding2 />,
      },
    ],
  },
]);

export default router;
