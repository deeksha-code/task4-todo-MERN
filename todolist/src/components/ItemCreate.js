import { useState } from "react";


function ItemCreate({onCreate}){
    const [title,setTitle]=useState('');

    const handleChange=(event)=>{
        setTitle(event.target.value)
    }
    const handleClick=(event)=>{
        event.preventDefault();
        onCreate(title);
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
