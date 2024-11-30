import Api from "../../config/axiosConfig";
import {
  LoginFormValues,
  SignUpFormValues,
} from "../../interface/signupValues.interface";

export const Signup = async (userDetails: SignUpFormValues) => {
  const response = await Api.post("user/register", userDetails);
  console.log(response);

  return response;
};

export const logOut = async () => {
  const response = Api.post("user/logout");
  return response;
};

export const Login = async (details: LoginFormValues) => {
  const response = await Api.post("user/login", details);
  return response;
};
