import { useContext } from "react";
import ItemsContext from "../context/items"

function useItemsContent() {
    return useContext(ItemsContext);
    
}

export default useItemsContent;