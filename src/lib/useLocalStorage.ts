interface UseLocalSotrageReturnType {
  getObject: (key: string) => any;
  addObject: (key: string, data: any) => void;
  deleteObject: (key: string) => void;
}

export default function useLocalStorage(): UseLocalSotrageReturnType {
  const getObject = (key: string) => {
    const item = localStorage.getItem(key);

    try {
      return JSON.parse(item);
    } catch (err) {
      return item;
    }
  };

  const addObject = (key: string, data: any): any => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const deleteObject = (key: string) => localStorage.removeItem(key);

  return { getObject, addObject, deleteObject };
}
