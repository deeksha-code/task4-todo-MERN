import { createContext, useState } from "react";
import axios from "axios";

const itemsContext = createContext();

function Provider({ children }) {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");

  const fetchItems = async () => {
    console.log("REACT_APP_API_URL",process.env.REACT_APP_API_URL);
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/getItems`);
    console.log("response data",response.data); // Inspect the response here
    setItems(response.data);
  };


  const editItemById = async (id, newTitle) => {
    const itemAfterUpdate = await axios.put(
      `${process.env.REACT_APP_API_URL}/updateItem/${id}`,
      { title: newTitle }
    );

    const updatedItems = items.map((item) => {
      if (item._id === itemAfterUpdate.data._id) {
        return { ...item, ...itemAfterUpdate.data };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const deleteItemById = async (id) => {
    const deletedItem = await axios.delete(
      `${process.env.REACT_APP_API_URL}/deleteItem/${id}`
    );

    const updatedItems = items.filter((item) => {
      return item._id !== deletedItem.data._id;
    });

    setItems(updatedItems);
  };

  const createItem = async (title) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/createItem`, {
      title,
    });
    const updatedItems = [...items, response.data];

    setItems(updatedItems);
  };

  const valueToShare = {
    items,
    setItems,
    title,
    setTitle,
    fetchItems,
    editItemById,
    deleteItemById,
    createItem,
  };

  return (
    <itemsContext.Provider value={valueToShare}>
      {children}
    </itemsContext.Provider>
  );
}

export { Provider };
export default itemsContext;
