import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

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

          {/* Login Form */}
          <form
            onSubmit={handleSubmit}
            className=" space-y-10  rounded-xl px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-500"
              />
            </div>

            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 pr-10 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="text-gray-500 w-5 h-5" />
                ) : (
                  <Eye className="text-gray-500 w-5 h-5" />
                )}
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Log In
              </button>
            </div>
          </form>
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
