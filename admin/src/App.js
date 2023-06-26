import 'antd/dist/reset.css';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/show/single/Single";
import NewUser from "./pages/new/newUser/NewUser";
import NewTour from "./pages/new/newTour/NewTour";
import NewHotel from "./pages/new/newHotel/NewHotel";
import NewRoom from "./pages/new/newRoom/NewRoom";
import Hotel from "./pages/show/hotel/Hotel"
import { BrowserRouter, Routes, Route, Navigate, Switch } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { tourColumns, hotelColumns, roomColumns, userColumns } from "./datatablesource";
import Register from './pages/register/Register';
import NotFoundPage from './components/notfound/NotFound';


function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({children}) => {
    const { user } = useContext(AuthContext)
    console.log(user)
    if (!user) {
      return <Navigate to="/login"/>
    }

    return children
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route 
              index 
              element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
              } 
            />
            <Route path="users">
              <Route index element={
                <ProtectedRoute>
                  <List columns={userColumns}/>
                </ProtectedRoute>
              } 
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewUser inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="tours">
            <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={tourColumns}/>
                  </ProtectedRoute>
                }
              />
              <Route
                path=":tourId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewTour />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path="show"
                element={
                  <ProtectedRoute>
                    <ShowTour />
                  </ProtectedRoute>
                }
              /> */}
            </Route>    
            
            <Route path="hotels">
            <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={hotelColumns}/>
                  </ProtectedRoute>
                }
              />
              <Route
                path=":hotelId"
                element={
                  <ProtectedRoute>
                    <Hotel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="rooms">
            <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns}/>
                  </ProtectedRoute>
                }
              />
              <Route
                path=":hotelId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
          <Route 
            path="*" 
            element={
              <ProtectedRoute>
                <NotFoundPage />
              </ProtectedRoute>
            }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
