import ItemShow from "./ItemShow"

function ItemList({items,onDelete,onEdit}) {
  const renderedItems = items.map((item) => {
    return (
      <ItemShow key={item._id} item={item} onEdit={onEdit} onDelete={onDelete} />
    );
  });


  return (
        <div className="display-content">{renderedItems}</div>
  );
}

export default ItemList;
