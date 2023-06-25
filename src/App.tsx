import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/Signin";
import CompareSelect from "./components/Compareselect";
import Product from "./components/ProductDetail";
import Bill from "./components/Bill";
import Account from "./components/Account";
import CompareList from "./components/Compare";
import Cart from "./components/Cart";
import Bills from "./components/Bills";

function App() {
  const [token, setToken] = React.useState<String>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn />;
  }
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store/:id" element={<Product />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/comparelist" element={<CompareList />} />
          <Route path="/compareselect" element={<CompareSelect />} />
          <Route path="/billlist" element={<Bills />} />

        </Routes>
      </div>
    </Router>
  );
}
export default App;