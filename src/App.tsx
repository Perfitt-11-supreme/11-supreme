import ShoesRegistry from './components/shoes-registry/ShoesRegistry';
import EmptyShoesRoom from './components/empty-shoes-room/EmptyShoesRoom';
import ShoesRoom from './components/empty-shoes-room/shoes-room/ShoesRoom';
import OnBoarding from './components/onboarding/OnBoarding';
import OnBoarding2 from './components/onboarding/OnBoarding2';
import { Link, Outlet } from 'react-router-dom';
import FootInfo from './components/foot-info/FootInfo';
import MyFootInfo from './components/foot-info/MyFootInfo';
import ImageSearch from './components/choose-shose/image-search/ImageSearch';

const App = () => {
  return (
    <>
      <ImageSearch />
    </>
  );
};
export default App;
