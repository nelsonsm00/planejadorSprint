/* IMPORT REACT */
import { Component } from "react";
import { Col, Row, Form, Container } from "react-bootstrap";
import FormCheck from 'react-bootstrap/FormCheck'


/* IMPORT COMPONENTE */
import Componente from "./Arquitetura/Componente";
import Input from "./UI/Input";
import Label from "./UI/Label";
import Select from "./UI/Select";
import ButtonSuccess from "./UI/Button/ButtonSuccess";

/* IMPORT GERAL */
import Cache from "../Geral/Cache/Cache";
import Calculadora from "../Geral/Calculadora/Calculadora";

class CalculadoraDevTesteForm extends Componente {   
    constructor(props) {
        super(props);             
        this.state.registro = this.getRegistroPadrao();
        this.state.possuiTeste = true;
        this.state.possuiCompilacao = true;
        this.equipeDesenvolvimento = Cache.equipe.get;
        this.equipeTeste = Cache.equipe.get;

        this.populaEquipe();

        this.setRegistro = this.setRegistro.bind(this);
        this.setResponsavelDesenvolvimento = this.setResponsavelDesenvolvimento.bind(this);
        this.setResponsavelTeste = this.setResponsavelTeste.bind(this);
        this.executaFuncao = this.executaFuncao.bind(this);
    }

    getRegistroPadrao() {
        return {demanda: "AUTO-", tempoDesenvolvimento: 0, tempoTeste: 0, tempoTotal: 0, responsavelDesenvolvimento: null, responsavelTeste: null};
    }

    populaEquipe() {
        if (this.equipeDesenvolvimento != null && this.equipeDesenvolvimento != undefined)
            this.equipeDesenvolvimento = this.equipeDesenvolvimento.filter((e) => {return e.desenvolvimento});
        else
            this.equipeDesenvolvimento = [];

        if (this.equipeTeste != null && this.equipeTeste != undefined)
            this.equipeTeste = this.equipeTeste.filter((e) => {return e.teste});
        else
            this.equipeTeste = [];
    }

    setRegistro(valor, propriedade, possuiTeste = false) {
        var json = {};
        var tempoDesenvolvimento = 0;
        var tempoTeste = 0;
        Object.assign(json, this.state.registro);
        json[propriedade] = valor;
        
        if (propriedade == "tempoDesenvolvimento" || propriedade == "tempoTeste") {
            if (propriedade == "tempoDesenvolvimento") {
                tempoDesenvolvimento = valor;
                if (this.state.possuiTeste || possuiTeste)
                    tempoTeste = Calculadora.calculaTempoTeste(tempoDesenvolvimento);
                else
                    tempoTeste = 0;
            }
            else if (propriedade == "tempoTeste") {
                tempoDesenvolvimento = json.tempoDesenvolvimento;
                if (this.state.possuiTeste)
                    tempoTeste = valor;
                else
                    tempoTeste = 0;                
            }
            json.tempoDesenvolvimento = tempoDesenvolvimento;
            json.tempoTeste = tempoTeste;
            json.tempoTotal = Calculadora.calculaTempoTotalDevTeste(tempoDesenvolvimento, tempoTeste, this.state.possuiCompilacao);
        }        
        this.setState({registro: json});
    }

    setResponsavelDesenvolvimento(responsavel) {
        if (responsavel == undefined) this.setRegistro(null, "responsavelDesenvolvimento");
        else this.setRegistro(responsavel.usuario, "responsavelDesenvolvimento");
    }

    setResponsavelTeste(responsavel) {
        if (responsavel == undefined) this.setRegistro(null, "responsavelTeste");
        else this.setRegistro(responsavel.usuario, "responsavelTeste");
    }

    setPossuiTeste() {
        var possuiTeste = !this.state.possuiTeste;
        this.setState({possuiTeste: possuiTeste})
        if (possuiTeste)
            this.setRegistro(this.state.registro.tempoDesenvolvimento, "tempoDesenvolvimento", true);
        else {
            var json = {};
            Object.assign(json, this.state.registro);
            json.responsavelTeste = null;
            json.tempoTeste = 0;
            json.tempoTotal = Calculadora.calculaTempoTotalDevTeste(json.tempoDesenvolvimento, 0, this.state.possuiCompilacao);  
            this.setState({registro: json});     
        }
    }

