import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import axios from "axios";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import { loginUser } from "./redux/user";
import { useDispatch, useSelector } from "react-redux";
import Content from "./components/Content";
import Cart from "./components/Cart";

function App() {
  const [products, setProducts] = useState([]);
  const usuario = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/me", { withCredentials: true })
      .then((user) => {
        dispatch(loginUser(user.data.payload));
      })
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:3001/api/products")
      .then((response) => setProducts(response.data));
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Grid items={products} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/cart" element={<Cart />}/>
        <Route path="/products/:id" element={<Content />} />
      </Routes>
    </div>
  );
}

export default App;
