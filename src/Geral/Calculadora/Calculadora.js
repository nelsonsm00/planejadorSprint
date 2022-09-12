/* CLASSE RESPONSAVEL POR REALIZAR O CALCULO DAS HORAS
 */
const TEMPO_COMPILACAO = 1;
const TEMPO_DOCUMENTACAO = 18;
const TEMPO_REBASE = 2;
const TEMPO_PILOTO = 24;
const TEMPO_DEPLOY = 8;

class Calculadora {   

    //TESTE É 40% DO TEMPO DE DESENVOLVIMENTO
    static calculaTempoTeste(tempoDesenvolvimento) {
        //tempoDesenvolvimento = MascaraNumerica.converteFloat(tempoDesenvolvimento);
        return tempoDesenvolvimento * 0.4;
    }

    //O TOTAL DO DESENVOLVIMENTO É D + C + t
    static calculaTempoTotalDevTeste(tempoDesenvolvimento, tempoTeste, utilizaTempoCompilacao) {
        var tempoCompilacao = utilizaTempoCompilacao ? TEMPO_COMPILACAO : 0;        
        return tempoDesenvolvimento + tempoCompilacao + tempoTeste;
    }

    static calculaTempoTotalPacote(utilizaTempoDocumentacao, utilizaTempoCompilacao) {
        var tempoCompilacao = utilizaTempoCompilacao ? TEMPO_COMPILACAO : 0; 
        var tempoDocumentacao = utilizaTempoDocumentacao ? TEMPO_DOCUMENTACAO : 0; 
        return tempoDocumentacao + TEMPO_REBASE + tempoCompilacao;
    }

    static calculaTempoValidacao(utilizaTempoPiloto) {
        var tempoPiloto = utilizaTempoPiloto ? TEMPO_PILOTO : 0;
        return tempoPiloto + TEMPO_DEPLOY;
    }

    static getTempoDocumentacao() {
        return TEMPO_DOCUMENTACAO;
    }
    
    static getTempoRebase() {
        return TEMPO_REBASE;
    }

    static getTempoPiloto() {
        return TEMPO_PILOTO;
    }

    static getTempoDeploy() {
        return TEMPO_DEPLOY;
    }    
}

export default Calculadora;
