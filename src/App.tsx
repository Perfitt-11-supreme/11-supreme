import { Outlet } from 'react-router-dom';
import { responsiveBox } from './styles/responsive.css';

const App = () => {
  return (
    <div className={responsiveBox}>
      <Outlet />
    </div>
  );
};
export default App;
