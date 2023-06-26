import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import Tour from "./pages/tour/Tour";

import List from "./pages/list/List";
import ListTour from "./pages/listTour/ListTour";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ResetPass from "./pages/reset/ResetPass";
import NotFoundPage from "./components/notfound/NotFound"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/tours" element={<ListTour/>}/>
        <Route path="/tours/:id" element={<Tour/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/reset" element={<ResetPass/>}/>
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
