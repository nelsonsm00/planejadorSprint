/* IMPORT REACT */
import { BsFillTrashFill } from "react-icons/bs";

/* IMPORT PROJETO */
import Icon from "./Icon";

class IconDelete extends Icon {
    constructor(props) {
        super(props, "deleteIcon", new BsFillTrashFill(), "1.5em", "Excluir");
    }
}

export default IconDelete;
