import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import SignupForm from "./utils/SignupForm";

const Signup = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md ">
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-bold text-center text-gray-800">
                Join Us!
              </h2>
              <p className="text-center text-sm text-gray-600">
                Simplify your links, amplify your reach
              </p>
            </div>
            <SignupForm />
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
