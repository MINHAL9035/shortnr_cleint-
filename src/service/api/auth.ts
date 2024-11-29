import Api from "../../config/axiosConfig";
import { handleApiError } from "../../helpers/handleApiError";
import { handleApiResponse } from "../../helpers/handleApiResponse";
import { AuthResponse } from "../../interface/authRes.interface";
import {
  LoginFormValues,
  SignUpFormValues,
} from "../../interface/signupValues.interface";

export const Signup = async (
  userDetails: SignUpFormValues
): Promise<AuthResponse> => {
  return Api.post("user/register", userDetails)
    .then(handleApiResponse)
    .catch(handleApiError);
};

export const logOut = async () => {
  return Api.post("user/logout").then(handleApiResponse).catch(handleApiError);
};

export const Login = async (
  details: LoginFormValues
): Promise<AuthResponse> => {
  return Api.post("user/login", details)
    .then(handleApiResponse)
    .catch(handleApiError);
};
