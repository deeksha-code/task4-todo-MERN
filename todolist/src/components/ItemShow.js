import "../ItemShow.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ItemEdit from "./ItemEdit"
import useItemsContent from "../hooks/use-items-context";

function ItemShow({ item}) {
    const [showEdit, setShowEdit] = useState(false);
    const { editItemById,deleteItemById}=useItemsContent();


    const handleDeleteClick = () => {
      deleteItemById(item._id);
    };

    const handleEditClick = () => {
      setShowEdit(!showEdit);
    };

    const handleSubmit = (id, newTitle) => {
      editItemById(id, newTitle);
      setShowEdit(false);
    };

    let content = <h3>{item.itemName}</h3>;
    if (showEdit) {
      content = <ItemEdit item={item} onSubmit={handleSubmit} />;
    }

    return (
        <div className="display-item">
        {content}
        <FontAwesomeIcon
            icon={faPenToSquare}
            className="font-awesome"
            onClick={handleEditClick}
        />
        <FontAwesomeIcon icon={faTimes} onClick={handleDeleteClick} />
        </div>
    );
}

export default ItemShow;
