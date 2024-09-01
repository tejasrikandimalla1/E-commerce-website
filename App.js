import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "rsuite/dist/styles/rsuite-default.css";
import Login from "./components/Login";
import RegistrationForm from "./components/RegistrationForm";
import Products from "./components/Products";
import About from "./components/About";
import Header from "./components/Header"; // Import the Header component
import Home from "./components/Home/Home";
import { Container } from "rsuite";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";


function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Use the Header component here */}
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
