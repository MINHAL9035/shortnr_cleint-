import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store/store";

interface WithAuthProps {
  component: React.ComponentType;
}

const WithAuth: React.FC<WithAuthProps> = ({ component: Component }) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  return userInfo ? <Component /> : <Navigate to="/login" />;
};

export default WithAuth;
