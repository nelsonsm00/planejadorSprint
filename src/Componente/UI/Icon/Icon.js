/* IMPORT REACT */
import React, { Component } from "react";

/* IMPORT GERAL */
import Utils from "../../../Geral/Utils";

class Icon extends Component {
    constructor(props, className = "", icone = <></>, fontSize = "1.5em", alt = "") {
        super(props);

        this.className = className;
        this.funcao = props.hasOwnProperty("funcao") ? props.funcao : () => {};
        this.icone = icone;
        this.fontSize = fontSize;
        this.alt = alt;
    }

    /* FUNCOES GET */
    getParametrosFuncao() {
        if (this.props.hasOwnProperty("parametrosFuncao") && this.props.parametrosFuncao != null) {
            return this.props.parametrosFuncao;
        } else {
            return {};
        }
    }

    /* EXECUTA A FUNCAO */
    executaFuncao() {
        var parametros = this.getParametrosFuncao();
        if (Utils.isEmptyObject(parametros)) {
            this.funcao();
        } else if (parametros.hasOwnProperty("valor") && parametros.valor) {
            this.funcao(null, parametros);
        }
        else {
            this.funcao(parametros);
        }
    }

    /* RENDERIZACAO */
    render() {
        return (
            <i
                type="button"
                onClick={() => this.executaFuncao()}
                className={this.className}
                style={{ fontSize: this.fontSize }}
                title={this.alt}
            >
                {this.icone}
            </i>
        );
    }
}

export default Icon;
