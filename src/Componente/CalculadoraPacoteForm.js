/* IMPORT REACT */
import { Col, Row, Form, Container } from "react-bootstrap";
import FormCheck from 'react-bootstrap/FormCheck'

/* IMPORT COMPONENTE */
import ButtonSuccess from "./UI/Button/ButtonSuccess";
import Componente from "./Arquitetura/Componente";
import Input from "./UI/Input";
import Label from "./UI/Label";
import Select from "./UI/Select";

/* IMPORT GERAL */
import Calculadora from "../Geral/Calculadora/Calculadora";
import Pessoa from "../Geral/Pessoa/Pessoa";

/* PROPRIEDADES */
const P_DEMANDA_PACOTE = "demandaPacote";
const P_RESPONSAVEL_REBASE = "responsavelRebase";
const P_TEMPO_REBASE = "tempoRebase";
const P_DEMANDA_DOCUMENTACAO = "demandaDocumentacao";
const P_RESPONSAVEL_DOCUMENTACAO = "responsavelDocumentacao";
const P_TEMPO_DOCUMENTACAO = "tempoDocumentacao";
const P_TEMPO_TOTAL = "tempoTotal";

class CalculadoraPacoteForm extends Componente {   
    constructor(props) {
        super(props);                  
        this.state.registro = this.getRegistroPadrao();
        this.state.possuiDocumentacao = true;
        this.state.possuiCompilacao = true;

        this.populaEquipe();

        this.setRegistro = this.setRegistro.bind(this);
        this.setResponsavelRebase = this.setResponsavelRebase.bind(this);
        this.setResponsavelDocumentacao = this.setResponsavelDocumentacao.bind(this);
        this.executaFuncao = this.executaFuncao.bind(this);
    }

    getRegistroPadrao() {
        return {
            demandaPacote: "AUTO-", 
            tempoRebase: Calculadora.getTempoRebase(),
            responsavelRebase: null,
            demandaDocumentacao: "AUTO-",                 
            tempoDocumentacao: Calculadora.getTempoDocumentacao(), 
            responsavelDocumentacao: null,
            tempoTotal: Calculadora.calculaTempoTotalPacote(true, true)               
        };
    }

    populaEquipe() {
        if (this.equipeDesenvolvimento != null && this.equipeDesenvolvimento != undefined)
            this.equipeDesenvolvimento = this.equipeDesenvolvimento.filter((e) => {return e.desenvolvimento});
        else
            this.equipeDesenvolvimento = [];

        if (this.equipeDocumentacao != null && this.equipeDocumentacao != undefined)
            this.equipeDocumentacao = this.equipeDocumentacao.filter((e) => {return e.documentacao});
        else
            this.equipeDocumentacao = [];
    }

    setRegistro(valor, propriedade) {
        var json = {};
        Object.assign(json, this.state.registro);
        json[propriedade] = valor;
        this.setState({registro: json});
    }

    setResponsavelRebase(responsavel) {
        if (responsavel == undefined) this.setRegistro(null, P_RESPONSAVEL_REBASE);
        else this.setRegistro(responsavel.usuario, P_RESPONSAVEL_REBASE);
    }

    setResponsavelDocumentacao(responsavel) {
        if (responsavel == undefined) this.setRegistro(null, P_RESPONSAVEL_DOCUMENTACAO);
        else this.setRegistro(responsavel.usuario, P_RESPONSAVEL_DOCUMENTACAO);
    }
 
    setPossuiDocumentacao() {
        var possuiDocumentacao = !this.state.possuiDocumentacao;
        var json = {};
        Object.assign(json, this.state.registro);
        json[P_RESPONSAVEL_DOCUMENTACAO] = null;
        json[P_TEMPO_DOCUMENTACAO] = possuiDocumentacao ? Calculadora.getTempoDocumentacao() : 0;
        json[P_TEMPO_TOTAL] = Calculadora.calculaTempoTotalPacote(possuiDocumentacao, this.state.possuiCompilacao);        
        this.setState({registro: json, possuiDocumentacao: possuiDocumentacao});
    }

