/* IMPORT REACT */
import { Col, Row,  Container } from "react-bootstrap";

/* IMPORT COMPONENTE */
import ButtonAux from "./UI/Button/ButtonAux";
import CalculadoraTab from "./CalculadoraTab";
import Componente from "./Arquitetura/Componente";
import EquipeModal from "./Equipe/EquipeModal";
import ImpressaoModal from "./ImpressaoModal";
import SquadModal from "./Squad/SquadModal";
import Table from "./UI/Table";
import TempoModal from "./Tempo/TempoModal";
import CalculadoraDemandaPaiModal from "./Calculadora/CalculadoraDemandaPaiModal";

/* IMPORT GERAL */
import Calculadora from "../Geral/Calculadora/Calculadora";
import Coluna from "../Geral/Coluna/Coluna";
import ListaPessoa from "../Geral/Pessoa/ListaPessoa";
import PlanejamentoCapacidade from "../Geral/Relatorio/PlanejamentoCapacidade";
import TipoDemanda from "../Geral/TipoDemanda/TipoDemanda";
import TipoDemandaPaiEnum from "../Geral/Enum/TipoDemandaPaiEnum";
import ComponenteEnum from "../Geral/Enum/ComponenteEnum";
import Cache from "../Geral/Cache/Cache";

/* PROPRIEDADES */
const P_DEMANDA_PAI = "demandaPai";
const P_DEMANDA = "demanda";
const P_RESPONSAVEL = "responsavel";
const P_TEMPO = "tempo";
const P_TIPO = "tipo";
const P_ESPECIE = "especie";
const P_TEMPO_TOTAL = "tempoTtoal";

class CalculadoraForm extends Componente {
    constructor(props) {
        super(props);       
        this.colunas = [new Coluna("Responsável", "nome", 50), 
                        new Coluna("Horas alocadas", "horasAlocadas", 40), 
                        new Coluna("Saldo", "saldo", 10)];  
        
        
        var squads = Cache.squads.get;
        var semSquads = squads == null || squads == undefined || squads.length == 0

        if (!semSquads && squads[this.idSquadSelecionada].alocacao != null) {
            this.state.registro = new ListaPessoa(squads[this.idSquadSelecionada].alocacao);
        }
        else {
            this.state.registro = new ListaPessoa();
        }    
        
        if (!semSquads && squads[this.idSquadSelecionada].demandas.length) {
            this.state.dados = squads[this.idSquadSelecionada].demandas;
        }
        else {
            this.state.dados = [];
        } 

        this.state.showModal = false;
        this.state.showImpressao = false;
        this.state.showSquad = false;
        this.state.modalEdicao = false;
        this.state.indexEdicao = -1;
        this.state.nomeSprint = "";
        this.adiciona = this.adiciona.bind(this);
        this.deleta = this.deleta.bind(this);
        this.edita = this.edita.bind(this);
        this.verificaSaldo = this.verificaSaldo.bind(this);
        this.abreConfiguracaoEquipe = this.abreConfiguracaoEquipe.bind(this);
        this.fechaConfiguracaoEquipe = this.fechaConfiguracaoEquipe.bind(this);
        this.abreConfiguracaoTempo = this.abreConfiguracaoTempo.bind(this);
        this.fechaConfiguracaoTempo = this.fechaConfiguracaoTempo.bind(this);
        this.abreImpressao = this.abreImpressao.bind(this);
        this.fechaImpressao = this.fechaImpressao.bind(this);
        this.abreConfiguracaoSquads = this.abreConfiguracaoSquads.bind(this);
        this.fechaConfiguracaoSquads = this.fechaConfiguracaoSquads.bind(this);
        this.imprime = this.imprime.bind(this);
        this.setNomeSprint = this.setNomeSprint.bind(this);
        this.limpaDemandas = this.limpaDemandas.bind(this);
        this.exibeModalEdicao = this.exibeModalEdicao.bind(this);

        if (this.squadUsaSubtask) {
            this.colunasDemanda = [ new Coluna("Demanda Pai", P_DEMANDA_PAI, 10),
                                    new Coluna("Demanda", P_DEMANDA, 10), 
                                    new Coluna("Tipo", P_TIPO, 10, ComponenteEnum.Texto, {}, {}, TipoDemanda.getTipos(true), "id;tipo"),
                                    new Coluna("Tempo", P_TEMPO, 10), 
                                    new Coluna("Responsável", P_RESPONSAVEL, 20, ComponenteEnum.Texto, {}, {}, this.equipe, "usuario;nome"),
                                    new Coluna(null, null, 10, ComponenteEnum.ButtonEditDelete, {delete: this.deleta, edit: this.exibeModalEdicao, validaDelete: {chave: P_DEMANDA_PAI, valor: "-"}, validaEdicao: {chave: P_ESPECIE, valor: TipoDemandaPaiEnum.DevTeste}})];
        }
        else {
            this.colunasDemanda = [ new Coluna("Demanda", P_DEMANDA, 10), 
                                    new Coluna("Tempo desenv.", "tempoDesenvolvimento", 10), 
                                    new Coluna("Responsável desenv.", "nomeDesenvolvimento", 20),
                                    new Coluna("Tempo teste/doc/val", "tempoTeste", 15),
                                    new Coluna("Respons. teste/doc/val", "nomeTeste", 15),
                                    new Coluna("Total", P_TEMPO_TOTAL, 10),
                                    new Coluna(null, null, 10)];
        }
    }

