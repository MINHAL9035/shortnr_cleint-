import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import WithoutAuth from "../hoc/WithoutAuth";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<WithoutAuth component={Login} />} />
        <Route path="/signup" element={<WithoutAuth component={Signup} />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