    setPossuiCompilacao() {
        var possuiCompilacao = !this.state.possuiCompilacao;
        var json = {};
        Object.assign(json, this.state.registro);
        json.tempoTotal = Calculadora.calculaTempoTotalDevTeste(json.tempoDesenvolvimento, json.tempoTeste, possuiCompilacao);  
        this.setState({registro: json, possuiCompilacao: possuiCompilacao});    
    }

    executaFuncao() {
        this.props.funcao(this.state.registro);
        this.setState({registro: this.getRegistroPadrao(), possuiTeste: true, possuiCompilacao: true});
    }

    renderMaximoDesenvolvimento() {
        if (this.state.registro.tempoDesenvolvimento > Calculadora.getTempoDesenvolvimento()) {
            return <Row>
                        <Label
                            texto={"Tempo máximo atingido (" + Calculadora.getTempoDesenvolvimento() + "h)!"}
                            classe="maximo"
                        />
                    </Row>
        }
    }

    renderMaximoTeste() {
        if (this.state.registro.tempoTeste > Calculadora.calculaTempoTeste(Calculadora.getTempoDesenvolvimento())) {
            return <Row>
                        <Label
                            texto={"Tempo máximo atingido (" + Calculadora.calculaTempoTeste(Calculadora.getTempoDesenvolvimento()) + "h)!"}
                            classe="maximo"
                        />
                    </Row>
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
                    <Col sm={4}>
                        <Form>                            
                            <FormCheck 
                                    label={"Possui teste?"}
                                    name="gbTeste"
                                    type="checkbox"
                                    checked={this.state.possuiTeste}
                                    onChange={() => this.setPossuiTeste()}
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
                                texto="Demanda:"
                                parametrosTamanho={label}
                            />
                            <Input
                                ativo={true}
                                valor={this.state.registro.demanda} 
                                parametrosTamanho={input}
                                inputTexto={true}
                                funcao={this.setRegistro}
                                parametrosFuncao="demanda"
                            />
                        </Row>
                        <hr />
                        <Row>
                            <Label
                                texto="Tempo Desenv. (h):"
                                parametrosTamanho={label}
                            />
                            <Input
                                ativo={true}
                                valor={this.state.registro.tempoDesenvolvimento} 
                                parametrosTamanho={input}
                                funcao={this.setRegistro}
                                parametrosFuncao="tempoDesenvolvimento"
                            />                            
                        </Row>
                        {this.renderMaximoDesenvolvimento()}                        
                        <hr />
                        <Row>
                            <Label
                                texto="Responsável desenv.:"
                                parametrosTamanho={label}
                            />                
                            <Select 
                                parametrosTamanho={input} 
                                dados={this.equipeDesenvolvimento} 
                                funcao={this.setResponsavelDesenvolvimento}
                                valor={this.state.registro.responsavelDesenvolvimento}
                            />               
                        </Row>
                        <hr />
                        <Row>
                            <Label
                                texto="Tempo Teste (h):"
                                parametrosTamanho={label}
                            />
                            <Input
                                ativo={this.state.possuiTeste}
                                valor={this.state.registro.tempoTeste} 
                                parametrosTamanho={input}
                                funcao={this.setRegistro}
                                parametrosFuncao="tempoTeste"
                            />
                        </Row>
                        {this.renderMaximoTeste()} 
                        <hr />
                        <Row>
                            <Label
                                texto="Responsável teste:"
                                parametrosTamanho={label}
                            />        
                            <Select 
                                inativo={!this.state.possuiTeste}
                                parametrosTamanho={input} 
                                dados={this.equipeTeste} 
                                funcao={this.setResponsavelTeste}
                                valor={this.state.registro.responsavelTeste}
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
                    <Col sm="10"></Col>
                    <Col sm="2">
                        <ButtonSuccess valido={this.state.registro.responsavelDesenvolvimento != null ||
                                                this.state.registro.responsavelTeste != null} texto={"Adicionar"} funcao={this.executaFuncao}/>
                    </Col>
                </Row>
            </Container>        
        </>);
    }
}

export default CalculadoraDevTesteForm;