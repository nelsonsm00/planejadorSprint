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
const P_DEMANDA_DEPLOY = "demandaDeploy";
const P_RESPONSAVEL_DEPLOY = "responsavelDeploy";
const P_TEMPO_DEPLOY = "tempoDeploy";
const P_DEMANDA_PILOTO = "demandaPiloto";
const P_RESPONSAVEL_PILOTO = "responsavelPiloto";
const P_TEMPO_PILOTO = "tempoPiloto";
const P_TEMPO_TOTAL = "tempoTotal";

class CalculadoraValidacaoForm extends Componente {   
    constructor(props) {
        super(props);            
        this.state.registro = this.getRegistroPadrao();
        this.state.possuiPiloto = true;

        this.populaEquipe();

        this.setRegistro = this.setRegistro.bind(this);
        this.setResponsavelDeploy = this.setResponsavelDeploy.bind(this);
        this.setResponsavelPiloto = this.setResponsavelPiloto.bind(this);
        this.executaFuncao = this.executaFuncao.bind(this);
    }

    getRegistroPadrao() {
        return {
            demandaDeploy: "AUTO-", 
            tempoDeploy: Calculadora.getTempoDeploy(),
            responsavelDeploy: null,
            demandaPiloto: "AUTO-",                 
            tempoPiloto: Calculadora.getTempoPiloto(true), 
            responsavelPiloto: null,
            tempoTotal: Calculadora.calculaTempoValidacao(true)               
        };
    }

    populaEquipe() {
        if (this.equipeDesenvolvimento != null && this.equipeDesenvolvimento != undefined)
            this.equipeDesenvolvimento = this.equipeDesenvolvimento.filter((e) => {return e.desenvolvimento});
        else
            this.equipeDesenvolvimento = [];

        if (this.equipePiloto != null && this.equipePiloto != undefined)
            this.equipePiloto = this.equipePiloto.filter((e) => {return e.piloto});
        else
            this.equipePiloto = [];
    }

    setRegistro(valor, propriedade) {
        var json = {};
        Object.assign(json, this.state.registro);
        json[propriedade] = valor;
        this.setState({registro: json});
    }

    setResponsavelDeploy(responsavel) {
        if (responsavel == undefined) this.setRegistro(null, P_RESPONSAVEL_DEPLOY);
        else this.setRegistro(responsavel.usuario, P_RESPONSAVEL_DEPLOY);
    }

    setResponsavelPiloto(responsavel) {
        if (responsavel == undefined) this.setRegistro(null, P_RESPONSAVEL_PILOTO);
        else this.setRegistro(responsavel.usuario, P_RESPONSAVEL_PILOTO);
    }

    setPossuiPiloto() {
        var possuiPiloto = !this.state.possuiPiloto;
        var json = {};
        Object.assign(json, this.state.registro);
        json[P_RESPONSAVEL_PILOTO] = null;
        json[P_TEMPO_PILOTO] = possuiPiloto ? Calculadora.getTempoPiloto() : 0;
        json[P_TEMPO_TOTAL] = Calculadora.calculaTempoValidacao(possuiPiloto);        
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
                                texto={this.squadUsaSubtask ? "Demanda deploy:" : "Demanda:"}
                                parametrosTamanho={label}
                            />
                            <Input
                                ativo={true}
                                valor={this.state.registro.demandaDeploy} 
                                parametrosTamanho={input}
                                inputTexto={true}
                                funcao={this.setRegistro}
                                parametrosFuncao={P_DEMANDA_DEPLOY}
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
                                valor={this.state.registro.tempoDeploy} 
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
                                inativo={false}
                                parametrosTamanho={input} 
                                dados={this.equipeDesenvolvimento} 
                                funcao={this.setResponsavelDeploy}
                                valor={this.state.registro.responsavelDeploy}
                                chave={Pessoa.getChaveSelect()}
                            />               
                        </Row>
                        <hr />
                        {this.squadUsaSubtask ? 
                            <>
                                <Row>
                                    <Label
                                        texto="Demanda piloto:"
                                        parametrosTamanho={label}
                                    />
                                    <Input
                                        ativo={this.state.possuiPiloto}
                                        valor={this.state.registro.demandaPiloto} 
                                        parametrosTamanho={input}
                                        inputTexto={true}
                                        funcao={this.setRegistro}
                                        parametrosFuncao={P_DEMANDA_PILOTO}
                                    />
                                </Row>
                                <hr />
                            </> : <></>}  
                        <Row>
                            <Label
                                texto="Tempo Piloto (h):"
                                parametrosTamanho={label}
                            />
                            <Input
                                ativo={false}
                                valor={this.state.registro.tempoPiloto} 
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
                                dados={this.equipePiloto} 
                                funcao={this.setResponsavelPiloto}
                                valor={this.state.registro.responsavelPiloto}
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
                        <ButtonSuccess valido={this.state.registro.responsavelDeploy != null ||
                                                this.state.registro.responsavelPiloto != null} texto={"Adicionar"} funcao={this.executaFuncao}/>
                    </Col>
                </Row>
            </Container>        
        </>);
    }
}

export default CalculadoraValidacaoForm;