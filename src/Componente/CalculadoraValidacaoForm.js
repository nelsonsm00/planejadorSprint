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

class CalculadoraValidacaoForm extends Componente {   
    constructor(props) {
        super(props);             
        this.state.registro = this.getRegistroPadrao();
        this.state.possuiPiloto = true;
        this.equipeDesenvolvimento = Cache.equipe.get;
        this.equipeTeste = Cache.equipe.get;

        this.populaEquipe();

        this.setDemanda = this.setDemanda.bind(this);
        this.setResponsavelDesenvolvimento = this.setResponsavelDesenvolvimento.bind(this);
        this.setResponsavelTeste = this.setResponsavelTeste.bind(this);
        this.executaFuncao = this.executaFuncao.bind(this);
    }

    getRegistroPadrao() {
        return {demanda: "AUTO-", 
                tempoDesenvolvimento: Calculadora.getTempoDeploy(), 
                tempoTeste: Calculadora.getTempoPiloto(), 
                tempoTotal: Calculadora.calculaTempoValidacao(true), 
                responsavelDesenvolvimento: null, 
                responsavelTeste: null
            };
    }

    populaEquipe() {
        if (this.equipeDesenvolvimento != null && this.equipeDesenvolvimento != undefined)
            this.equipeDesenvolvimento = this.equipeDesenvolvimento.filter((e) => {return e.desenvolvimento});
        else
            this.equipeDesenvolvimento = [];

        if (this.equipeTeste != null && this.equipeTeste != undefined)
            this.equipeTeste = this.equipeTeste.filter((e) => {return e.piloto});
        else
            this.equipeTeste = [];
    }

    setDemanda(demanda) {
        var json = {};
        Object.assign(json, this.state.registro);
        json.demanda = demanda;
        this.setState({registro: json});
    }

    setResponsavelDesenvolvimento(responsavel) {
        if (responsavel == undefined) responsavel = {usuario: null};
        var json = {};
        Object.assign(json, this.state.registro);
        json.responsavelDesenvolvimento = responsavel.usuario;
        this.setState({registro: json});
    }

    setResponsavelTeste(responsavel) {
        if (responsavel == undefined) responsavel = {usuario: null};
        var json = {};
        Object.assign(json, this.state.registro);
        json.responsavelTeste = responsavel.usuario
        this.setState({registro: json});
    }

    setPossuiPiloto() {
        var possuiPiloto = !this.state.possuiPiloto;
        var json = {};
        Object.assign(json, this.state.registro);
        json.responsavelTeste = null;
        json.tempoTeste = possuiPiloto ? Calculadora.getTempoPiloto() : 0;
        json.tempoTotal = Calculadora.calculaTempoValidacao(possuiPiloto);        
        this.setState({registro: json, possuiPiloto: possuiPiloto});
    }

    executaFuncao() {
        this.props.funcao(this.state.registro);
        this.setState({registro: this.getRegistroPadrao(), possuiPiloto: true});
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
                                    label={"Possui piloto?"}
                                    name="gbPiloto"
                                    type="checkbox"
                                    checked={this.state.possuiPiloto}
                                    onChange={() => this.setPossuiPiloto()}
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
                                funcao={this.setDemanda}
                            />
                        </Row>
                        <hr />
                        <Row>
                            <Label
                                texto="Tempo Piloto (h):"
                                parametrosTamanho={label}
                            />
                            <Input
                                ativo={false}
                                valor={this.state.registro.tempoTeste} 
                                parametrosTamanho={input}
                            />                            
                        </Row>
                        <hr />
                        <Row>
                            <Label
                                texto="Responsável piloto:"
                                parametrosTamanho={label}
                            />                
                            <Select 
                                inativo={!this.state.possuiPiloto}
                                parametrosTamanho={input} 
                                dados={this.equipeTeste} 
                                funcao={this.setResponsavelTeste}
                                valor={this.state.registro.responsavelTeste}
                            />               
                        </Row>
                        <hr />
                        <Row>
                            <Label
                                texto="Tempo Deploy (h):"
                                parametrosTamanho={label}
                            />
                            <Input
                                ativo={false}
                                valor={this.state.registro.tempoDesenvolvimento} 
                                parametrosTamanho={input}
                            />
                        </Row>
                        <hr />
                        <Row>
                            <Label
                                texto="Responsável deploy:"
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
                        <ButtonSuccess valido={this.state.registro.responsavelDesenvolvimento != null ||
                                                this.state.registro.responsavelTeste != null} texto={"Adicionar"} funcao={this.executaFuncao}/>
                    </Col>
                </Row>
            </Container>        
        </>);
    }
}

export default CalculadoraValidacaoForm;