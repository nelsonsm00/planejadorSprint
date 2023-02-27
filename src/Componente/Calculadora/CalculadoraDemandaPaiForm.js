/* IMPORT REACT */
import { Col, Row, Container } from "react-bootstrap";

/* IMPORT COMPONENTE */
import Componente from "../Arquitetura/Componente";
import Input from "../UI/Input";
import Label from "../UI/Label";
import ButtonSuccess from "../UI/Button/ButtonSuccess";
import Table from "../UI/Table";
import CalculadoraSubTaskModal from "./CalculadoraSubTaskModal";
import Select from "../UI/Select";

/* IMPORT GERAL */
import Calculadora from "../../Geral/Calculadora/Calculadora";
import Utils from "../../Geral/Utils";
import Pessoa from "../../Geral/Pessoa/Pessoa";
import Coluna from "../../Geral/Coluna/Coluna";
import ComponenteEnum from "../../Geral/Enum/ComponenteEnum";
import TipoDemanda from "../../Geral/TipoDemanda/TipoDemanda";

/* PROPRIEDADES */
const P_DEMANDA = "demanda";
const P_RESPONSAVEL = "responsavel";
const P_TEMPO = "tempo";
const P_TIPO = "tipo";
const P_EXCLUIR = "excluir";
const P_SUBTASK = "subtask";

class CalculadoraDemandaPaiForm extends Componente {   
    constructor(props) {
        super(props);    
        if (this.props.hasOwnProperty("edicao") && this.props.edicao.edicao) {
            this.state.registro = this.props.edicao.registroEdicao;
        }
        else {
            this.state.registro = this.getRegistroPadrao();
        }

        this.state.showModal = false;
        this.state.modalEdicao = false;
        this.state.indexEdicao = -1;

        this.setRegistro = this.setRegistro.bind(this);
        this.setResponsavel = this.setResponsavel.bind(this);
        this.executaFuncao = this.executaFuncao.bind(this);
        this.adicionaSubTask = this.adicionaSubTask.bind(this);
        this.excluiSubTask = this.excluiSubTask.bind(this);
        this.exibeModal = this.exibeModal.bind(this);
        this.exibeModalEdicao = this.exibeModalEdicao.bind(this);
        this.fechaModal = this.fechaModal.bind(this);
        this.getEstimativaDesenvolvimentoMaior = this.getEstimativaDesenvolvimentoMaior.bind(this);

        this.colunas = [new Coluna("Subtask", P_DEMANDA, 10), 
                        new Coluna("Tipo", P_TIPO, 30, ComponenteEnum.Texto, {}, {}, TipoDemanda.getTipos(), "id;tipo"), 
                        new Coluna("Tempo", P_TEMPO, 10),
                        new Coluna("Responsável", P_RESPONSAVEL, 30, ComponenteEnum.Texto, {}, {}, this.equipe, "usuario;nome"),
                        new Coluna(null, P_EXCLUIR, 10, ComponenteEnum.ButtonCRUD, {add: this.exibeModal, delete: this.excluiSubTask, edit: this.exibeModalEdicao})];
    }

    exibeModal() {
        this.setState({showModal: true, modalEdicao: false});
    }

    exibeModalEdicao(index) {
        this.setState({showModal: true, modalEdicao: true, indexEdicao: index.index});
    }

    fechaModal() {
        this.setState({showModal: false});
    }

    adicionaSubTask(registro, indexEdicao = -1) {
        var subtask = [];
        Object.assign(subtask, this.state.registro.subtask);
        
        var existeTeste = subtask.filter((s) => {return TipoDemanda.isTeste(s.tipo)}).length > 0;
        if (existeTeste && TipoDemanda.isDesenvolvimento(registro.tipo)) {
            var tempoDesenvolvimento = this.getEstimativaDesenvolvimentoMaior(registro.tempo, registro.tipo, true, indexEdicao);
            subtask.forEach(s => {
                if (TipoDemanda.isTeste(s.tipo))
                    s.tempo = Calculadora.calculaTempoTeste(tempoDesenvolvimento);
            });
        }

        if (indexEdicao == -1)
            subtask.push(registro);
        else
            subtask[indexEdicao] = registro;
        this.setRegistro(subtask, P_SUBTASK);
    }

