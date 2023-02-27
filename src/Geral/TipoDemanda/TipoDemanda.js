import MascaraNumerica from "../MascaraNumerica";

class TipoDemanda {
    static getTipos(tipoPai = false) {
        var result = [{id: 1, tipo: "Back-end Delphi"},
                {id: 2, tipo: "Back-end Linx DMS"},
                {id: 3, tipo: "Front-end Mobile"},
                {id: 4, tipo: "Front-end Linx DMS"},
                {id: 5, tipo: "Teste"}]
        
        if (tipoPai) {
            result.push({id: 6, tipo: "Historia"});
            result.push({id: 7, tipo: "Pacote"});
            result.push({id: 8, tipo: "Documentação"});
            result.push({id: 9, tipo: "Deploy"});
            result.push({id: 10, tipo: "Piloto"});
            result.push({id: 11, tipo: "Unitário"});
        }
        
        return result;
    }

    static isDesenvolvimento(id) {
        return id != 5 && !(id > 5);
    }

    static isTeste(id) {
        return id == 5;
    }

    static isValido(id) {
        return id != null && MascaraNumerica.isNumeric(id);
    }

    static getTipo(id) {
        return TipoDemanda.getTipos(true)[parseInt(id)].tipo;
    }

    static getChaveSelect() {
        return {value: "id", text: "tipo"};
    }
}

export default TipoDemanda;