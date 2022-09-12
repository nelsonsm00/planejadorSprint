class Aba {
    constructor(titulo) {
        this.titulo = titulo;
        this.chave = this.getChave();
    }

    getChave() {
        return this.titulo.toLowerCase().normalize("NFD");
    }
}

export default Aba;