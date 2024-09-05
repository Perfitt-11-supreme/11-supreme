import ShoesRegistry from './components/shoes-registry/ShoesRegistry';
import EmptyShoesRoom from './components/empty-shoes-room/EmptyShoesRoom';
import ShoesRoom from './components/empty-shoes-room/shoes-room/ShoesRoom';
import OnBoarding from './components/onboarding/OnBoarding';
import OnBoarding2 from './components/onboarding/OnBoarding2';
import { Link, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      {/* <EmptyShoesRoom /> */}
      {/* <ShoesRoom /> */}
      {/* <ShoesRegistry /> */}
      {/* <ChatBotPage /> */}
      <OnBoarding />
      {/* <OnBoarding2 /> */}
    </>
  );
};
export default App;
