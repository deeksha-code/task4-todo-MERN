import { useState } from "react";

function ItemEdit({ item, onSubmit }) {
  const [title, setTitle] = useState(item.itemName);

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