    exibeModalEdicao(index) {        
        var d = this.state.dados[index.index];
        if (d[P_ESPECIE] == TipoDemandaPaiEnum.DevTeste) {
            var registroEdicao = {demanda: d[P_DEMANDA], responsavel: d[P_RESPONSAVEL], subtask: []};
            var subtask = this.state.dados.filter((_d) => {return _d[P_DEMANDA_PAI] == d[P_DEMANDA]});
            if (subtask.length > 0) {
                subtask.forEach(s => {
                    registroEdicao.subtask.push({
                        demanda: s[P_DEMANDA], 
                        tipo: s[P_TIPO], 
                        tempo: s[P_TEMPO],
                        tempoTotal: s[P_TEMPO_TOTAL], 
                        responsavel: s[P_RESPONSAVEL]
                    }); 
                });
            }
            this.registroEdicao = registroEdicao;
            this.setState({showModal: true, modalEdicao: true, indexEdicao: index.index});
        }
    }

    isPacote(registro) {
        return registro.hasOwnProperty("demandaPacote");
    }

    isValidacao(registro) {
        return registro.hasOwnProperty("demandaDeploy");
    }

    isUnitario(registro) {
        return registro.hasOwnProperty("demanda") && registro.hasOwnProperty("responsavel") && !registro.hasOwnProperty("subtask");
    }

    isSubTask(registro) {
        return registro.hasOwnProperty("demanda") && registro.hasOwnProperty("subtask");
    }

