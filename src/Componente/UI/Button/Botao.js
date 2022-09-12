/* IMPORT REACT */
import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class Botao extends Component {
    constructor(props, className = "btn btn-info btn-mbl") {
        super(props);

        this.state = {
            valido: props.hasOwnProperty("valido") ? props.valido : false,
            texto: props.hasOwnProperty("texto") ? props.texto : "",
        };

        this.className = "btn " + className + " btn-mbl";
        this.funcao = props.hasOwnProperty("funcao") ? props.funcao : () => {};
    }

    /* EXECUTA A FUNCAO */
    executaFuncao() {
        this.funcao();
    }

    /* VERIFICADORES */
    atualizarValores() {
        if (
            this.state.valido != this.props.valido ||
            this.state.texto != this.props.texto
        ) {
            this.setValido(this.props.valido);
            this.setTexto(this.props.texto);
        }
    }

    /* FUNCOES SET */
    setTexto(value) {
        this.setState({ texto: value });
    }

    setValido(value) {
        this.setState({ valido: value });
    }

    /* RENDERIZACAO */
    render() {
        this.atualizarValores();
        if (this.state.valido) {
            return (
                <Button
                    className={this.className}
                    onClick={() => this.executaFuncao()}
                >
                    {this.state.texto}
                </Button>
            );
        } else {
            return (
                <Button className={this.className} disabled="disable">
                    {this.state.texto}
                </Button>
            );
        }
    }
}

export default Botao;
