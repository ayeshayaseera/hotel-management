import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HotelList from "./pages/HotelList";
import HotelDetails from "./pages/HotelDetails";


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<HotelList />}
        />

        <Route
          path="/hotel-details"
          element={<HotelDetails />}
        />

      </Routes>
      <Footer />

    </BrowserRouter>
  );
}

export default App;