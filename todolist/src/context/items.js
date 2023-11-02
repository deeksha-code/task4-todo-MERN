import { createContext,useState } from "react";
import axios from "axios";

const itemsContext = createContext();
function Provider({ children }) {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");

  const fetchItems = async () => {
    const response = await axios.get("http://localhost:8000/getItems");
    setItems(response.data);
  };

  const editItemById = async (id, newTitle) => {

    const itemAfterUpdate = await axios.put(
      `http://localhost:8000/updateItem/${id}`,
      {
        title: newTitle,
      }
    );

    const updatedItems=items.map((item)=>{
          if (item._id===itemAfterUpdate.data._id) {
            return {...item,...itemAfterUpdate.data}            
          }
          return item;
    })
    setItems(updatedItems);
  };

  const deleteItemById = async (id) => {
    const deletedItem = await axios.delete(
      `http://localhost:8000/deleteItem/${id}`
    );

    const updatedItems = items.filter((item) => {
      return item._id !== deletedItem.data._id;
    });

    setItems(updatedItems);
  };

  const createItem = async (title) => {
    const response = await axios.post("http://localhost:8000/createItem", {
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
