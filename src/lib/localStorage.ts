const KEY = "itrfg";

export const getItem = (key: string) => {
  if (typeof window !== undefined && window?.localStorage) {
    const item = window.localStorage.getItem(KEY);
    if (item) {
      const data = JSON.parse(item) as any;
      return data[key];
    }

    return null;
  }
};

export const setItem = (key: string, value: string): void => {
  if (typeof window !== undefined && window?.localStorage) {
    const data = JSON.parse(window.localStorage.getItem(KEY) || "{}") as any;
    data[key] = value;
    window.localStorage.setItem(KEY, JSON.stringify(data));
  }
};

export const removeItem = (key: string): void => {
  if (typeof window !== undefined && window?.localStorage) {
    const data = JSON.parse(window.localStorage.getItem(KEY) || "{}") as any;
    delete data[key];
    window.localStorage.setItem(KEY, JSON.stringify(data));
  }
};
