import { useCallback, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";

const useHttp = <httpResponseType = unknown>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setReponseData] = useState<httpResponseType | null>(
    null,
  );
  const [error, setError] = useState(null);

  const sendPromiseRequest = useCallback(
    async (promiseRequest: Promise<AxiosResponse<httpResponseType>>) => {
      try {
        setIsLoading(true);
        const response = await promiseRequest;
        if (response.status === 204) {
          setReponseData(null);
          return null;
        }
        if (!response.data) {
          throw new Error("Failed Request");
        }
        const data = response.data;
        setReponseData(data);
        return data;
      } catch (err) {
        if (axios.isCancel(err)) {
          console.warn("Cancell request");
          return;
        }
        const error = err as any;
        const errorMsg =
          error.response.data.msg || error.message || "Something went wrong";
        setError(errorMsg);
        toast.error(errorMsg);
        throw new Error(errorMsg);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    sendPromiseRequest,
    isLoading,
    responseData,
    error,
  };
};

export default useHttp;
