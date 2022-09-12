/* IMPORT PROJETO */
import Botao from "./Botao";

class ButtonCancel extends Botao {
    constructor(props) {
        super(
            props,
            "btn-danger " +
                (props.hasOwnProperty("className") ? props.className : "")
        );
    }
}

export default ButtonCancel;
