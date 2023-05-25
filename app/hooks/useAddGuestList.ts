import { useMutation } from "@tanstack/react-query";
import * as services from "../services";

const useAddGuestList = () => {
  const data = useMutation(async (payload: any) => {
    return await services.addGuestList(payload);
  });
  return data;
};

export default useAddGuestList;
