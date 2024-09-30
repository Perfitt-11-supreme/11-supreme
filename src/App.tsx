import { Outlet } from 'react-router-dom';
import { layoutWraper, responsiveBox } from './styles/responsive.css';

const App = () => {
  return (
    <div className={layoutWraper}>
      <div className={responsiveBox}>
        <Outlet />
      </div>
    </div>
  );
};
export default App;
