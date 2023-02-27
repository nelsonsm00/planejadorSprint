import ComponenteEnum from "../Enum/ComponenteEnum";

class Coluna {
    constructor(texto = "", 
                chave = "", 
                largura = 0,
                componente = ComponenteEnum.Texto,
                funcao = {},
                parametrosTamanho = {},
                subDados = [],
                subChave = "") {
        this.texto = texto;
        this.chave = chave;
        this.largura = largura;
        this.componente = componente;
        this.funcao = funcao;
        this.parametrosTamanho = parametrosTamanho;
        this.subDados = subDados;
        this.subChave = subChave;
    }
}

export default Coluna;