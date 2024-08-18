import "./App.css";
import { Header } from "./components/header.js";
import { Body } from "./components/body.js";
import { Footer } from "./components/footer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.js";
import Signup from "./pages/signup.js";
import Contactus from "./pages/contactus.js";
import Notfound from "./pages/notfound.js";
import Home from "./pages/home.js";

function App() {
  return (
    <Router>
      <Header />
      <Body>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact-us" element={<Contactus />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Body>
      <Footer />
    </Router>
  );
}

export default App;
