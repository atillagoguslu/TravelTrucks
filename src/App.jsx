import './App.css'
import { Outlet, NavLink } from 'react-router';
import logo from './assets/logo.svg';

function App() {

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="nav">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
            <NavLink to="/catalog" className={({ isActive }) => isActive ? 'active' : ''}>Catalog</NavLink>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default App
