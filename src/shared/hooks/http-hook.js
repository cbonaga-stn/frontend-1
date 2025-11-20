import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const sendRequest = useCallback(async (url, method = "GET", body = null, headers = {}) => {
    if (body instanceof FormData) {
      // Let the browser set Content-Type automatically
      delete headers["Content-Type"];
    }

    const response = await fetch(url, {
      method,
      body,
      headers
    });

    const responseData = await response.json();
    return responseData;
  }, []);

  return { sendRequest };
};