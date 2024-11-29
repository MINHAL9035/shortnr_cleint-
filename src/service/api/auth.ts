import Api from "../../config/axiosConfig";
import { handleApiError } from "../../helpers/handleApiError";
import { handleApiResponse } from "../../helpers/handleApiResponse";
import { AuthResponse } from "../../interface/authRes.interface";
import { SignUpFormValues } from "../../interface/signupValues.interface";

export const Signup = async (
  userDetails: SignUpFormValues
): Promise<AuthResponse> => {
  return Api.post("user/register", userDetails)
    .then(handleApiResponse)
    .catch(handleApiError);
};
