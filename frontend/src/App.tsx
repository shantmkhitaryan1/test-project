import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import './App.css';
import Navbar from "./components/navbar/navbar";
import { PrivateRoute } from "./components/privateRoute/privateRoute";
import Login from "./pages/login/login";
import Registration from "./pages/registration/registration";
import Upload from "./pages/upload/upload";
import { getCurrentUser } from "./redux/actions";
import { getToken } from "./shared/helpers/helper";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = getToken();

  useEffect(() => {
    if(token) {
      dispatch(getCurrentUser());
    }
  }, []);

  return (
    <>
      {location.pathname !== '/sign-in' && location.pathname !== '/sign-up' && (
        <Navbar />
      )}
      <Routes>
        <Route path="/" element={<PrivateRoute component={Upload}/>} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
