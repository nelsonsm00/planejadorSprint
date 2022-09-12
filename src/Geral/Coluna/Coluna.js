class Coluna {
    constructor(texto = "", 
                chave = "", 
                largura = 0,
                colunaBotao = false) {
        this.texto = texto;
        this.chave = chave;
        this.largura = largura;
        this.colunaBotao = colunaBotao;
    }
}

export default Coluna;