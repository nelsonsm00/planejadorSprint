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

class CalculadoraUnitarioForm extends Componente {   
    constructor(props) {
        super(props);             
        this.state.registro = this.getRegistroPadrao();
        this.equipeDesenvolvimento = Cache.equipe.get;

        this.populaEquipe();

        this.setRegistro = this.setRegistro.bind(this);
        this.setResponsavelDesenvolvimento = this.setResponsavelDesenvolvimento.bind(this);
        this.executaFuncao = this.executaFuncao.bind(this);
    }

    getRegistroPadrao() {
        return {demanda: "AUTO-", 
                tempoDesenvolvimento: 0, 
                tempoTeste: 0, 
                tempoTotal: 0, 
                responsavelDesenvolvimento: null, 
                responsavelTeste: null
            };
    }

    populaEquipe() {
        if (this.equipeDesenvolvimento == null || this.equipeDesenvolvimento == undefined)
           this.equipeDesenvolvimento = [];
    }

    setRegistro(valor, propriedade) {
        var json = {};
        var tempoDesenvolvimento = 0;
        Object.assign(json, this.state.registro);
        json[propriedade] = valor;
        
        if (propriedade == "tempoDesenvolvimento") {
            json.tempoTotal = valor;
        }        
        this.setState({registro: json});
    }

    setResponsavelDesenvolvimento(responsavel) {
        if (responsavel == undefined) this.setRegistro(null, "responsavelDesenvolvimento");
        else this.setRegistro(responsavel.usuario, "responsavelDesenvolvimento");
    }

    executaFuncao() {
        this.props.funcao(this.state.registro);
        this.setState({registro: this.getRegistroPadrao(), possuiPiloto: true});
    }

    renderMaximoDesenvolvimento() {
        if (this.state.registro.tempoDesenvolvimento > Calculadora.getCapacidade()) {
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
                                texto="Tempo (h):"
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
                                texto="Responsável:"
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
                        <ButtonSuccess valido={this.state.registro.responsavelDesenvolvimento != null} texto={"Adicionar"} funcao={this.executaFuncao}/>
                    </Col>
                </Row>
            </Container>        
        </>);
    }
}

export default CalculadoraUnitarioForm;