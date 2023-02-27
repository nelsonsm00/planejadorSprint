/* IMPORT REACT */
import { Col, Row, Container } from "react-bootstrap";

/* IMPORT COMPONENTE */
import ButtonCancel from "../UI/Button/ButtonCancel";
import ButtonSuccess from "../UI/Button/ButtonSuccess";
import Componente from "../Arquitetura/Componente";
import Input from "../UI/Input";
import Label from "../UI/Label";
import Select from "../UI/Select";
import Titulo from "../UI/Titulo";

/* IMPORT GERAL */
import Calculadora from "../../Geral/Calculadora/Calculadora";
import Pessoa from "../../Geral/Pessoa/Pessoa";
import TipoDemanda from "../../Geral/TipoDemanda/TipoDemanda";

/* PROPRIEDADES */
const P_DEMANDA = "demanda";
const P_RESPONSAVEL = "responsavel";
const P_TEMPO = "tempo";
const P_TIPO = "tipo";

class CalculadoraDevTesteSubTaskForm extends Componente {   
    constructor(props) {
        super(props);  

        if (this.props.edicao.edicao) {
            this.state.registro = this.props.edicao.registroEdicao;
        }
        else {
            this.state.registro = this.getRegistroPadrao();
        }
        

        this.populaEquipe();

        this.setRegistro = this.setRegistro.bind(this);
        this.setTipo = this.setTipo.bind(this);
        this.setResponsavel = this.setResponsavel.bind(this);
        this.executaFuncao = this.executaFuncao.bind(this);
    }

    getRegistroPadrao() {
        return {demanda: "AUTO-", tipo: null, tempo: 0, tempoTotal: 0, responsavel: null};
    }

    populaEquipe(tipo = null) {
        if (!TipoDemanda.isValido(tipo))
            tipo = this.state.registro.tipo;
        if (TipoDemanda.isValido(tipo)) {
            if (TipoDemanda.isDesenvolvimento(tipo)) {
                if (this.equipe != null && this.equipe != undefined)
                    this.equipe = this.equipeDesenvolvimento.filter((e) => {return e.desenvolvimento});
                else
                    this.equipe = [];
            }
            else if (TipoDemanda.isTeste(tipo)) {
                if (this.equipe != null && this.equipe != undefined)
                    this.equipe = this.equipeTeste.filter((e) => {return e.teste});
                else
                    this.equipe = [];
            }
        }
    }

    setRegistro(valor, propriedade) {
        var json = {};
        var tempoDesenvolvimento = 0;
        Object.assign(json, this.state.registro);
        json[propriedade] = valor;
        if (propriedade == P_TIPO) {
            this.populaEquipe(json.tipo); 
            if (TipoDemanda.isTeste(json.tipo)) {
                tempoDesenvolvimento = this.props.funcaoGetMaiorDesenvolvimento(0);
                json.tempo = Calculadora.calculaTempoTeste(tempoDesenvolvimento);
                json.tempoTotal = json.tempo;
            }
        }    
        else if (propriedade == P_TEMPO) {
            json.tempoTotal = valor;
        }
        this.setState({registro: json});
    }

    setTipo(tipo) {
        if (tipo == undefined) this.setRegistro(null, P_TIPO);
        else this.setRegistro(tipo.id, P_TIPO);
    }

    setResponsavel(responsavel) {
        if (responsavel == undefined) this.setRegistro(null, P_RESPONSAVEL);
        else this.setRegistro(responsavel.usuario, P_RESPONSAVEL);
    }

    executaFuncao() {
        this.props.funcao(this.state.registro, this.props.edicao.edicao ? this.props.edicao.indexEdicao : -1);
        this.setState({registro: this.getRegistroPadrao()});
        this.props.funcaoVoltar();
    }

    renderMaximo() {
        if (TipoDemanda.isValido(this.state.registro.tipo)) {
            if (TipoDemanda.isDesenvolvimento(this.state.registro.tipo)) {
                if (this.state.registro.tempo > Calculadora.getTempoDesenvolvimento()) {
                    return <Row>
                                <Label
                                    texto={"Tempo máximo atingido (" + Calculadora.getTempoDesenvolvimento() + "h)!"}
                                    classe="maximo"
                                />
                            </Row>
                }
            }
            else if (TipoDemanda.isTeste(this.state.registro.tipo)) {
                if (this.state.registro.tempo > Calculadora.calculaTempoTeste(Calculadora.getTempoDesenvolvimento())) {
                    return <Row>
                                <Label
                                    texto={"Tempo máximo atingido (" + Calculadora.calculaTempoTeste(Calculadora.getTempoDesenvolvimento()) + "h)!"}
                                    classe="maximo"
                                />
                            </Row>
                }
            }
        }
    }

    renderMaximoTotal() {
        if (this.state.registro.tempoTotal > Calculadora.getCapacidade()) {
            return <Row>
                        <Label
                            texto={"Tempo máximo atingido (" + Calculadora.getCapacidade() + "h)!"}
                            classe="maximo"
                        />
                    </Row>
        }
    }

    render() {
        var input = {devTeste: true, input: true};
        var label = {devTeste: true, label: true};

        return (<>        
            <Container>
                <Row>
                    <Titulo titulo={"Subtask"} />  
                </Row>
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
                                texto="Tipo:"
                                parametrosTamanho={label}
                            />                
                            <Select 
                                parametrosTamanho={input} 
                                dados={TipoDemanda.getTipos()} 
                                funcao={this.setTipo}
                                valor={this.state.registro.tipo}
                                chave={TipoDemanda.getChaveSelect()}
                            />               
                        </Row>
                        <hr />
                        <Row>
                            <Label
                                texto="Tempo (h):"
                                parametrosTamanho={label}
                            />
                            <Input
                                ativo={true}
                                valor={this.state.registro.tempo} 
                                parametrosTamanho={input}
                                funcao={this.setRegistro}
                                parametrosFuncao={P_TEMPO}
                            />                            
                        </Row>
                        {this.renderMaximo()}                        
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
                                inativo={this.state.registro.tipo == null}
                                chave={Pessoa.getChaveSelect()}
                            />               
                        </Row>
                        <hr />
                        <Row>
                            <Label
                                texto="Total (h):"
                                parametrosTamanho={label}
                            />
                            <Input
                                ativo={false}
                                valor={this.state.registro.tempoTotal} 
                                parametrosTamanho={input}
                            />
                        </Row>
                        {this.renderMaximoTotal()} 
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col sm="8"></Col>
                    <Col sm="2">
                        <ButtonSuccess valido={this.state.registro.responsavel != null} texto={this.props.edicao.edicao ? "Salvar" : "Adicionar"} funcao={this.executaFuncao}/>
                    </Col>
                    <Col sm="2">
                        <ButtonCancel valido={true} texto={"Voltar"} funcao={this.props.funcaoVoltar}/>
                    </Col>
                </Row>
            </Container>        
        </>);
    }
}

export default CalculadoraDevTesteSubTaskForm;