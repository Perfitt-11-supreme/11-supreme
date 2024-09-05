import ShoesRegistry from './components/shoes-registry/ShoesRegistry';
import EmptyShoesRoom from './components/empty-shoes-room/EmptyShoesRoom';
import ShoesRoom from './components/empty-shoes-room/shoes-room/ShoesRoom';
import OnBoarding from './components/onboarding/OnBoarding';
import OnBoarding2 from './components/onboarding/OnBoarding2';
import { Link, Outlet } from 'react-router-dom';
import FootInfo from './components/foot-info/FootInfo';
import MyFootInfo from './components/foot-info/MyFootInfo';

const App = () => {
  return (
    <>
      {/* <EmptyShoesRoom /> */}
      {/* <ShoesRoom /> */}
      {/* <ShoesRegistry /> */}
      {/* <ChatBotPage /> */}
      {/* <OnBoarding /> */}
      {/* <OnBoarding2 /> */}
      <FootInfo />
      {/* <MyFootInfo /> */}
    </>
  );
};
export default App;
