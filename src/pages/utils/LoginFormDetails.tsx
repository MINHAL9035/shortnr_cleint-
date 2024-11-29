import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { LoginFormValues } from "../../interface/signupValues.interface";
import { Form, Formik, FormikProps } from "formik";
import { LoginValidationSchema } from "../../validations/authFormValidation";
import { message } from "antd";
import { setUserInfo } from "../../redux/slice/userSlice";
import handleError from "../../helpers/errorHandler";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Login } from "../../service/api/auth";

const LoginFormDetails = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginFormValues) => {
    console.log(values);
    
    try {
      const response = await Login(values);
      if (response.success && response.status === 201) {
        message.success("Logged in Successfully");
        dispatch(setUserInfo(response.data));
        navigate("/");
      } else {
        message.error(
          response.error || "Something went wrong, please try again"
        );
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginValidationSchema}
        onSubmit={handleSubmit}
      >
        {(formik: FormikProps<LoginFormValues>) => (
          <Form className=" space-y-10  rounded-xl px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email address"
                {...formik.getFieldProps("email")}
                className={`w-full px-3 py-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-500 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : ""
                }`}
              />
              <div className="min-h-[20px] mt-1">
                {formik.touched.email && formik.errors.email && (
                  <div className="text-sm text-red-500">
                    {formik.errors.email}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...formik.getFieldProps("password")}
                className={`w-full px-3 py-2 pr-10 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-500 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : ""
                }`}
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
              <div className="min-h-[20px] mt-1">
                {formik.touched.password && formik.errors.password && (
                  <div className="text-sm text-red-500">
                    {formik.errors.password}
                  </div>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Log In
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginFormDetails;
