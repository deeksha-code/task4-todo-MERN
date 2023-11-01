import useItemsContent from "../hooks/use-items-context";

function ItemCreate(){
  
    const {title,setTitle,createItem}=useItemsContent()
    const handleChange=(event)=>{
        setTitle(event.target.value)
    }
    const handleClick=(event)=>{
        event.preventDefault();
        createItem(title);
        setTitle("");

    }


    return (
       

        <div className="input-content">
          <input className="input-box" value={title} onChange={handleChange} />
          <button className="add-btn" onClick={handleClick}>
            Add
          </button>
        </div>
    );
}

export default ItemCreate;
