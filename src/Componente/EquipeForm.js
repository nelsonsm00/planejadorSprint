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

class EquipeForm extends Componente {
    constructor(props) {
        super(props);
        this.state.dados = Cache.equipe.get;
        if (this.state.dados == null || this.state.dados == undefined)
            this.state.dados = [];
        
        this.state.dados.map((d) => {d.excluir = false});

        this.salvar = this.salvar.bind(this);
        this.incluir = this.incluir.bind(this);
        this.setDados = this.setDados.bind(this);
    }

    setDesenvolvimento(index) {
        var dados = [];
        Object.assign(dados, this.state.dados);
        dados[index].desenvolvimento = !dados[index].desenvolvimento;
        this.setState({dados: dados});        
    }

    setDados(valor, parametros) {
        var dados = [];
        Object.assign(dados, this.state.dados);
        dados[parametros.index][parametros.propriedade] = valor;
        this.setState({dados: dados});
    }
    
    setTeste(index) {
        var dados = [];
        Object.assign(dados, this.state.dados);
        dados[index].teste = !dados[index].teste;
        this.setState({dados: dados});
    }

    setDocumentacao(index) {
        var dados = [];
        Object.assign(dados, this.state.dados);
        dados[index].documentacao = !dados[index].documentacao;
        this.setState({dados: dados});
    }

    setPiloto(index) {
        var dados = [];
        Object.assign(dados, this.state.dados);
        dados[index].piloto = !dados[index].piloto;
        this.setState({dados: dados});
    }

    setExcluir(index) {
        var dados = [];
        Object.assign(dados, this.state.dados);
        dados[index].excluir = !dados[index].excluir;
        this.setState({dados: dados});
    }

    salvar() {
        var dados = [];
        Object.assign(dados, this.state.dados);
        dados = dados.filter((d) => !d.excluir);
        dados.sort(function(a, b) {
            if (a.nome > b.nome) {
                return 1;
              }
              if (a.nome < b.nome) {
                return -1;
              }
              return 0;
         });
        Cache.equipe.set(dados);
        document.location.href = "/";
    }

    incluir() {
        var dados = [];
        Object.assign(dados, this.state.dados);
        dados.push({nome: "", usuario: "", desenvolvimento: true, teste: true, documentacao: true, piloto: true});
        this.setState({dados: dados});
    }

    /* RENDER */
    render() {
        var input = {gerenciamentoEquipe: true, input: true};
        var label = {gerenciamentoEquipe: true, label: true};
        return( <>
            <Container>
                <Row>
                    <Titulo titulo="Gerenciamento da equipe"/>  
                </Row>
                <>
                    {this.state.dados.map((d, index) => (                            
                        <>
                            <Row>
                                <Col sm={2}>
                                    <FormCheck 
                                        label={"Excluir"}
                                        name="gbExcluir"
                                        type="checkbox"
                                        checked={d.excluir}
                                        onChange={() => this.setExcluir(index)}
                                    /> 
                                </Col>
                                <Label
                                    texto="Usuário:"
                                    parametrosTamanho={label}
                                />
                                <Input
                                    ativo={true}
                                    valor={d.usuario} 
                                    parametrosTamanho={input}
                                    inputTexto={true}
                                    funcao={this.setDados}
                                    parametrosFuncao={{index: index, propriedade: "usuario"}}
                                />
                                <Label
                                    texto="Nome:"
                                    parametrosTamanho={label}
                                />
                                <Input
                                    ativo={true}
                                    valor={d.nome} 
                                    parametrosTamanho={input}
                                    inputTexto={true}
                                    funcao={this.setDados}
                                    parametrosFuncao={{index: index, propriedade: "nome"}}
                                />
                                <Label
                                    texto="Equipe:"
                                    parametrosTamanho={label}
                                />
                                <Col sm={2}>
                                    <Form>                            
                                        <FormCheck 
                                                label={"Desenvolvimento"}
                                                name="gbDev"
                                                type="checkbox"
                                                checked={d.desenvolvimento}
                                                onChange={() => this.setDesenvolvimento(index)}
                                        />   
                                        <FormCheck 
                                                label={"Teste"}
                                                name="gbTeste"
                                                type="checkbox"
                                                checked={d.teste}
                                                onChange={() => this.setTeste(index)}
                                        />          
                                        <FormCheck 
                                                label={"Documentação"}
                                                name="gbDoc"
                                                type="checkbox"
                                                checked={d.documentacao}
                                                onChange={() => this.setDocumentacao(index)}
                                        /> 
                                        <FormCheck 
                                                label={"Piloto"}
                                                name="gbPilo"
                                                type="checkbox"
                                                checked={d.piloto}
                                                onChange={() => this.setPiloto(index)}
                                        />                     
                                    </Form>
                                </Col>
                            </Row>
                            <hr></hr>
                        </>
                    ))}   
                </>
                <Row>
                    <Col sm={12}>
                        <Row>                        
                            <Col sm={6}>
                            </Col>
                            <Col sm={2}>
                                <Botao
                                    valido={true}
                                    texto={"Incluir"}
                                    funcao={this.incluir}
                                />  
                            </Col>
                            <Col sm={2}>
                                <ButtonSuccess
                                    valido={true}
                                    texto={"Salvar"}
                                    funcao={this.salvar}
                                />  
                            </Col>
                            <Col sm={2}>
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

export default EquipeForm; 