import "./App.css";
import { useEffect } from "react";
import ItemCreate from "./components/ItemCreate";
import ItemList from "./components/ItemList";
import useItemsContext from "./hooks/use-items-context";

function App() {
  const { items, fetchItems } = useItemsContext();

  useEffect(() => {
    fetchItems();
  }, [items]);

  return (
    <div>
      <h1>TO Do List APP</h1>
      <div className="container">
        <ItemCreate />
        <ItemList />
      </div>
    </div>
  );
}

export default App;
