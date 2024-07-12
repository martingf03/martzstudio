class Disco {

    nombreDisco;
    autorDisco;
    codigoDisco;
    pistas = [];

    constructor(nombreDisco = "Disco sin nombrar", autorDisco = "Autor sin nombrar", codigoDisco = "Sin codigo") {
        this.nombreDisco = nombreDisco;
        this.autorDisco = autorDisco;
        this.codigoDisco = codigoDisco;
    }
    
    calcularDuracionTotal() {
        let duracionTotalDisco = 0;
        for (let pista of this.pistas) {
            duracionTotalDisco += parseInt(pista.getDuracionPista);
        }
        return duracionTotalDisco;
    }

    get getNombreDisco() {
        return this.nombreDisco;
    }

    get getAutorDisco() {
        return this.autorDisco;
    }

    get getCodigoDisco() {
        return this.codigoDisco;
    }

    get getPistas() {
        return this.pistas;
    }

    set setNombreDisco(nombreDisco) {
        this.nombreDisco = nombreDisco;
    }

    set setAutorDisco(autorDisco) {
        this.autorDisco = autorDisco;
    }

    set setCodigoDisco(codigoDisco) {
        this.codigoDisco = codigoDisco;
    }

    set setPistas(pistas) {
        this.pistas = pistas;
    }
}

class Pista {

    nombrePista;
    duracionPista;

    constructor(nombrePista = "Pista sin nombrar", duracionPista = "Sin duración") {
        this.nombrePista = nombrePista;
        this.duracionPista = duracionPista;
    }

    get getNombrePista() {
        return this.nombrePista;
    }

    get getDuracionPista() {
        return this.duracionPista;
    }

    set setNombrePista(nombrePista) {
        this.nombrePista = nombrePista;
    }

    set setDuracionPista(duracionPista) {
        this.duracionPista = duracionPista;
    }
}

let validarCancelacion = function (valor) {
    if (valor === null) {
        console.warn("El usuario canceló el proceso.");
        return true;
    }
    return false;
}

let validarTexto = function (valor) {
    if (valor === "") {
        alert("No se puede avanzar con el campo vacío.");
        console.error("El usuario quiso avanzar sin llenar el campo");
        return false;
    } else if (!isNaN(valor)) {
        alert("El valor no puede ser un número.");
        console.error("El usuario ingresó un número y debe ser un texto");
        return false;
    } else {
        return true;
    }
}

let validarCodigoDisco = function (valor) {
    if (valor === "") {
        alert("No se puede avanzar con el campo vacío.");
        console.error("El usuario quiso avanzar sin llenar el campo");
        return false;
    } else if (isNaN(valor)) {
        alert("El valor no puede ser un texto.");
        console.error("El usuario ingresó un texto y debe ser un número");
        return false;
    } else if (valor < 1 || valor > 999) {
        alert("El código debe ser un número entre 1 y 999");
        console.error("El usuario ingresó un número que no está entre 1 y 999");
        return false;
    } else {
        return true;
    }
}

let validarNumeroPista = function (valor) {
    if (valor === "") {
        alert("No se puede avanzar con el campo vacío.");
        console.error("El usuario quiso avanzar sin llenar el campo");
        return false;
    } else if (isNaN(valor)) {
        alert("El valor no puede ser un texto.");
        console.error("El usuario ingresó un texto y debe ser un número");
        return false;
    } else if (valor < 0 || valor > 7200) {
        alert("La duración de la pista debe ser entre 0 y 7200 segundos.");
        console.error("El usuario ingresó un número que no está entre 0 y 7200");
        return false;
    } else {
        return true;
    }
}

let calcularPromedio = function (sumaTotal, cantidad) {
    let promedio = parseInt(sumaTotal / cantidad);
    return promedio;
}

let validarCodigoUnico = function (discos, codigoNuevo) {
    for (let disco of discos) {
        if (codigoNuevo === disco.getCodigoDisco) {
            alert(`El código ${disco.getCodigoDisco} ingresado ya existe.`);
            console.error(`El usuario ingresó un número de código ya utilizado en el disco ${disco.getNombreDisco}`);
            return false;
        }
    }
    return true;
}


let calcularDiscoMaxDuracion = function (discos) {
    //genero array de duraciones totales de todos los discos
    let arrayDuracionesTotales = discos.map(disco => disco.calcularDuracionTotal());
    //calculo cual es la mayor duracion 
    let duracionMaximaDisco = Math.max(...arrayDuracionesTotales);
    //comparo mayor duracion con duraciones totales de discos, para encontrar el disco
    let discoConMaxDuracion = discos.find(disco => disco.calcularDuracionTotal() === duracionMaximaDisco);
    //devuelvo el disco correspondiente
    return discoConMaxDuracion;
}
