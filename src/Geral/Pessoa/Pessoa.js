const CAPACIDADE = 64;

class Pessoa {
    constructor(nome, usuario) {
        this.nome = nome;
        this.usuario = usuario;
        this.horasAlocadas = 0;
    }

    getJson() {
        return {nome: this.nome, usuario: this.usuario, horasAlocadas: this.horasAlocadas, saldo: this.getSaldo()};
    }

    getSaldo() {
        return CAPACIDADE - this.horasAlocadas;
    }

    alocaHora(hora) {
        this.horasAlocadas += hora;
    }

    desalocaHora(hora) {
        this.horasAlocadas -= hora;
    }
}

export default Pessoa;