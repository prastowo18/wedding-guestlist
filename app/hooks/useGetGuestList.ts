import { useQuery } from "@tanstack/react-query";
import * as services from "../services";

interface IProps {
  search: string;
}
const useGetGuestList = (props: IProps) => {
  const { search } = props;
  const data = useQuery<any>(
    ["dailylist", search],
    async () => {
      const filter = {
        search,
      };

      const { data: axiosData } = await services.getList(filter);
      return axiosData.data;
    },
    { keepPreviousData: true }
  );
  return data;
};

export default useGetGuestList;
