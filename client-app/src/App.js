import "./styles/App.css";
import "./styles/header.css";
import "./styles/footer.css";
import "./styles/productCard.css";
import "./styles/home.css";

import { Header } from "./components/header.js";
import { Body } from "./components/body.js";
import { Footer } from "./components/footer.js";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login.js";
import Signup from "./pages/signup.js";
import Contactus from "./pages/contactus.js";
import Notfound from "./pages/notfound.js";
import Home from "./pages/home.js";
import UserDashboard from "./pages/userDashboard.js";
import ProductForm from "./components/adminComponents/createProduct.js";
import ProductDetails from "./components/productDetails.js";
import CartPage from "./components/cartPage.js";
import CheckoutPage from "./components/checkoutPage.js";
import OrderSuccessPage from "./components/orderSuccessPage.js";
import AddAddressPage from "./components/addressPage.js";

function App() {
  return (
    <>
      <Header />
      <Body>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/add-address" element={<AddAddressPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/create-product" element={<ProductForm />} />
          <Route path="/contact-us" element={<Contactus />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Body>
      <Footer />
    </>
  );
}

export default App;
