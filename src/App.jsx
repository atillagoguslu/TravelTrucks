import './App.css'
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Campers</h1>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default App
