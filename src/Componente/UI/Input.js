/* IMPORT REACT */
import { Col, Form } from "react-bootstrap";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";
import MascaraNumerica from "../../Geral/MascaraNumerica";

function executaFuncao(value, funcao, parametrosFuncao, decimal, inputTexto) {
    if (!inputTexto) {
        value = MascaraNumerica.maskCoin(value, decimal);
        if (decimal == 0)
            value = MascaraNumerica.converteInt(value);
        else
            value = MascaraNumerica.converteFloat(value);
    } else if (inputTexto && decimal == 0) {
        var valueNumerico = "";
        var strCheck = "0123456789";
        for (var i = 0; i < value.length; i++) {
            if (strCheck.indexOf(value.charAt(i)) != -1)
                valueNumerico += value.charAt(i);
        }
        value = valueNumerico;
    }
    if (Utils.isEmptyObject(parametrosFuncao)) {
        funcao(value);
    } else {
        funcao(value, parametrosFuncao);
    }
}

export default (props) => {
    var parametrosTamanho = props.hasOwnProperty("parametrosTamanho")
        ? props.parametrosTamanho
        : null;
    var classe = props.hasOwnProperty("classe")
        ? props.classe
        : null;
    var classeForm = props.hasOwnProperty("classeForm")
        ? props.classeForm
        : null;
    var valor = props.hasOwnProperty("valor") 
        ? props.valor 
        : "";
    var funcao = props.hasOwnProperty("funcao") 
        ? props.funcao 
        : null;
    var parametrosFuncao = props.hasOwnProperty("parametrosFuncao")
        ? props.parametrosFuncao
        : {};
    var ativo = props.hasOwnProperty("ativo") 
        ? props.ativo 
        : true;
    var inputTexto = props.hasOwnProperty("inputTexto") 
        ? props.inputTexto 
        : false;
    var decimal = props.hasOwnProperty("decimal") 
        ? props.decimal 
        : 2;
    var senha = props.hasOwnProperty("senha") 
        ? props.senha 
        : false;

    return (
        <Col
            xs={Utils.getTamanhoColuna("xs", parametrosTamanho)}
            sm={Utils.getTamanhoColuna("sm", parametrosTamanho)}
            md={Utils.getTamanhoColuna("md", parametrosTamanho)}
            lg={Utils.getTamanhoColuna("lg", parametrosTamanho)}
            xl={Utils.getTamanhoColuna("xl", parametrosTamanho)}
            className={classe}
        >
            <Form.Control
                    disabled={!ativo}
                    className={classeForm}
                    value={inputTexto
                            ? valor
                            : MascaraNumerica.maskCoin(valor, decimal)
                    }
                    onChange={(e) =>
                        executaFuncao(
                            e.target.value,
                            funcao,
                            parametrosFuncao,
                            decimal,
                            inputTexto
                        )
                    }
                    onFocus={(e) => {
                        if (
                            e.target.selectionStart == 0 &&
                            e.target.selectionEnd ==
                                (e.target.value + "").length
                        ) {
                            e.target.selectionStart = e.target.selectionEnd;
                        }
                    }}
                    type={senha ? "password" : ""}
            />
        </Col>
    );
};
