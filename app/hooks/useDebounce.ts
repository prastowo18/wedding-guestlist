import { useEffect, useState } from "react";

interface IProps {
  value: string;
  delay: number;
}
const useDebounce = (props: IProps) => {
  const { value, delay } = props;
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
