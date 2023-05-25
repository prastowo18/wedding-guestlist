import React, { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  nama: yup.string().required("Nama undangan wajib diisi"),
  nomor: yup.string().required("Nomor wajib diisi"),
});

interface FormData {
  nama: string;
  nomor: string;
}

interface IProps {
  setFormData: (val: FormData) => void;
  btnProcessLoading: boolean;
}

const InputGuestList = (props: IProps) => {
  const { setFormData, btnProcessLoading } = props;

  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      nama: "",
      nomor: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback((data: FormData) => {
    setFormData(data);
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ nama: "", nomor: "" });
    }
  }, [isSubmitSuccessful, reset, setValue]);

  return (
    <div className="w-full lg:w-1/2">
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-10"
      >
        <Controller
          name="nama"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <>
              <input
                type="text"
                className="p-2 text-sm border border-gray-400 rounded focus:outline-blue-500"
                value={value}
                placeholder="Budi Raharjo"
                onChange={onChange}
              />
            </>
          )}
        />

        {errors.nama && (
          <span className="text-xs text-rose-500">{errors.nama.message}</span>
        )}

        <Controller
          name="nomor"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <>
              <input
                type="number"
                className="p-2 text-sm border border-gray-400 rounded focus:outline-blue-500"
                value={value}
                placeholder="0812xxxxxxxx"
                onChange={onChange}
              />
            </>
          )}
        />

        {errors.nomor && (
          <span className="text-xs text-rose-500">{errors.nomor.message}</span>
        )}

        {btnProcessLoading ? (
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
          <button
            type="submit"
            className="w-32 px-4 py-2 font-semibold text-blue-500 transition duration-150 ease-out bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default InputGuestList;
