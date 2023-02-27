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

class EquipeForm extends Componente {
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
        this.state.dados = squads[this.idSquadSelecionada].equipe;
        if (this.state.dados == null || this.state.dados == undefined)
            this.state.dados = [];
        this.state.dados.map((d) => {d.excluir = false;});

        this.salvar = this.salvar.bind(this);
        this.incluir = this.incluir.bind(this);
        this.setDados = this.setDados.bind(this);

        this.colunas = [new Coluna("Usuário", "usuario", 25, ComponenteEnum.Input, this.setDados, null), 
                        new Coluna("Nome", "nome", 25, ComponenteEnum.Input, this.setDados, null), 
                        new Coluna("Desenv.", "desenvolvimento", 10, ComponenteEnum.CheckBox, this.setDados, 1),
                        new Coluna("Teste", "teste", 10, ComponenteEnum.CheckBox, this.setDados, 1),
                        new Coluna("Documentação", "documentacao", 10, ComponenteEnum.CheckBox, this.setDados, 1),
                        new Coluna("Piloto", "piloto", 10, ComponenteEnum.CheckBox, this.setDados, 1),
                        new Coluna(null, "excluir", 10, ComponenteEnum.ButtonAddDelete, {add: this.incluir, delete: this.setDados})];
    }

    setDados(valor, parametros) {
        var index = parametros.index;
        var propriedade = parametros.propriedade;
        var dados = [];
        Object.assign(dados, this.state.dados);

        if (propriedade == "usuario" || propriedade == "nome") {
            dados[index][propriedade] = valor;            
        }
        else {
            dados[index][propriedade] = !dados[index][propriedade];
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

        var squads = Cache.squads.get;
        squads[this.idSquadSelecionada].equipe = dados;
        Cache.squads.set(squads);
        document.location.href = document.location.pathname;
    }

    incluir() {
        var dados = [];
        Object.assign(dados, this.state.dados);
        dados.push({usuario: "", nome: "", desenvolvimento: true, teste: true, documentacao: true, piloto: true, excluir: false});
        this.setState({dados: dados});        
    }

    /* RENDER */
    render() {
        return( <>
            <Container className="fullScreen">
                <Row>
                    <Titulo titulo={"Gerenciamento da equipe | " + this.nomeSquad} />  
                </Row>
                <Row>
                    <Col sm={12}>
                        <Table id="equipe" dados={this.state.dados} colunas={this.colunas} filtraExcluido={{filtra: true, chave: "excluir"}}/>
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

export default EquipeForm; 