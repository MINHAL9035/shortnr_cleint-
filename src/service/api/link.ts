import Api from "@/config/axiosConfig";

import { createLinkInterface } from "@/interface/createLink.interface";

export const createLink = async (details: createLinkInterface) => {
  const response = await Api.post("user/createLink", details);
  return response;
};

export const getLinks = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const response = await Api.get(`user/getLinks?page=${page}&limit=${limit}`);
  return response;
};

export const orgUrl = async (id: string) => {
  const response = await Api.get("user/getOrgUrl", { params: { id } });
  return response;
};
