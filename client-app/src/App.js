import "./styles/App.css";
import "./styles/header.css";
import "./styles/footer.css";
import { Header } from "./components/header.js";
import { Body } from "./components/body.js";
import { Footer } from "./components/footer.js";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login.js";
import Signup from "./pages/signup.js";
import Contactus from "./pages/contactus.js";
import Notfound from "./pages/notfound.js";
import Home from "./pages/home.js";
import Account from "./pages/account.js";

function App() {
  return (
    <>
      <Header />
      <Body>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/contact-us" element={<Contactus />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Body>
      <Footer />
    </>
  );
}

export default App;
