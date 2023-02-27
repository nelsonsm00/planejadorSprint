/* IMPOR REACT */
import { Col, Row, Container } from "react-bootstrap";

/* IMPORT COMPONENTE */
import Componente from "../Arquitetura/Componente";
import Titulo from "../UI/Titulo";
import Table from "../UI/Table";

/* IMPORT GERAL */
import Cache from "../../Geral/Cache/Cache";
import Coluna from "../../Geral/Coluna/Coluna";
import ComponenteEnum from "../../Geral/Enum/ComponenteEnum";
import RodapeButton from "../RodapeButton";

class SquadForm extends Componente {
    constructor(props) {
        super(props);
        this.state.dados = Cache.squads.get;
        if (this.state.dados == null || this.state.dados == undefined)
            this.state.dados = [];        
        this.state.dados.map((d) => {d.excluir = false;});        

        this.salvar = this.salvar.bind(this);
        this.incluir = this.incluir.bind(this);
        this.setDados = this.setDados.bind(this);

        this.colunas = [new Coluna("Squad", "squad", 50, ComponenteEnum.Input, this.setDados, null), 
                        new Coluna("Utiliza subtask", "subtask", 20, ComponenteEnum.CheckBox, this.setDados, 2), 
                        new Coluna("Squad atual", "selecionar", 20, ComponenteEnum.Radio, this.setDados, 2),
                        new Coluna(null, "excluir", 10, ComponenteEnum.ButtonAddDelete, {add: this.incluir, delete: this.setDados})];
    }

    setDados(valor, parametros) {
        var index = parametros.index;
        var propriedade = parametros.propriedade;
        var dados = [];
        Object.assign(dados, this.state.dados);

        if (propriedade == "subtask" || propriedade == "excluir") {
            dados[index][propriedade] = !dados[index][propriedade];
        }
        else if (propriedade == "selecionar") {
            dados.map((d) => {d.selecionar = false});
            dados[index].selecionar = true;
        }
        else {
            dados[index][propriedade] = valor;
        }        
        this.setState({dados: dados});
    }

    salvar() {
        var dados = [];
        Object.assign(dados, this.state.dados);
        dados = dados.filter((d) => !d.excluir);
        dados.sort(function(a, b) {
            if (a.squad > b.squad) {
                return 1;
              }
              if (a.squad < b.squad) {
                return -1;
              }
              return 0;
         });

        var indexSelecionado = -1;
        for(var i = 0; i < dados.length; i++) {
            if (dados[i].selecionar) {
                indexSelecionado = i;
                break;
            }
        }
        if (indexSelecionado == -1 && dados.length > 0) {
            dados[0].selecionar = true;
            indexSelecionado = 0;
        }

        Cache.squads.set(dados);
        Cache.idSquadSelecionada.set(indexSelecionado);
        document.location.href = document.location.pathname;
    }

    incluir() {
        var dados = [];
        Object.assign(dados, this.state.dados);
        dados.push({squad: "", subtask: false, selecionar: false, excluir: false, equipe: [], tempo: {}, alocacao: null, demandas: []});
        this.setState({dados: dados});
    }

    /* RENDER */
    render() {
        return( <>
            <Container className="fullScreen">
                <Row>
                    <Titulo titulo="Gerenciamento das squads"/>  
                </Row>
                <Row>
                    <Col sm={12}>
                        <Table id="squads" dados={this.state.dados} colunas={this.colunas} filtraExcluido={{filtra: true, chave: "excluir"}}/>
                    </Col> 
                </Row>      
                <hr />           
                <Row className="ultimaLinha">
                    <Col sm={12}>
                        <RodapeButton funcaoSalvar={this.salvar} funcaoVoltar={this.props.funcaoVoltar} />
                        <br/>
                    </Col>        
                </Row>
            </Container>
        </>
        );
    }
}

export default SquadForm; 