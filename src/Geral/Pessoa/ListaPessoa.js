import Pessoa from "./Pessoa";

const CAPACIDADE = 64;

class ListaPessoa {
    constructor(json = null) {
        this.pessoas = [];
        if (json != null) {
            if (json.hasOwnProperty("pessoas"))
                json.pessoas.map((p) => this.add(p.nome, p.usuario, p.horasAlocadas));
            else
                json.map((p) => this.add(p.nome, p.usuario, p.horasAlocadas));
        }            
    }   

    addPessoa(pessoa) {
        if (this.pessoas.length == 0 || this.pessoas.find((p) => (p.usuario == pessoa.usuario)) == undefined)
            this.pessoas.push(pessoa);
    }

    add(nome, usuario, horas = 0) {
        var pessoa = new Pessoa(nome, usuario, horas);
        this.addPessoa(pessoa);
    }

    getJson() {
        var result = [];
        this.pessoas.map((p) => (result.push(p.getJson())));
        return result;
    }

    alocaHoras(usuario, horas) {
        var pessoa = this.pessoas.find((p) => (p.usuario == usuario));
        pessoa.alocaHora(horas);
    }

    desalocaHoras(usuario, horas) {
        var pessoa = this.pessoas.find((p) => (p.usuario == usuario));
        pessoa.desalocaHora(horas);
    }

    getNome(usuario) {
        var pessoa = this.pessoas.find((p) => (p.usuario == usuario));
        if (pessoa == undefined || pessoa == null)
            return null;
        else
            return pessoa.nome;
    }
}

export default ListaPessoa;