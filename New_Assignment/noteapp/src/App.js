import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import PricingPage from "./Pages/PricingPage";
import Home from "./Pages/Home/Home";
import Category from "./Pages/Category";
// import Products from "./Pages/Products";
import NewCategory from "./Pages/newCategory";
import Product from "./Pages/Product";
import Notfound from "./Pages/NotFound/Notfound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} exact />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/newCategory" element={<NewCategory />} />
        <Route path="/products" element={<Product />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={< Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
