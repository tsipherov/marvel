import { useState, useCallback } from "react";

export const useFetch = () => {
  const [process, setProcess] = useState("Waiting");

  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = { "Content-Type": "application/json" }
    ) => {
      setProcess("Loading");

      try {
        const response = await fetch(url, { method, body, headers });

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json();

        // setProcess("Confirmed");
        return data;
      } catch (e) {
        setProcess("Error");
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setProcess("Loading");
  }, []);

  return { request, clearError, process, setProcess };
};
