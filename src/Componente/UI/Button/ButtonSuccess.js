/* IMPORT PROJETO */
import Botao from "./Botao";

class ButtonSuccess extends Botao {
    constructor(props) {
        super(
            props,
            "btn-success " +
                (props.hasOwnProperty("className") ? props.className : "")
        );
    }
}

export default ButtonSuccess;
