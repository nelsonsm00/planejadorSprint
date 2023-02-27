/* IMPORT REACT */
import React from "react";
import { Form, Col } from "react-bootstrap";

/* IMPORT COMPONENTE */
import Option from "./Option";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";

function executaFuncao(valor, dados, funcao, chave) {
    var result;
    for (var i = 0; i < dados.length; i++) {
        var d = dados[i];
        if (getValorChave(d, chave, "value") == valor) {
            result = d;
            break;
        }
    }
    funcao(result);
}

function getValorChave(d, chave, p) {
    if (Utils.isEmptyObject(chave))
        return d;
    else {
        p = chave[p];
        return d[p];
    }
}

export default (props) => {
    
    var parametrosTamanho = props.hasOwnProperty("parametrosTamanho")
        ? props.parametrosTamanho
        : null;
    var dados = props.hasOwnProperty("dados")
        ? props.dados
        : [];
    var inativo = props.hasOwnProperty("inativo")
        ? props.inativo
        : false;
    var funcao = props.hasOwnProperty("funcao") 
        ? props.funcao 
        : () => {};
    var valor = props.hasOwnProperty("valor")
        ? props.valor == null 
            ? "" 
            : props.valor
        : "";
    var chave = props.hasOwnProperty("chave") ? props.chave : {};

    return (
        <>
            <Col
                xs={Utils.getTamanhoColuna("xs", parametrosTamanho)}
                sm={Utils.getTamanhoColuna("sm", parametrosTamanho)}
                md={Utils.getTamanhoColuna("md", parametrosTamanho)}
                lg={Utils.getTamanhoColuna("lg", parametrosTamanho)}
                xl={Utils.getTamanhoColuna("xl", parametrosTamanho)}
            >
                <Form>
                    <Form.Control
                        as="select"
                        custom
                        onChange={(e) => executaFuncao(e.target.value, dados, funcao, chave)}
                        disabled={inativo}
                        value={valor}
                        className="select"
                    >
                        <Option value={""} text={"SELECIONE"} />
                        {dados.map((d) => <Option value={getValorChave(d, chave, "value")} text={getValorChave(d, chave, "text")}/>)}
                    </Form.Control>
                </Form>
            </Col>
        </>
    );
}