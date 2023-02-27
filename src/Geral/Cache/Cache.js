class Cache {

    static idSquadSelecionada = {
        set: (value) => {
            localStorage.setItem("idSquadSelecionada", value);
        },
        get: localStorage.getItem("idSquadSelecionada")
    };

    static squads = {
        set: (value) => {
            localStorage.setItem("squads", JSON.stringify(value));
        },
        get: JSON.parse(localStorage.getItem("squads"))
    };

    static equipe = {
        set: (value) => {
            localStorage.setItem("equipe", JSON.stringify(value));
        },
        get: JSON.parse(localStorage.getItem("equipe"))
    };

    static tempoTeste = {
        set: (value) => {
            localStorage.setItem("tempoTeste", value);
        },
        get: localStorage.getItem("tempoTeste")
    };

    static tempoCompilacao = {
        set: (value) => {
            localStorage.setItem("tempoCompilacao", value);
        },
        get: localStorage.getItem("tempoCompilacao")
    };

    static tempoCompilacao = {
        set: (value) => {
            localStorage.setItem("tempoCompilacao", value);
        },
        get: localStorage.getItem("tempoCompilacao")
    };

    static tempoDocumentacao = {
        set: (value) => {
            localStorage.setItem("tempoDocumentacao", value);
        },
        get: localStorage.getItem("tempoDocumentacao")
    };

    static tempoRebase = {
        set: (value) => {
            localStorage.setItem("tempoRebase", value);
        },
        get: localStorage.getItem("tempoRebase")
    };

    static tempoPiloto = {
        set: (value) => {
            localStorage.setItem("tempoPiloto", value);
        },
        get: localStorage.getItem("tempoPiloto")
    };

    static tempoDeploy = {
        set: (value) => {
            localStorage.setItem("tempoDeploy", value);
        },
        get: localStorage.getItem("tempoDeploy")
    };

    static capacidade = {
        set: (value) => {
            localStorage.setItem("capacidade", value);
        },
        get: localStorage.getItem("capacidade")
    };

    static reseta() {
        localStorage.setItem("equipe", null);
    }
}

export default Cache;