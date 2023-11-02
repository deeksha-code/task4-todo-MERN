import useItemsContent from "../hooks/use-items-context";

function ItemCreate() {
  const { title, setTitle, createItem } = useItemsContent();

  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  
 const handleCreateItem=(event)=>{
    event.preventDefault();
    createItem(title);
    setTitle("");
 }

  const handleClick = (event) => {
    handleCreateItem(event)
  };
  
  const handleSubmit = (event) => {
    handleCreateItem(event)
  };

  return (
    <div className="input-content">
      <form onSubmit={handleSubmit}>
        <input className="input-box" value={title} onChange={handleChange} />
        <button className="add-btn" onClick={handleClick}>
          Add
        </button>
      </form>
    </div>
  );
}

export default ItemCreate;
