import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { RootState } from "../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import handleError from "../helpers/errorHandler";
import { removeUserInfo } from "../redux/slice/userSlice";
import { logOut } from "../service/api/auth";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const response = await logOut();
      if (response.status === 201) {
        dispatch(removeUserInfo());
        navigate("/login");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <nav className="bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/icon.png" className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Shortnr
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
          {userInfo ? (
            <>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-600"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={userInfo.image}
                  alt="user photo"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 z-50 w-56 bg-gray-800 rounded-lg">
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className="absolute top-2 right-2 text-gray-300 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                  <div className="px-4 py-4  hover:bg-gray-900">
                    <span className="block text-sm px-4 py-2 text-white">
                      {userInfo.userName}
                    </span>
                  </div>
                  <div className="px-4 py-3 border-t  hover:bg-gray-900">
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-200 "
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <div className="bg-blue-600 rounded-md px-4 py-2 m-2">
                <button className="text-white">GetStarted</button>
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
