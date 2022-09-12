/* IMPORT REACT */
import React from "react";
import { Form, Col } from "react-bootstrap";

/* IMPORT COMPONENTE */
import Option from "./Option";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";

function executaFuncao(valor, dados, funcao) {
    var result;
    for (var i = 0; i < dados.length; i++) {
        var d = dados[i];
        if (d.usuario == valor) {
            result = d;
            break;
        }
    }
    funcao(result);
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
                        onChange={(e) => executaFuncao(e.target.value, dados, funcao)}
                        disabled={inativo}
                        value={valor}
                        className="select"
                    >
                        <Option value={""} text={"SELECIONE"} />
                        {dados.map((d) => <Option value={d.usuario} text={d.nome}/>)}
                    </Form.Control>
                </Form>
            </Col>
        </>
    );
}