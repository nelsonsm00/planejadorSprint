import Cache from "../Cache/Cache";
import MascaraNumerica from "../MascaraNumerica";

/* CLASSE RESPONSAVEL POR REALIZAR O CALCULO DAS HORAS
 */
const TEMPO_COMPILACAO = 1;
const TEMPO_DOCUMENTACAO = 18;
const TEMPO_REBASE = 2;
const TEMPO_PILOTO = 24;
const TEMPO_DEPLOY = 8;
const TEMPO_TESTE = 0.4;
const CAPACIDADE = 64;

class Calculadora {   

    //TESTE É 40% DO TEMPO DE DESENVOLVIMENTO
    static calculaTempoTeste(tempoDesenvolvimento) {
        return (tempoDesenvolvimento * Calculadora.getTempoTeste());
    }

    //O TOTAL DO DESENVOLVIMENTO É D + C + t
    static calculaTempoTotalDevTeste(tempoDesenvolvimento, tempoTeste, utilizaTempoCompilacao) {
        var tempoCompilacao = utilizaTempoCompilacao ? Calculadora.getTempoCompilacao() : 0;        
        return tempoDesenvolvimento + tempoCompilacao + tempoTeste;
    }

    static calculaTempoTotalPacote(utilizaTempoDocumentacao, utilizaTempoCompilacao) {
        var tempoCompilacao = utilizaTempoCompilacao ? Calculadora.getTempoCompilacao() : 0; 
        var tempoDocumentacao = utilizaTempoDocumentacao ? Calculadora.getTempoDocumentacao() : 0; 
        return tempoDocumentacao + Calculadora.getTempoRebase() + tempoCompilacao;
    }

    static calculaTempoValidacao(utilizaTempoPiloto) {
        var tempoPiloto = utilizaTempoPiloto ? Calculadora.getTempoPiloto() : 0;
        return tempoPiloto + Calculadora.getTempoDeploy();
    }

    static getTempoTeste() {
        var t = Cache.tempoTeste.get;
        if (t == undefined || !MascaraNumerica.isNumeric(t))
            return TEMPO_TESTE;
        else
            return parseFloat(t);
    }

    static getTempoDocumentacao() {
        var t = Cache.tempoDocumentacao.get;
        if (t == undefined || !MascaraNumerica.isNumeric(t))
            return TEMPO_DOCUMENTACAO;
        else
            return parseFloat(t);
    }
    
    static getTempoRebase() {
        var t = Cache.tempoRebase.get;
        if (t == undefined || !MascaraNumerica.isNumeric(t))
            return TEMPO_REBASE;
        else
            return parseFloat(t);
    }

    static getTempoPiloto() {
        var t = Cache.tempoPiloto.get;
        if (t == undefined || !MascaraNumerica.isNumeric(t))
            return TEMPO_PILOTO;
        else
            return parseFloat(t);
    }

    static getTempoDeploy() {
        var t = Cache.tempoDeploy.get;
        if (t == undefined || !MascaraNumerica.isNumeric(t))
            return TEMPO_DEPLOY;
        else
            return parseFloat(t);
    }  

    static getTempoCompilacao() {
        var t = Cache.tempoCompilacao.get;
        if (t == undefined || !MascaraNumerica.isNumeric(t))
            return TEMPO_COMPILACAO;
        else
            return parseFloat(t);
    }  

    static getCapacidade() {
        var t = Cache.capacidade.get;
        if (t == undefined || !MascaraNumerica.isNumeric(t))
            return CAPACIDADE;
        else
            return parseFloat(t);
    }  

    static getTempoDesenvolvimento() {
        var capacidade = Calculadora.getCapacidade();
        var teste = Calculadora.getTempoTeste();
        var compilacao = Calculadora.getTempoCompilacao();
        return ((capacidade - compilacao) / (1 + teste));
    }
}

export default Calculadora;
