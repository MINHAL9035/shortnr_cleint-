import { Form, Formik, FormikProps } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SignUpFormValues } from "../../interface/signupValues.interface";
import { SignupValidationSchema } from "../../validations/authFormValidation";
import handleError from "../../helpers/errorHandler";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/slice/userSlice";
import { Signup } from "../../service/api/auth";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues: SignUpFormValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: SignUpFormValues) => {
    console.log("values", values);

    try {
      const response = await Signup(values);
      console.log(response);

      if (response.status === 201) {
        message.success("signUp Successfully");
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
        onSubmit={handleSubmit}
        validationSchema={SignupValidationSchema}
      >
        {(formik: FormikProps<SignUpFormValues>) => (
          <Form className=" space-y-4  rounded-xl px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <input
                type="userName"
                placeholder="Username"
                {...formik.getFieldProps("userName")}
                className={`w-full px-3 py-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-500 ${
                  formik.touched.userName && formik.errors.userName
                    ? "border-red-500"
                    : ""
                }`}
              />
              <div className="min-h-[20px] mt-1">
                {formik.touched.userName && formik.errors.userName && (
                  <div className="text-sm text-red-500">
                    {formik.errors.userName}
                  </div>
                )}
              </div>
            </div>
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
                className="absolute right-0 top-1/3 -translate-y-1/3  focus:outline-none"
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
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="confirmPassword"
                {...formik.getFieldProps("confirmPassword")}
                className={`w-full px-3 py-2 pr-10 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-500  ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500"
                    : ""
                } `}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/3 -translate-y-1/2 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="text-gray-500 w-5 h-5" />
                ) : (
                  <Eye className="text-gray-500 w-5 h-5" />
                )}
              </button>
              <div className="min-h-[20px] mt-1">
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <div className="text-sm text-red-500">
                      {formik.errors.confirmPassword}
                    </div>
                  )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignupForm;