    adiciona(registro, _listaPessoa = [], _dados = [], origemEdicao = false) {
        var listaPessoa = [];
        var dados = [];
        if (origemEdicao) {
            listaPessoa = _listaPessoa;
            dados = _dados;
        }
        else {
            listaPessoa = this.state.registro;
            Object.assign(dados, this.state.dados);
        }        
        
        this.setState({registro: new ListaPessoa()});

        var isPacote = this.isPacote(registro);
        var isValidacao = this.isValidacao(registro);
        var isUnitario = this.isUnitario(registro);

        /* ALOCA AS HORAS */
        if (isPacote) {
            if (registro.responsavelRebase != null) {
                listaPessoa.alocaHoras(registro.responsavelRebase, registro.tempoRebase);
                if (this.squadUsaSubtask) {
                    var d = {};
                    d[P_DEMANDA] = registro.demandaPacote;
                    d[P_DEMANDA_PAI] = "-";
                    d[P_TEMPO] = registro.tempoRebase;
                    d[P_RESPONSAVEL] = registro.responsavelRebase;
                    d[P_ESPECIE] = TipoDemandaPaiEnum.Pacote;
                    d[P_TIPO] = TipoDemandaPaiEnum.Pacote;
                    dados.push(d);
                }
            }
            if (registro.responsavelDocumentacao != null) {
                listaPessoa.alocaHoras(registro.responsavelDocumentacao, registro.tempoDocumentacao);
                if (this.squadUsaSubtask) {
                    var d = {};
                    d[P_DEMANDA] = registro.demandaDocumentacao;
                    d[P_DEMANDA_PAI] = registro.demandaPacote;
                    d[P_TEMPO] = registro.tempoDocumentacao;
                    d[P_RESPONSAVEL] = registro.responsavelDocumentacao;
                    d[P_ESPECIE] = TipoDemandaPaiEnum.Documentacao;
                    d[P_TIPO] = TipoDemandaPaiEnum.Documentacao;
                    dados.push(d);
                }
            }
        }            
        else if (isValidacao) {
            if (registro.responsavelDeploy != null) {
                listaPessoa.alocaHoras(registro.responsavelDeploy, registro.tempoDeploy);
                if (this.squadUsaSubtask) {
                    var d = {};
                    d[P_DEMANDA] = registro.demandaDeploy;
                    d[P_DEMANDA_PAI] = "-";
                    d[P_TEMPO] = registro.tempoDeploy;
                    d[P_RESPONSAVEL] = registro.responsavelDeploy;
                    d[P_ESPECIE] = TipoDemandaPaiEnum.Validacao;
                    d[P_TIPO] = TipoDemandaPaiEnum.Validacao;
                    dados.push(d);
                }
            }
            if (registro.responsavelPiloto != null) {
                listaPessoa.alocaHoras(registro.responsavelPiloto, registro.tempoPiloto);
                if (this.squadUsaSubtask) {
                    var d = {};
                    d[P_DEMANDA] = registro.demandaPiloto;
                    d[P_DEMANDA_PAI] = registro.demandaDeploy;
                    d[P_TEMPO] = registro.tempoPiloto;
                    d[P_RESPONSAVEL] = registro.responsavelPiloto;
                    d[P_ESPECIE] = TipoDemandaPaiEnum.Piloto;
                    d[P_TIPO] = TipoDemandaPaiEnum.Piloto;
                    dados.push(d);
                }
            }
        }
        else if (isUnitario) {
            if (registro.responsavel != null) {
                listaPessoa.alocaHoras(registro.responsavel, registro.tempo);
                if (this.squadUsaSubtask) {
                    var d = {};
                    d[P_DEMANDA] = registro.demanda;
                    d[P_DEMANDA_PAI] = "-";
                    d[P_TEMPO] = registro.tempo;
                    d[P_RESPONSAVEL] = registro.responsavel;
                    d[P_ESPECIE] = TipoDemandaPaiEnum.Unitario;
                    d[P_TIPO] = TipoDemandaPaiEnum.Unitario;
                    dados.push(d);
                }
            }
        }
        //Se é Dev Teste e usa subtask
        else if (this.squadUsaSubtask) {
            registro.subtask.forEach(s => {
                if (TipoDemanda.isValido(s.tipo) && s.responsavel != null)
                    listaPessoa.alocaHoras(s.responsavel, s.tempo);
                    var d = {};
                    d[P_DEMANDA] = s.demanda;
                    d[P_DEMANDA_PAI] = registro.demanda;
                    d[P_TEMPO] = s.tempo;
                    d[P_RESPONSAVEL] = s.responsavel;
                    d[P_ESPECIE] = TipoDemandaPaiEnum.DevTeste;
                    d[P_TIPO] = s.tipo;
                    dados.push(d);
                });
            if (registro.responsavel != null) 
                listaPessoa.alocaHoras(registro.responsavel, 0); 
            var d = {};
            d[P_DEMANDA] = registro.demanda;
            d[P_DEMANDA_PAI] = "-";
            d[P_TEMPO] = 0;
            d[P_RESPONSAVEL] = registro.responsavel == null ? "" : registro.responsavel;
            d[P_ESPECIE] = TipoDemandaPaiEnum.DevTeste;
            d[P_TIPO] = TipoDemandaPaiEnum.DevTeste;
            dados.push(d);  
        }
        //Se é Dev Teste e não usa subtask
        else {
            if (registro.responsavelDesenvolvimento != null)
                listaPessoa.alocaHoras(registro.responsavelDesenvolvimento, registro.tempoDesenvolvimento);
            if (registro.responsavelTeste != null)
                listaPessoa.alocaHoras(registro.responsavelTeste, registro.tempoTeste);            
        }
        
        this.setState({registro: listaPessoa, dados: dados});
        var squads = Cache.squads.get;
        squads[this.idSquadSelecionada].demandas = dados;
        squads[this.idSquadSelecionada].alocacao = listaPessoa;
        Cache.squads.set(squads);
    }

