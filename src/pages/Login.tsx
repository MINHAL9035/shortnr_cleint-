import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import LoginFormDetails from "./utils/LoginFormDetails";

const LoginForm = () => {
  return (
    <div className="min-h-screen  flex flex-col">
      <NavBar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md ">
          {/* Logo and Website Name */}
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Welcome Back!
            </h2>
            <p className="text-center text-sm text-gray-600">
              Simplify your links, amplify your reach
            </p>
          </div>

          <LoginFormDetails />
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
