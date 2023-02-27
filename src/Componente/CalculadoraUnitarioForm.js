/* IMPORT REACT */
import { Col, Row, Container } from "react-bootstrap";

/* IMPORT COMPONENTE */
import ButtonSuccess from "./UI/Button/ButtonSuccess";
import Componente from "./Arquitetura/Componente";
import Input from "./UI/Input";
import Label from "./UI/Label";
import Select from "./UI/Select";

/* IMPORT GERAL */
import Cache from "../Geral/Cache/Cache";
import Calculadora from "../Geral/Calculadora/Calculadora";
import Pessoa from "../Geral/Pessoa/Pessoa";

class CalculadoraUnitarioForm extends Componente {   
    constructor(props) {
        super(props);    
        this.state.registro = this.getRegistroPadrao();

        this.populaEquipe();

        this.setRegistro = this.setRegistro.bind(this);
        this.setResponsavel = this.setResponsavel.bind(this);
        this.executaFuncao = this.executaFuncao.bind(this);
    }

    getRegistroPadrao() {
        return {demanda: "AUTO-", 
                tempo: 0, 
                tempoTotal: 0, 
                responsavel: null
            };
    }

    populaEquipe() {
        if (this.equipe == null || this.equipe == undefined)
           this.equipe = [];
    }

    setRegistro(valor, propriedade) {
        var json = {};
        Object.assign(json, this.state.registro);
        json[propriedade] = valor;        
        if (propriedade == "tempo") {
            json.tempoTotal = valor;
        }        
        this.setState({registro: json});
    }

    setResponsavel(responsavel) {
        if (responsavel == undefined) this.setRegistro(null, "responsavel");
        else this.setRegistro(responsavel.usuario, "responsavel");
    }

    executaFuncao() {
        this.props.funcao(this.state.registro);
        this.setState({registro: this.getRegistroPadrao()});
    }

    renderMaximoDesenvolvimento() {
        if (this.state.registro.tempo > Calculadora.getCapacidade()) {
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
                                valor={this.state.registro.tempo} 
                                parametrosTamanho={input}
                                funcao={this.setRegistro}
                                parametrosFuncao="tempo"
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
                                dados={this.equipe} 
                                funcao={this.setResponsavel}
                                valor={this.state.registro.responsavel}
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
                        <ButtonSuccess valido={this.state.registro.responsavel != null} texto={"Adicionar"} funcao={this.executaFuncao}/>
                    </Col>
                </Row>
            </Container>        
        </>);
    }
}

export default CalculadoraUnitarioForm;