import ItemShow from "./ItemShow";
import useItemsContent from "../hooks/use-items-context";

function ItemList() {
  const {items}=useItemsContent();
  const renderedItems = items.map((item) => {
    return (
      <ItemShow key={item._id} item={item} />
    );
  });
  

  return (
        <div className="display-content">{renderedItems}</div>
  );
}

export default ItemList;
