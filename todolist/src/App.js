import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ItemCreate from "./components/ItemCreate";
import ItemList from "./components/ItemList";

function App() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const response = await axios.get("http://localhost:8000/getItems");
    setItems(response.data);
 
  };
  console.log("Items length",items.length);
  console.log("items",items);
  useEffect(() => {
    fetchItems();
  }, []);

  const editItemById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:8000/updateItem/${id}`, {
      title: newTitle,
    });
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, ...response.data };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const deleteItemById = async (id) => {
    await axios.delete(`http://localhost:8000/deleteItem/${id}`);

    const updatedItems = items.filter((item) => {
      return item.id !== id;
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

  return (
    <div>
      <h1>TO Do List APP</h1>
      <div className="container">
        <ItemCreate onCreate={createItem} />
        <ItemList
          items={items}
          onDelete={deleteItemById}
          onEdit={editItemById}
        />
      </div>
    </div>
  );
}

export default App;
