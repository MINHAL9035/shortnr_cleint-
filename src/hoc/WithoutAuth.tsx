import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store/store";


interface WithoutAuthProps {
  component: React.ComponentType;
}

const WithoutAuth: React.FC<WithoutAuthProps> = ({ component: Component }) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return userInfo ? <Navigate to="/dashboard" /> : <Component />;
};

export default WithoutAuth;
