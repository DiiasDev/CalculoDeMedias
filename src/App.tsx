import "./App.css";
import Footer from "./components/Footer/footer";
import Navigation from "./components/Navigation/navigation";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/homePage";
import CalcMedia from "./pages/CalcMedia/calcMedia";
import Medias from "./pages/Medias/medias";

function App() {
  return (
    <>
      <div className="App">
        <Navigation />
        <div className="contentArea">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calculo-media" element={<CalcMedia />} />
            <Route path="/tabela-media" element={<Medias />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