    setPossuiCompilacao() {
        var possuiCompilacao = !this.state.possuiCompilacao;
        var json = {};
        Object.assign(json, this.state.registro);
        json[P_TEMPO_TOTAL] = Calculadora.calculaTempoTotalPacote(this.state.possuiDocumentacao, possuiCompilacao);        
        this.setState({registro: json, possuiCompilacao: possuiCompilacao});
    }

    executaFuncao() {
        this.props.funcao(this.state.registro);
        this.setState({registro: this.getRegistroPadrao(), possuiDocumentacao: true, possuiCompilacao: true});
    }

    render() {
        var input = {devTeste: true, input: true};
        var label = {devTeste: true, label: true};

        return (<>        
            <Container>
                <Row>
                    <Col sm={4}>
                        <Form>                            
                            <FormCheck 
                                    label={"Possui documentação?"}
                                    name="gbTeste"
                                    type="checkbox"
                                    checked={this.state.possuiDocumentacao}
                                    onChange={() => this.setPossuiDocumentacao()}
                            />   
                            <FormCheck 
                                    label={"Possui compilação?"}
                                    name="gbCompilacao"
                                    type="checkbox"
                                    checked={this.state.possuiCompilacao}
                                    onChange={() => this.setPossuiCompilacao()}
                            />                         
                        </Form>
                    </Col>
                    <Col sm={8}>
                        <Row>
                            <Label
                                texto={this.squadUsaSubtask ? "Demanda pacote:" : "Demanda:"}
                                parametrosTamanho={label}
                            />
                            <Input
                                ativo={true}
                                valor={this.state.registro.demandaPacote} 
                                parametrosTamanho={input}
                                inputTexto={true}
                                funcao={this.setRegistro}
                                parametrosFuncao={P_DEMANDA_PACOTE}
                            />
                        </Row>
                        <hr />
                        <Row>
                            <Label
                                texto="Tempo Rebase (h):"
                                parametrosTamanho={label}
                            />
                            <Input
                                ativo={false}
                                valor={this.state.registro.tempoRebase} 
                                parametrosTamanho={input}
                            />                            
                        </Row>
                        <hr />
                        <Row>
                            <Label
                                texto="Responsável rebase:"
                                parametrosTamanho={label}
                            />                
                            <Select 
                                parametrosTamanho={input} 
                                dados={this.equipeDesenvolvimento} 
                                funcao={this.setResponsavelRebase}
                                valor={this.state.registro.responsavelRebase}
                                chave={Pessoa.getChaveSelect()}
                            />               
                        </Row>
                        <hr />
                        {this.squadUsaSubtask ? 
                            <>
                                <Row>
                                    <Label
                                        texto="Demanda documentação:"
                                        parametrosTamanho={label}
                                    />
                                    <Input
                                        ativo={this.state.possuiDocumentacao}
                                        valor={this.state.registro.demandaDocumentacao} 
                                        parametrosTamanho={input}
                                        inputTexto={true}
                                        funcao={this.setRegistro}
                                        parametrosFuncao={P_DEMANDA_DOCUMENTACAO}
                                    />
                                </Row>
                                <hr />
                            </> : <></>}                        
                        <Row>
                            <Label
                                texto="Tempo Documentação (h):"
                                parametrosTamanho={label}
                            />
                            <Input
                                ativo={false}
                                valor={this.state.registro.tempoDocumentacao} 
                                parametrosTamanho={input}
                            />
                        </Row>
                        <hr />
                        <Row>
                            <Label
                                texto="Responsável documentação:"
                                parametrosTamanho={label}
                            />        
                            <Select 
                                inativo={!this.state.possuiDocumentacao}
                                parametrosTamanho={input} 
                                dados={this.equipeDocumentacao} 
                                funcao={this.setResponsavelDocumentacao}
                                valor={this.state.registro.responsavelDocumentacao}
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
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col sm="10"></Col>
                    <Col sm="2">
                        <ButtonSuccess valido={this.state.registro.responsavelRebase != null ||
                                                this.state.registro.responsavelDocumentacao != null} texto={"Adicionar"} funcao={this.executaFuncao}/>
                    </Col>
                </Row>
            </Container>        
        </>);
    }
}

export default CalculadoraPacoteForm;