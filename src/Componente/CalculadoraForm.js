/* IMPORT REACT */
import { Component } from "react";
import { Col, Row, Form, Container } from "react-bootstrap";


/* IMPORT COMPONENTE */
import Componente from "./Arquitetura/Componente";
import CalculadoraTab from "./CalculadoraTab";
import ImpressaoModal from "./ImpressaoModal";
import Table from "./UI/Table";
import ButtonAux from "./UI/Button/ButtonAux";
import EquipeModal from "./EquipeModal";

/* IMPORT GERAL */
import Coluna from "../Geral/Coluna/Coluna";
import ListaPessoa from "../Geral/Pessoa/ListaPessoa";
import Cache from "../Geral/Cache/Cache";
import PlanejamentoCapacidade from "../Geral/Relatorio/PlanejamentoCapacidade";

class CalculadoraForm extends Componente {
    constructor(props) {
        super(props);       
        this.colunas = [new Coluna("Responsável", "nome", 50), new Coluna("Horas alocadas", "horasAlocadas", 40), new Coluna("Saldo", "saldo", 10)];    
        this.colunasDemanda = [new Coluna("Demanda", "demanda", 10), 
                                new Coluna("Tempo desenv.", "tempoDesenvolvimento", 10), 
                                new Coluna("Responsável desenv.", "nomeDesenvolvimento", 20),
                                new Coluna("Tempo teste/doc/val", "tempoTeste", 15),
                                new Coluna("Respons. teste/doc/val", "nomeTeste", 15),
                                new Coluna("Total", "tempoTotal", 10),
                                new Coluna(null, null, 10, true)];
        this.state.registro = new ListaPessoa();    
        this.state.dados = [];
        this.state.showModal = false;
        this.state.showImpressao = false;
        this.state.nomeSprint = "";
        this.adiciona = this.adiciona.bind(this);
        this.deleta = this.deleta.bind(this);
        this.verificaSaldo = this.verificaSaldo.bind(this);
        this.abreConfiguracaoEquipe = this.abreConfiguracaoEquipe.bind(this);
        this.fechaConfiguracaoEquipe = this.fechaConfiguracaoEquipe.bind(this);
        this.abreImpressao = this.abreImpressao.bind(this);
        this.fechaImpressao = this.fechaImpressao.bind(this);
        this.imprime = this.imprime.bind(this);
        this.setNomeSprint = this.setNomeSprint.bind(this);
    }

    adiciona(registro) {
        var listaPessoa = this.state.registro;
        this.setState({registro: new ListaPessoa()});
        if (registro.responsavelDesenvolvimento != null)
            listaPessoa.alocaHoras(registro.responsavelDesenvolvimento, registro.tempoDesenvolvimento);
        if (registro.responsavelTeste != null)
            listaPessoa.alocaHoras(registro.responsavelTeste, registro.tempoTeste);

        var dados = [];
        Object.assign(dados, this.state.dados);
        registro.nomeDesenvolvimento = listaPessoa.getNome(registro.responsavelDesenvolvimento);
        registro.nomeTeste = listaPessoa.getNome(registro.responsavelTeste);
        dados.push(registro)
        this.setState({registro: listaPessoa, dados: dados});
    }

    deleta(index) {
        index = index.id;
        var registro = this.state.dados[index];
        var listaPessoa = this.state.registro;
        this.setState({registro: new ListaPessoa()});
        if (registro.responsavelDesenvolvimento != null)
            listaPessoa.desalocaHoras(registro.responsavelDesenvolvimento, registro.tempoDesenvolvimento);
        if (registro.responsavelTeste != null)
            listaPessoa.desalocaHoras(registro.responsavelTeste, registro.tempoTeste);

        var dados = [];
        Object.assign(dados, this.state.dados);
        delete dados[index];
        this.setState({registro: listaPessoa, dados: dados});
    }

    verificaSaldo(index) {
        return this.state.registro.pessoas[index].getSaldo() < 0;
    }

    abreConfiguracaoEquipe() {
        this.setState({showModal: true});
    }

    fechaConfiguracaoEquipe() {
        this.setState({showModal: false});
    }

    abreImpressao() {
        this.setState({showImpressao: true});
    }

    fechaImpressao() {
        this.setState({showImpressao: false});
    }

    setNomeSprint(valor) {
        this.setState({nomeSprint: valor});
    }

    imprime() {
        PlanejamentoCapacidade.imprime(this.state.nomeSprint, 
            this.colunas, 
            this.state.registro.getJson(), 
            this.colunasDemanda, 
            this.state.dados);                          
    }

    carregaPessoas() {
        var listaPessoa = new ListaPessoa();
        var equipe = Cache.equipe.get;
        if (equipe == null || equipe == undefined)
            equipe = [];
        equipe.map((d) => (listaPessoa.add(d.nome, d.usuario)));
        return listaPessoa;
    }

    componentDidMount() {
        this.setState({registro: this.carregaPessoas()});
    }

    render() {
        return (<>  
            <EquipeModal show={this.state.showModal} onHide={this.fechaConfiguracaoEquipe} />  
            <ImpressaoModal 
                show={this.state.showImpressao} 
                onHide={this.fechaImpressao}
                funcao={this.imprime}
                funcaoSecundaria={this.setNomeSprint}
                valor={this.state.nomeSprint}
            />
            <Container>
                <Col sm={12}>
                <Row>
                    <Col sm={4}> 
                        <Row>   
                            <Table id="capacidadeResponsavel" dados={this.state.registro.getJson()} colunas={this.colunas} funcaoNegativo={this.verificaSaldo}/>
                        </Row>
                        <hr/>
                        <Row>
                            <center>
                                <ButtonAux texto="Configurar equipe" valido={true} funcao={this.abreConfiguracaoEquipe}/>
                            </center>
                        </Row>
                        <hr/>
                        <Row>
                            <center>
                                <ButtonAux texto="Imprimir" valido={true} funcao={this.abreImpressao}/>
                            </center>
                        </Row>
                    </Col>
                    <Col sm={8} className="divisao">   
                        <CalculadoraTab funcao={this.adiciona} /> 
                    </Col>                    
                </Row>
                <hr/>
                <Row>
                    <Col sm={12}>
                        <Table id="demandas" dados={this.state.dados} colunas={this.colunasDemanda} funcao={this.deleta} />
                    </Col>    
                </Row>
                </Col>
            </Container> 
        </>);
    }
}

export default CalculadoraForm;