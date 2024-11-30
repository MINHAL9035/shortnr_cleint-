import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import WithoutAuth from "../hoc/WithoutAuth";
import Dashboard from "../pages/Dashboard";
import WithAuth from "../hoc/WithAuth";
import RedirectLink from "@/pages/RedirectLink";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<WithoutAuth component={Home} />} />
        <Route path="/login" element={<WithoutAuth component={Login} />} />
        <Route path="/signup" element={<WithoutAuth component={Signup} />} />
        <Route path="/dashboard" element={<WithAuth component={Dashboard} />} />
        <Route path="/:id" element={<WithAuth component={RedirectLink} />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
