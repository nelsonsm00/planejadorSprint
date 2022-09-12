/* CLASSE RESPONSAVEL POR REALIZAR AS MASCARAS E CONVERSOES DOS NUMEROS
 */

class MascaraNumerica {

    static replaceDotCommon(value) {
        return value.replaceAll(".", ",");
    }

    static replaceDotEmpty(value) {
        return value.replaceAll(".", "");
    }

    static replaceCommonDot(value) {
        return value.replaceAll(",", ".");
    }

    static isNumeric(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    static numericToStr(value, substituiSeparadores = false, decimal = 2) {
        if (this.isNumeric(value)) {
            value = parseFloat(value).toFixed(decimal);
        } else {
            value = value;
        }

        value = value + "";

        if (substituiSeparadores) {
            value = this.replaceDotCommon(value);
        }
        return value;
    }

    static maskCoin(value = "", decimal = 2, permiteNegativo = false) {
        if (this.isNumeric(value)) {
            value = this.numericToStr(value, true, decimal);
        }

        try {
            var a = value.charAt(0);
        } catch {
            value = "";
        }

        var negativo = "";
        if (permiteNegativo && value.charAt(0) == "-") {
            negativo = "-";
        }

        var separadorMilesimo = ".";
        var separadorDecimal = ",";
        var i = 0;

        var j = 0;
        var len = 0;

        var len2 = 0;
        var strCheck = "0123456789";
        var aux = "";
        var aux2 = "";

        len = value.length;

        for (i = 0; i < len; i++) {
            if (value.charAt(i) != "0" && value.charAt(i) != separadorDecimal)
                break;
        }
        for (; i < len; i++) {
            if (strCheck.indexOf(value.charAt(i)) != -1) aux += value.charAt(i);
        }

        len = aux.length;
        if (decimal == 0) return aux;
        if (len == 0) value = "0" + separadorDecimal + "00";
        if (len == 1) value = "0" + separadorDecimal + "0" + aux;
        if (len == 2) value = "0" + separadorDecimal + aux;
        if (len > 2) {
            aux2 = "";
            for (j = 0, i = len - decimal - 1; i >= 0; i--) {
                if (j == 3) {
                    aux2 += separadorMilesimo;
                    j = 0;
                }
                aux2 += aux.charAt(i);
                j++;
            }
            value = "";
            len2 = aux2.length;
            for (i = len2 - 1; i >= 0; i--) value += aux2.charAt(i);
            value += separadorDecimal + aux.substr(len - decimal, len);
        }
        if (len <= decimal) {
            value = aux;
            while (len < decimal) {
                value = "0" + value;
                len = value.length;
            }
            value = "0" + separadorDecimal + value;
        }

        if (permiteNegativo && value == "0,00") {
            negativo = "";
        }

        return negativo + value;
    }

    static converteFloat(value) {
        var valueAux = MascaraNumerica.numericToStr(value);
        valueAux = MascaraNumerica.replaceDotEmpty(valueAux);
        valueAux = MascaraNumerica.replaceCommonDot(valueAux);
        if (MascaraNumerica.isNumeric(valueAux)) {
            return parseFloat(valueAux);
        } else {
            return 0;
        }
    }

    static converteInt(value) {
        var valueAux = MascaraNumerica.numericToStr(value);
        valueAux = MascaraNumerica.replaceDotEmpty(valueAux);
        if (MascaraNumerica.isNumeric(valueAux)) {
            return parseInt(valueAux);
        } else {
            return 0;
        }
    }
}

export default MascaraNumerica;