    deleta(index, naoAtualiza = false) {
        index = index.index;
        var registro = this.state.dados[index];
        var dados = [];
        Object.assign(dados, this.state.dados);
        var listaPessoa = this.state.registro;
        this.setState({registro: new ListaPessoa()});
        if (this.squadUsaSubtask) {
            if (registro[P_ESPECIE] == TipoDemandaPaiEnum.Pacote || registro[P_ESPECIE] == TipoDemandaPaiEnum.Validacao) {
                for (var i = 0; i < this.state.dados.length; i++) {
                    var d = this.state.dados[i];
                    if (d[P_DEMANDA_PAI] == registro[P_DEMANDA]) {
                        listaPessoa.desalocaHoras(dados[i].responsavel, dados[i].tempo);
                        dados.splice(i, 1);
                        if (i < index) 
                            index--;
                        break;
                    }
                };
                listaPessoa.desalocaHoras(dados[index].responsavel, dados[index].tempo);
                dados.splice(index, 1);
            }
            else if (registro[P_ESPECIE] == TipoDemandaPaiEnum.Unitario) {
                listaPessoa.desalocaHoras(dados[index].responsavel, dados[index].tempo);
                dados.splice(index, 1);                
            }
            else if (registro[P_TIPO] == TipoDemandaPaiEnum.DevTeste) {
                for (var i = 0; i < this.state.dados.length; i++) {
                    var d = this.state.dados[i];
                    if (d[P_DEMANDA_PAI] == registro[P_DEMANDA]) {
                        var j = 0;
                        for (j; i < dados.length; j++) {
                            if (dados[j].demanda == d[P_DEMANDA])
                                break;
                        }
                        listaPessoa.desalocaHoras(dados[j].responsavel, dados[j].tempo);
                        dados.splice(j, 1);
                        if (j < index) 
                            index--;                        
                    }
                }
                listaPessoa.desalocaHoras(dados[index].responsavel, dados[index].tempo);
                dados.splice(index, 1);
            }
        }
        
        if (registro.responsavelDesenvolvimento != null)
            listaPessoa.desalocaHoras(registro.responsavelDesenvolvimento, registro.tempoDesenvolvimento);
        if (registro.responsavelTeste != null)
            listaPessoa.desalocaHoras(registro.responsavelTeste, registro.tempoTeste);

        if (naoAtualiza)
            return {registro: listaPessoa, dados: dados};

        this.setState({registro: listaPessoa, dados: dados});
        var squads = Cache.squads.get;
        squads[this.idSquadSelecionada].demandas = dados;
        squads[this.idSquadSelecionada].alocacao = listaPessoa.getJson();
        Cache.squads.set(squads);
    }
    
    edita(registro) {        
        var _d = this.deleta({index: this.state.indexEdicao}, true);
        this.adiciona(registro, _d.registro, _d.dados, true);
    }
    
    verificaSaldo(index) {
        return this.state.registro.pessoas[index].getSaldo() < 0;
    }

    abreConfiguracaoEquipe() {
        this.setState({showModal: true});
    }

    fechaConfiguracaoEquipe() {
        this.registroEdicao = {};
        this.setState({showModal: false, modalEdicao: false, indexEdicao: -1});
    }

    abreConfiguracaoSquads() {
        this.setState({showSquad: true});
    }

    fechaConfiguracaoSquads() {
        this.setState({showSquad: false});
    }

    abreConfiguracaoTempo() {
        this.setState({showTempo: true});
    }

    fechaConfiguracaoTempo() {
        this.setState({showTempo: false});
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

    limpaDemandas() {
        var squads = Cache.squads.get;
        squads[this.idSquadSelecionada].demandas = [];
        squads[this.idSquadSelecionada].alocacao = null;
        Cache.squads.set(squads);
        document.location.href = document.location.pathname;
    }

    getEstimativaDesenvolvimentoMaior(tempo = 0, t = null, agrupaTipo = true, indexEdicao = -1) {
        var subtask = this.state.dados.filter((d) => {})
        return Calculadora.getEstimativaDesenvolvimentoMaior(this.state.registro.subtask, tempo, t, agrupaTipo, indexEdicao);
    }

    carregaPessoas() {
        var listaPessoa = new ListaPessoa();
        var equipe = this.equipe;
        if (equipe == null || equipe == undefined)
            equipe = [];
        equipe.map((d) => (listaPessoa.add(d.nome, d.usuario)));
        return listaPessoa;
    }

    componentDidMount() {
        if (this.state.registro.pessoas.length == 0)
            this.setState({registro: this.carregaPessoas()});
    }

    renderEdicaoDevTeste() {
        return (<>
            
        </>)
    }

    render() {
        return (<>  
            <TempoModal show={this.state.showTempo} onHide={this.fechaConfiguracaoTempo} />
            <EquipeModal show={this.state.showModal} onHide={this.fechaConfiguracaoEquipe} />  
            <SquadModal show={this.state.showSquad} onHide={this.fechaConfiguracaoSquads} />
            <ImpressaoModal 
                show={this.state.showImpressao} 
                onHide={this.fechaImpressao}
                funcao={this.imprime}
                funcaoSecundaria={this.setNomeSprint}
                valor={this.state.nomeSprint}
            />
            <CalculadoraDemandaPaiModal 
                show={this.state.showModal && this.state.modalEdicao} 
                onHide={this.fechaConfiguracaoEquipe} 
                funcao={this.edita}
                registroEdicao={this.registroEdicao}
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
                                <ButtonAux texto="Configurar squads" valido={true} funcao={this.abreConfiguracaoSquads}/>
                            </center>
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
                                <ButtonAux texto="Configurar tempo" valido={true} funcao={this.abreConfiguracaoTempo}/>
                            </center>
                        </Row>
                        <hr/>
                        <Row>
                            <center>
                                <ButtonAux texto="Limpar demandas" valido={true} funcao={this.limpaDemandas}/>
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