    excluiSubTask(index) {
        index = index.index;
        var subtask = [];
        Object.assign(subtask, this.state.registro.subtask);
        var existeTeste = subtask.filter((s) => {return TipoDemanda.isTeste(s.tipo)}).length > 0;
        if (existeTeste && TipoDemanda.isDesenvolvimento(subtask[index].tipo)) {
            var tempoDesenvolvimento = this.getEstimativaDesenvolvimentoMaior(0, subtask[index].tipo, true, index);
            subtask.forEach(s => {
                if (TipoDemanda.isTeste(s.tipo))
                    s.tempo = Calculadora.calculaTempoTeste(tempoDesenvolvimento);
            });
        }

        subtask.splice(index, 1);
        this.setRegistro(subtask, P_SUBTASK);
    }

    getRegistroPadrao() {
        return {demanda: "AUTO-", responsavel: null, subtask: []};
    }

    getEstimativaDesenvolvimentoMaior(tempo = 0, t = null, agrupaTipo = true, indexEdicao = -1) {
        return Calculadora.getEstimativaDesenvolvimentoMaior(this.state.registro.subtask, tempo, t, agrupaTipo, indexEdicao);
    }

    setRegistro(valor, propriedade) {
        var json = {};
        Object.assign(json, this.state.registro);
        json[propriedade] = valor;
        this.setState({registro: json});
    }

    setResponsavel(responsavel) {
        if (responsavel == undefined) this.setRegistro(null, P_RESPONSAVEL);
        else this.setRegistro(responsavel.usuario, P_RESPONSAVEL);
    }

    executaFuncao() {
        this.props.funcao(this.state.registro);
        this.setState({registro: this.getRegistroPadrao()});
        if (this.props.hasOwnProperty("funcaoVoltar"))
            this.props.funcaoVoltar();
    }

    render() {
        var input = {devTeste: true, input: true};
        var label = {devTeste: true, label: true};

        return (<>    
            <CalculadoraSubTaskModal 
                show={this.state.showModal} 
                funcao={this.adicionaSubTask} 
                onHide={this.fechaModal} 
                funcaoGetMaiorDesenvolvimento={this.getEstimativaDesenvolvimentoMaior}
                edicao={this.state.modalEdicao}
                indexEdicao={this.state.indexEdicao}
                registroEdicao={this.state.registro.subtask[this.state.indexEdicao]}/>    
            <Container>
                <Row>
                    <Col sm={12}>
                        <Row>
                            <Label
                                texto="Demanda:"
                                parametrosTamanho={label}
                            />
                            <Input
                                ativo={true}
                                valor={this.state.registro.demanda} 
                                parametrosTamanho={input}
                                inputTexto={true}
                                funcao={this.setRegistro}
                                parametrosFuncao={P_DEMANDA}
                            />
                        </Row>
                        <hr />
                        <Row>
                            <Label
                                texto="Responsável:"
                                parametrosTamanho={label}
                            />                
                            <Select 
                                parametrosTamanho={input} 
                                dados={this.equipe} 
                                funcao={this.setResponsavel}
                                valor={this.state.registro.responsavel}
                                chave={Pessoa.getChaveSelect()}
                            />               
                        </Row>
                        <hr />
                        <Row>
                            <Table id="subtask" dados={this.state.registro.subtask} colunas={this.colunas}/>
                        </Row>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col sm="10"></Col>
                    <Col sm="2">
                        <ButtonSuccess valido={Utils.isStringValida(this.state.registro.demanda)} texto={this.props.hasOwnProperty("edicao") && this.props.edicao.edicao ? "Salvar" : "Adicionar"} funcao={this.executaFuncao}/>
                    </Col>
                </Row>
            </Container>        
        </>);
    }
}

export default CalculadoraDemandaPaiForm;