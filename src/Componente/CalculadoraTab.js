/* IMPORT REACT */
import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

/* IMPORT COMPONENTE */
import Componente from "./Arquitetura/Componente";
import Aba from "../Geral/Aba/Aba";
import CalculadoraDevTesteForm from "./CalculadoraDevTesteForm";
import CalculadoraPacoteForm from "./CalculadoraPacoteForm";
import CalculadoraValidacaoForm from "./CalculadoraValidacaoForm";
import CalculadoraUnitarioForm from "./CalculadoraUnitarioForm";
import CalculadoraDevTesteSubTaskForm from "./Calculadora/CalculadoraDevTesteSubTaskForm";
import CalculadoraDemandaPaiForm from "./Calculadora/CalculadoraDemandaPaiForm";

class CalculadoraTab extends Componente {
    constructor(props) {
        super(props); 
        this.tabs = {
            devTeste: new Aba("Desenvolvimento/Teste"),
            pacote: new Aba("Pacote"),
            validacao: new Aba("Validação"),
            unitario: new Aba("Unitário")
        };
        this.state.abaSelecionada = this.tabs.devTeste.chave;
        this.state.titulo = "";
        
        this.selecionaAba = this.selecionaAba.bind(this);
    }

    selecionaAba(chave) {
        this.setState({abaSelecionada: chave});
    }

    isAbaSelecionada(chave) {
        if (this.state.abaSelecionada == chave) {
            return "abaSelecionada";
        }
        else return "aba";
    }

    render() {
        return (<>        
            <Tabs defaultActiveKey={this.tabs.devTeste.chave} onSelect={key => this.selecionaAba(key)}>
                <Tab
                    eventKey={this.tabs.devTeste.chave}
                    title={this.tabs.devTeste.titulo}
                    className={this.isAbaSelecionada(this.tabs.devTeste.chave)}
                >                    
                    <br/>
                    {this.squadUsaSubtask ? 
                        <CalculadoraDemandaPaiForm funcao={this.props.funcao}/> : 
                        <CalculadoraDevTesteForm funcao={this.props.funcao}/>
                    }
                </Tab>
                <Tab
                    eventKey={this.tabs.pacote.chave}
                    title={this.tabs.pacote.titulo}
                    className={this.isAbaSelecionada(this.tabs.pacote.chave)}
                >                    <br/>
                    <CalculadoraPacoteForm funcao={this.props.funcao}/>
                </Tab>
                <Tab
                    eventKey={this.tabs.validacao.chave}
                    title={this.tabs.validacao.titulo}
                    className={this.isAbaSelecionada(this.tabs.validacao.chave)}
                >
                    <br/>
                    <CalculadoraValidacaoForm funcao={this.props.funcao}/>
                </Tab>
                <Tab
                    eventKey={this.tabs.unitario.chave}
                    title={this.tabs.unitario.titulo}
                    className={this.isAbaSelecionada(this.tabs.unitario.chave)}
                >
                    <br/>
                    <CalculadoraUnitarioForm funcao={this.props.funcao}/>
                </Tab>
            </Tabs>
        </>);
    }
}

export default CalculadoraTab;