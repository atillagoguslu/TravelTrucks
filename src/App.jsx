import './App.css';
import { Outlet, NavLink } from 'react-router';
import logo from './assets/logo.svg';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTrucks } from './redux/trucks/operations';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrucks());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'links active' : 'links'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive ? 'links active' : 'links'
              }
            >
              Catalog
            </NavLink>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
