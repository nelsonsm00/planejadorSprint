/* IMPOR REACT */
import { Col, Row, Container } from "react-bootstrap";

/* IMPORT COMPONENTE */
import Componente from "../Arquitetura/Componente";
import ButtonSuccess from "../UI/Button/ButtonSuccess";
import ButtonCancel from "../UI/Button/ButtonCancel";
import Titulo from "../UI/Titulo";
import Label from "../UI/Label";
import Input from "../UI/Input";

/* IMPORT GERAL */
import Cache from "../../Geral/Cache/Cache";
import Calculadora from "../../Geral/Calculadora/Calculadora";

class TempoForm extends Componente {
    constructor(props) {
        super(props);
        this.idSquadSelecionada = Cache.idSquadSelecionada.get;
        if (this.idSquadSelecionada == null || this.idSquadSelecionada == undefined)
            this.idSquadSelecionada = 0;
        else
            this.idSquadSelecionada = parseInt(this.idSquadSelecionada);

        var squads = Cache.squads.get;
        if (squads == null || squads == undefined || squads.length == 0)
            this.props.funcaoVoltar();
        
        this.nomeSquad = squads[this.idSquadSelecionada].squad;

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
        var squads = Cache.squads.get;
        squads[this.idSquadSelecionada].tempo = {
            tempoTeste: this.state.teste,
            tempoCompilacao: this.state.compilacao,
            tempoRebase: this.state.rebase,
            tempoDocumentacao: this.state.documentacao,
            tempoPiloto: this.state.piloto,
            tempoDeploy: this.state.deploy,
            capacidade: this.state.capacidade,
        };
        Cache.squads.set(squads);
        document.location.href = document.location.pathname;
    }

    /* RENDER */
    render() {
        var input = {gerenciamentoTempo: true, input: true};
        var label = {gerenciamentoTempo: true, label: true};
        return( <>
            <Container>
                <Row>
                <Titulo titulo={"Gerenciamento do tempo | " + this.nomeSquad} />
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