"use client";

import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useAddGuestList, useDebounce, useGetGuestList } from "./hooks";
import { InputGuestList } from "./components";

export default function Home() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce({
    delay: 500,
    value: search,
  });

  const mutationAddGuestList = useAddGuestList();

  const { data, isFetching, refetch } = useGetGuestList({
    search: debouncedSearch,
  });

  const [btnProcessLoading, setBtnProcessLoading] = useState<boolean>(false);

  const onSubmitGuestList = useCallback(
    (val: any) => {
      setBtnProcessLoading(true);
      try {
        mutationAddGuestList.mutate(
          {
            ...val,
          },
          {
            onSuccess(data) {
              if (data) {
                toast(`${data.data.message}`, {
                  autoClose: 2000,
                  type: "success",
                });
                refetch();
                setBtnProcessLoading(false);
              }
            },
            onError(err) {
              if (err) {
                toast("Nama Sudah Terdaftar", {
                  autoClose: 2000,
                  type: "error",
                });
              }
              setBtnProcessLoading(false);
              console.log("err>>response>>submit", err);
            },
          }
        );
      } catch (error) {
        setBtnProcessLoading(false);
        console.log(error);
      }
    },
    [mutationAddGuestList, refetch]
  );

  return (
    <main className="flex flex-col items-center min-h-screen p-5 pt-10 md:p-24">
      <div className="py-2 border-b-2">
        <h1 className="text-2xl font-bold">
          <span className="text-blue-400">ONVITA</span> User Guest List
        </h1>
      </div>

      <InputGuestList
        setFormData={(val: any) => onSubmitGuestList(val)}
        btnProcessLoading={btnProcessLoading}
      />

      <div className="w-full px-10 py-5 lg:w-1/2">
        <input
          type="text"
          value={search}
          className="p-2 text-sm border border-gray-400 rounded focus:outline-blue-500"
          placeholder="Cari Nama"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isFetching ? (
        <svg
          className="w-8 h-8 mt-5 text-white animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="#3b82f6"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="#3b82f6"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <div className="w-full px-10 overflow-y-scroll lg:w-1/2 h-96 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-slate-200">
          {data.map((item: any, idx: any) => (
            <div
              className={`lg:flex gap-3 mx-auto ${
                idx + 1 === data.length ? "border-none" : "border-b-2"
              } border-blue-500 p-1`}
              key={idx}
            >
              <div className="flex-1">
                <div className="flex">
                  <p className="mr-1 text-sm">{idx + 1 + "."}</p>
                  <p className="text-sm font-semibold">
                    {item.nama}
                    {" - "}
                    <span className="text-sm font-normal text-gray-500">
                      {item.nomor}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
