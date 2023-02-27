import Calculadora from "../Calculadora/Calculadora";

class Pessoa {
    constructor(nome, usuario, horas = 0) {
        this.nome = nome;
        this.usuario = usuario;
        this.horasAlocadas = horas;
    }

    getJson() {
        return {nome: this.nome, usuario: this.usuario, horasAlocadas: this.horasAlocadas, saldo: this.getSaldo()};
    }

    getSaldo() {
        return Calculadora.getCapacidade() - this.horasAlocadas;
    }

    alocaHora(hora) {
        this.horasAlocadas += hora;
    }

    desalocaHora(hora) {
        this.horasAlocadas -= hora;
    }

    static getChaveSelect() {
        return {value: "usuario", text: "nome"};
    }
}

export default Pessoa;