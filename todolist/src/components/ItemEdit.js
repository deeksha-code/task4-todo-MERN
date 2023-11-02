import { useState } from "react";
import useItemsContent from "../hooks/use-items-context";

function ItemEdit({ item, onSubmit }) {
  const { items } = useItemsContent();
  const [title, setTitle] = useState(item.title);

  // console.log(items);
  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(item._id, title);
  };

  return (
    <form onSubmit={handleSubmit}>
     
      <input className="input" value={title} onChange={handleChange} />
      <button className="button is-primary">Save</button>
    </form>
  );
}

export default ItemEdit;
