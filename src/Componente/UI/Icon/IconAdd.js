/* IMPORT REACT */
import { MdAddBox } from "react-icons/md";
import { RiOpenSourceFill } from "react-icons/ri";

/* IMPORT PROJETO */
import Icon from "./Icon";

class IconAdd extends Icon {
    constructor(props) {
        super(
            props,
            "addIcon " +
                (props.hasOwnProperty("className") ? props.className : ""),
            new MdAddBox(),
            "2em",
            "Incluir"
        );
    }
}

export default IconAdd;
