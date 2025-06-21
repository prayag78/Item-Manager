import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [items, setItems] = useState([]);

  const getAllItems = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/items/getAllItems`);
    //  console.log("data", data);
      if (data.success) {
        setItems(data.items);
      } else {
        console.error("Error fetching items:", data.message);
      }
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  const createItem = async (item) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/items/createItem`,
        item, // item is FormData
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        setItems((prev) => [...prev, data.item]);
      } else {
        console.error("Error creating item:", data.message);
      }
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const value = {
    items,
    setItems,
    getAllItems,
    createItem,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
