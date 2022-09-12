class Cache {

    static equipe = {
        set: (value) => {
            localStorage.setItem("equipe", JSON.stringify(value));
        },
        get: JSON.parse(localStorage.getItem("equipe"))
    };

    static reseta() {
        localStorage.setItem("equipe", null);
    }
}

export default Cache;