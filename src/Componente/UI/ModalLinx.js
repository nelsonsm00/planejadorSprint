/* IMPORT REACT */
import React, { Component } from "react";
import parse from "html-react-parser";
import Modal from "react-bootstrap/Modal";

/* IMPORT PROJETO */
import ButtonCancel from "../Button/ButtonCancel";
import ButtonSuccess from "../Button/ButtonSuccess";
import ButtonAux from "../Button/ButtonAux";

/* IMPORT GERAL */
import Utils from "../../../Geral/Utils";

class ModalLinx extends Component {
    constructor(props) {
        super(props);

        var show = props.hasOwnProperty("show") ? props.show : false;
        var mensagem = props.hasOwnProperty("mensagem") ? props.mensagem : "";
        var tipo = props.hasOwnProperty("tipoModal")
            ? props.tipoModal
            : ModalEnum.tipo.aviso;
        var funcao = props.hasOwnProperty("funcao") ? props.funcao : () => {};
        var funcaoSecundaria = props.hasOwnProperty("funcaoSecundaria")
            ? props.funcaoSecundaria
            : () => {};

        var modal100w = props.hasOwnProperty("modal100w") ? props.modal100w : false;

        this.state = {
            show: show,
            mensagem: mensagem,
            tipo: tipo,
            funcao: funcao,
            funcaoSecundaria: funcaoSecundaria,
            titulo: "",
            modal100w: modal100w
        };

        this.paramsColunaInput = null;
        this.paramsColunaLabel = null;
        if (this.state.tipo == ModalEnum.tipo.pergunta) {
            this.paramsColunaInput = {modal: true};
            this.paramsColunaLabel = {modal: true, label: true};
        }
    }

    /* FUNCOES GET */
    getTextoPerguntaSuccess() {
        return "Sim";
    }

    getTextoPerguntaCancel() {
        return "Não";
    }

    /* VERIFICADORES */
    isValidoSuccess() {
        return true;
    }

    isNovo() {
        return this.state.registro.id <= 0;
    }

    /* EXECUTA FUNCAO */
    executaFuncao(funcao, parametrosFuncao = {}) {
        if (Utils.isEmptyObject(parametrosFuncao)) {
            funcao();
        } else {
            funcao(parametrosFuncao);
        }
    }

    /* RENDERIZACAO */
    renderBotao() {
        switch (this.state.tipo) {
            case ModalEnum.tipo.aviso:
                return (
                    <ButtonAux
                        texto="Fechar"
                        valido={true}
                        funcao={() => this.executaFuncao(this.state.funcao, {})}
                    />
                );
            case ModalEnum.tipo.erro:
                return (
                    <ButtonCancel
                        texto="Fechar"
                        valido={true}
                        funcao={() => this.executaFuncao(this.state.funcao, {})}
                    />
                );
            case ModalEnum.tipo.pergunta:
                return (
                    <>
                        <ButtonSuccess
                            texto={this.getTextoPerguntaSuccess()}
                            valido={this.isValidoSuccess()}
                            funcao={() =>
                                this.executaFuncao(this.state.funcao, {
                                    valor: true,
                                })
                            }
                            className="btnPergunta"
                        />
                        <ButtonCancel
                            texto={this.getTextoPerguntaCancel()}
                            valido={true}
                            funcao={() =>
                                this.executaFuncao(
                                    this.state.funcaoSecundaria,
                                    {}
                                )
                            }
                            className="btnPergunta"
                        />
                    </>
                );
            case ModalEnum.tipo.sucesso:
                return (
                    <ButtonSuccess
                        texto="OK"
                        valido={true}
                        funcao={() => this.executaFuncao(this.state.funcao, {})}
                    />
                );
        }
    }

    renderBody() {
        return <></>;
    }

    render() {
        return (
            <>
                <Modal
                    show={this.state.show}
                    backdrop="static"
                    keyboard={false}
                    dialogClassName={this.state.modal100w ? "modal-100w" : ""}
                >
                    <Modal.Header>
                        <Modal.Title>
                            <center>{this.state.titulo}</center>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.mensagem != "" ? (
                            <>
                                {" "}
                                {parse(this.state.mensagem)}
                                <br />
                            </>
                        ) : null}
                        {this.renderBody()}
                    </Modal.Body>
                    <Modal.Footer>{this.renderBotao()}</Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default ModalLinx;
