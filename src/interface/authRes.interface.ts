import { LinkInterface } from "./link.interface";
import { IUserInterface } from "./user.interface";

export interface AuthResponse {
  success: boolean;
  data?: IUserInterface | LinkInterface[];
  error?: string;
  status?: number;
}

export interface ApiErrorResponse {
  error?: string;
  message?: string;
}
