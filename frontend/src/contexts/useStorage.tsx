import { useState, useEffect } from "react";

function getStorageValue(key: any) {
  if (typeof window !== "undefined") {
    const saved = sessionStorage.getItem(key);
    const initial = saved ? JSON.parse(saved) : null;
    return initial;
  }
}

export const useStorage = (key: any) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key);
  });

  useEffect(() => {
    sessionStorage.setItem(key, value ? JSON.stringify(value) : '');
  }, [key, value]);

  return [value, setValue];
};