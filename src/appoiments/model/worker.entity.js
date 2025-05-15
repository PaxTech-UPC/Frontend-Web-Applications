export class Worker {
    constructor(workerId = 0,
                nombre = "",
                especializacion = "",
                fotoUrl = "",
                id = 0) {
        this.workerId = workerId;
        this.nombre = nombre;
        this.especializacion = especializacion;
        this.fotoUrl = fotoUrl;
        this.id = id;
    }
}