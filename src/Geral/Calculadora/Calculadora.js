import Cache from "../Cache/Cache";
import MascaraNumerica from "../MascaraNumerica";
import TipoDemanda from "../TipoDemanda/TipoDemanda";

/* CLASSE RESPONSAVEL POR REALIZAR O CALCULO DAS HORAS */
const TEMPO_COMPILACAO = 1;
const TEMPO_DOCUMENTACAO = 18;
const TEMPO_REBASE = 2;
const TEMPO_PILOTO = 24;
const TEMPO_DEPLOY = 8;
const TEMPO_TESTE = 0.4;
const CAPACIDADE = 64;

class Calculadora {   

    static getDadosTempoSquad() {
        var idSquadSelecionada = Cache.idSquadSelecionada.get;
        if (idSquadSelecionada == null || idSquadSelecionada == undefined)
            idSquadSelecionada = 0;
        else
            idSquadSelecionada = parseInt(idSquadSelecionada);

        var squads = Cache.squads.get;
        if (squads == null || squads == undefined || squads.length == 0) {
            console.log("SEM SQUADS CADASTRADAS");
            return {};
        }
        
        return squads[idSquadSelecionada].tempo;
    }

    //TESTE É % DO TEMPO DE DESENVOLVIMENTO
    static calculaTempoTeste(tempoDesenvolvimento) {
        return Math.round(tempoDesenvolvimento * Calculadora.getTempoTeste());
    }

    //O TOTAL DO DESENVOLVIMENTO É D + C + t
    static calculaTempoTotalDevTeste(tempoDesenvolvimento, tempoTeste, utilizaTempoCompilacao) {
        var tempoCompilacao = utilizaTempoCompilacao ? Calculadora.getTempoCompilacao() : 0;        
        return Math.round(tempoDesenvolvimento + tempoCompilacao + tempoTeste);
    }

    static calculaTempoTotalPacote(utilizaTempoDocumentacao, utilizaTempoCompilacao) {
        var tempoCompilacao = utilizaTempoCompilacao ? Calculadora.getTempoCompilacao() : 0; 
        var tempoDocumentacao = utilizaTempoDocumentacao ? Calculadora.getTempoDocumentacao() : 0; 
        return Math.round(tempoDocumentacao + Calculadora.getTempoRebase() + tempoCompilacao);
    }

    static calculaTempoValidacao(utilizaTempoPiloto) {
        var tempoPiloto = utilizaTempoPiloto ? Calculadora.getTempoPiloto() : 0;
        return Math.round(tempoPiloto + Calculadora.getTempoDeploy());
    }

    static getTempoTeste() {
        var t = Calculadora.getDadosTempoSquad().tempoTeste;
        if (t == undefined || !MascaraNumerica.isNumeric(t))
            return TEMPO_TESTE;
        else
            return parseFloat(t);
    }

    static getTempoDocumentacao() {
        var t = Calculadora.getDadosTempoSquad().tempoDocumentacao;
        if (t == undefined || !MascaraNumerica.isNumeric(t))
            return TEMPO_DOCUMENTACAO;
        else
            return parseFloat(t);
    }
    
    static getTempoRebase() {
        var t = Calculadora.getDadosTempoSquad().tempoRebase;
        if (t == undefined || !MascaraNumerica.isNumeric(t))
            return TEMPO_REBASE;
        else
            return parseFloat(t);
    }

    static getTempoPiloto() {
        var t = Calculadora.getDadosTempoSquad().tempoPiloto;
        if (t == undefined || !MascaraNumerica.isNumeric(t))
            return TEMPO_PILOTO;
        else
            return parseFloat(t);
    }

    static getTempoDeploy() {
        var t = Calculadora.getDadosTempoSquad().tempoDeploy;
        if (t == undefined || !MascaraNumerica.isNumeric(t))
            return TEMPO_DEPLOY;
        else
            return parseFloat(t);
    }  

    static getTempoCompilacao() {
        var t = Calculadora.getDadosTempoSquad().tempoCompilacao;
        if (t == undefined || !MascaraNumerica.isNumeric(t))
            return TEMPO_COMPILACAO;
        else
            return parseFloat(t);
    }  

    static getCapacidade() {
        var t = Calculadora.getDadosTempoSquad().capacidade;
        if (t == undefined || !MascaraNumerica.isNumeric(t))
            return CAPACIDADE;
        else
            return parseFloat(t);
    }  

    static getTempoDesenvolvimento() {
        var capacidade = Calculadora.getCapacidade();
        var teste = Calculadora.getTempoTeste();
        var compilacao = Calculadora.getTempoCompilacao();
        return Math.round((capacidade - compilacao) / (1 + teste));
    }

    static getEstimativaDesenvolvimentoMaior(subtask, tempo = 0, t = null, agrupaTipo = true, indexEdicao = -1) {
        if (subtask.length > 0) {
            if (agrupaTipo) {
                var maior = 0;
                TipoDemanda.getTipos().forEach(tipo => {
                    if (TipoDemanda.isDesenvolvimento(tipo.id)) {
                        var agrupamento = subtask.filter((s, index) => {return tipo.id == s.tipo && index != indexEdicao});
                        var total = 0;
                        for (var i = 0; i < agrupamento.length; i++) {
                            total += agrupamento[i].tempo;
                        }

                        if (TipoDemanda.isValido(t) && t == tipo.id) {
                            total += tempo;
                        }

                        if (maior < total)
                            maior = total;
                    }
                });
                return maior;
            }
            else {
                var maior = subtask[0];
                for (var i = 0; i < subtask.length; i++) {
                    if (i != indexEdicao && maior < subtask[i].tempo)
                        maior = subtask[i].tempo;
                }
                if (maior < tempo)
                    return tempo;
                else
                    return maior;
            }
        }
        else
            return tempo;
    }
}

export default Calculadora;
