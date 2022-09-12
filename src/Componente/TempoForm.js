/* IMPOR REACT */
import { Col, Row, Form, Container } from "react-bootstrap";
import FormCheck from 'react-bootstrap/FormCheck'

/* IMPORT COMPONENTE */
import Componente from "./Arquitetura/Componente";
import ButtonSuccess from "./UI/Button/ButtonSuccess";
import ButtonCancel from "./UI/Button/ButtonCancel";
import Titulo from "./UI/Titulo";
import Label from "./UI/Label";
import Input from "./UI/Input";

/* IMPORT GERAL */
import Utils from "../Geral/Utils";
import Cache from "../Geral/Cache/Cache";
import ButtonAux from "./UI/Button/ButtonAux";
import Botao from "./UI/Button/Botao";
import Calculadora from "../Geral/Calculadora/Calculadora";

class TempoForm extends Componente {
    constructor(props) {
        super(props);
        this.state.teste = Calculadora.getTempoTeste();
        this.state.compilacao = Calculadora.getTempoCompilacao();
        this.state.rebase = Calculadora.getTempoRebase();
        this.state.documentacao = Calculadora.getTempoDocumentacao();
        this.state.piloto = Calculadora.getTempoPiloto();
        this.state.deploy = Calculadora.getTempoDeploy();
        this.state.capacidade = Calculadora.getCapacidade();

        this.salvar = this.salvar.bind(this);
        this.setDados = this.setDados.bind(this);
    }

    setDados(valor, propriedade) {
        this.setState({[propriedade]: valor});
    }

    salvar() {
        Cache.tempoTeste.set(this.state.teste);
        Cache.tempoCompilacao.set(this.state.compilacao);
        Cache.tempoRebase.set(this.state.rebase);
        Cache.tempoDocumentacao.set(this.state.documentacao);
        Cache.tempoPiloto.set(this.state.piloto);
        Cache.tempoDeploy.set(this.state.deploy);
        Cache.capacidade.set(this.state.capacidade);
        document.location.href = "/";
    }

    /* RENDER */
    render() {
        var input = {gerenciamentoTempo: true, input: true};
        var label = {gerenciamentoTempo: true, label: true};
        return( <>
            <Container>
                <Row>
                    <Titulo titulo="Gerenciamento do tempo"/>  
                </Row>
                <Row>
                    <Label
                        texto="Percentual teste:"
                        parametrosTamanho={label}
                    />
                    <Input
                        ativo={true}
                        valor={this.state.teste} 
                        parametrosTamanho={input}
                        inputTexto={false}
                        funcao={this.setDados}
                        parametrosFuncao={"teste"}
                    />
                </Row>
                <hr/>
                <Row>
                    <Label
                        texto="Tempo compilação:"
                        parametrosTamanho={label}
                    />
                    <Input
                        ativo={true}
                        valor={this.state.compilacao} 
                        parametrosTamanho={input}
                        inputTexto={false}
                        funcao={this.setDados}
                        parametrosFuncao={"compilacao"}
                    />
                </Row>
                <hr/>
                <Row>
                    <Label
                        texto="Tempo rebase:"
                        parametrosTamanho={label}
                    />
                    <Input
                        ativo={true}
                        valor={this.state.rebase} 
                        parametrosTamanho={input}
                        inputTexto={false}
                        funcao={this.setDados}
                        parametrosFuncao={"rebase"}
                    />
                </Row>
                <hr/>
                <Row>
                    <Label
                        texto="Tempo documentação:"
                        parametrosTamanho={label}
                    />
                    <Input
                        ativo={true}
                        valor={this.state.documentacao} 
                        parametrosTamanho={input}
                        inputTexto={false}
                        funcao={this.setDados}
                        parametrosFuncao={"documentacao"}
                    />
                </Row>
                <hr/>
                <Row>
                    <Label
                        texto="Tempo piloto:"
                        parametrosTamanho={label}
                    />
                    <Input
                        ativo={true}
                        valor={this.state.piloto} 
                        parametrosTamanho={input}
                        inputTexto={false}
                        funcao={this.setDados}
                        parametrosFuncao={"piloto"}
                    />
                </Row>
                <hr/>
                <Row>
                    <Label
                        texto="Tempo deploy:"
                        parametrosTamanho={label}
                    />
                    <Input
                        ativo={true}
                        valor={this.state.deploy} 
                        parametrosTamanho={input}
                        inputTexto={false}
                        funcao={this.setDados}
                        parametrosFuncao={"deploy"}
                    />
                </Row>
                <hr/>
                <Row>
                    <Label
                        texto="Capacidade da sprint:"
                        parametrosTamanho={label}
                    />
                    <Input
                        ativo={true}
                        valor={this.state.capacidade} 
                        parametrosTamanho={input}
                        inputTexto={false}
                        funcao={this.setDados}
                        parametrosFuncao={"capacidade"}
                    />
                </Row>
                <hr/>
                <Row>
                    <Col sm={12}>
                        <Row>                        
                            <Col sm={4}>
                            </Col>
                            <Col sm={4}>
                                <ButtonSuccess
                                    valido={true}
                                    texto={"Salvar"}
                                    funcao={this.salvar}
                                />  
                            </Col>
                            <Col sm={4}>
                                <ButtonCancel
                                    valido={true}
                                    texto={"Voltar"}
                                    funcao={this.props.funcaoVoltar}
                                />
                            </Col>                        
                        </Row>
                        <br/>
                    </Col>        
                </Row>
            </Container>
        </>
        );
    }
}

export default TempoForm; 