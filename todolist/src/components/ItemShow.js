import "../ItemShow.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ItemEdit from "./ItemEdit"

function ItemShow({ item,onDelete, onEdit }) {
    const [showEdit, setShowEdit] = useState(false);


    const handleDeleteClick = () => {
      onDelete(item._id);
    };

    const handleEditClick = () => {
      setShowEdit(!showEdit);
    };

    const handleSubmit = (id, newTitle) => {
      onEdit(id, newTitle);
      setShowEdit(false);
    };

    let content = <h3>{item.itemName}</h3>;
    if (showEdit) {
      content = <ItemEdit item={item} onSubmit={handleSubmit} />;
    }

    return (
        <div className="display-item">
        <p>{content}</p>
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
