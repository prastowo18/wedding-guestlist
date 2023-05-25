import * as utils from "../utils/httpClient";

export const getList = async (params: any) => {
  return await utils.HttpClient.get(`/api/guestlist`, { params });
};

export const addGuestList = async (params: any) => {
  return await utils.HttpClient.post(`/api/guestlist`, params);
};
