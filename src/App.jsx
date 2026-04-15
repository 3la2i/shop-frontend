import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Clients from './Pages/Clients.jsx';
import Products from './Pages/Products.jsx';
import Inventory from './Pages/Inventory.jsx';
import ProtectedRoute from './Compoents/ProtectedRoute';
import { checkAuth } from './Compoents/auth';

// import MouseFollower from './Compoents/mouseFollower.jsx';
import './App.css';

function App() {
  const basePath = import.meta.env.VITE_BASE_PATH || '/';

  
  return (
  
    <Router basename={basePath}>
     {/* <MouseFollower /> */}
      <Routes>
        <Route 
          path="/login" 
          element={checkAuth() ? <Navigate to="/" replace /> : <Login />} 
        />
        <Route element={<ProtectedRoute />}>
        
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/products" element={<Products />} />
          <Route path="/inventory" element={<Inventory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
  