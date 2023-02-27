/* IMPORT REACT */
import { BsPencil } from "react-icons/bs";

/* IMPORT PROJETO */
import Icon from "./Icon";

class IconEdit extends Icon {
    constructor(props) {
        super(props, "editIcon", new BsPencil(), "1.5em", "Editar");
    }
}

export default IconEdit;
