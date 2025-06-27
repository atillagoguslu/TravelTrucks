import './App.css'
import { Outlet, NavLink } from 'react-router';

function App() {

  return (
    <>
      <div className="container">
        <div className="header">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/catalog" className={({ isActive }) => isActive ? 'active' : ''}>Catalog</NavLink>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default App
