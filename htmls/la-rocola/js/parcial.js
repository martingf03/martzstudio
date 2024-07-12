'use strict';

// Discos:
let discos = [];
let contador = 0;

// Función Cargar:
const cargar = function () {

    let nombreDisco;
    do {
        nombreDisco = prompt("Ingrese el nombre del disco");
        if (validarCancelacion(nombreDisco)) {
            return;
        }
    } while (!validarTexto(nombreDisco));


    let autorDisco;
    do {
        autorDisco = prompt("Ingrese el autor del disco");
        if (validarCancelacion(autorDisco)) {
            return;
        }
    } while (!validarTexto(autorDisco));

    let codigoDisco
    do {
        codigoDisco = parseInt(prompt("Ingrese el código del disco"));
        if (validarCancelacion(codigoDisco)) {
            return;
        }
    } while (!validarCodigoDisco(codigoDisco) || !validarCodigoUnico(discos, parseInt(codigoDisco)));

    let disco = new Disco(nombreDisco, autorDisco, codigoDisco);

    console.info(`El disco ingresado es ${disco.getNombreDisco}, del autor ${disco.getAutorDisco} con código ${disco.getCodigoDisco}.`);


    do {
        let nombrePista;
        do {
            nombrePista = prompt("Ingrese el nombre de la pista");
            if (validarCancelacion(nombrePista)) {
                return;
            }
        } while (!validarTexto(nombrePista));

        let duracionPista;
        do {
            duracionPista = parseInt(prompt("Ingrese la duración de la pista"));
            if (validarCancelacion(duracionPista)) {
                return;
            }
        } while (!validarNumeroPista(duracionPista));

        let pista = new Pista(nombrePista, duracionPista);

        console.info(`La pista ingresada es ${pista.getNombrePista} y su duración es de ${pista.getDuracionPista} segundos.`);

        disco.getPistas.push(pista);

    } while (confirm("¿Desea ingresar otra pista?"));

    alert("¡Disco cargado con éxito!")
    console.info(`Al disco ${disco.getNombreDisco} se le agregaron ${disco.getPistas.length} pistas.`);

    discos.push(disco);
    contador++;
};

// Función Mostrar: 

const mostrar = function () {

    let html = crearVistaDiscos(discos);

    document.getElementById('info').innerHTML = html;
};

let crearVistaDiscos = function (discos) {
    if (contador === 0) {
        let p = `<p><strong>¡Ups!</strong></p>`;
        p += `<p>Aún no hay discos cargados para mostrar...</p>`;
        return p;
    } else {
        let p = `<div class="info-web">`;
    p+= `<p>La página lleva ${contador} disco/s cargado/s.</p>`;
    let discoMax = calcularDiscoMaxDuracion(discos);
    p += `<p>El disco con la mayor duración total es <strong>${discoMax.getNombreDisco}</strong>.</p>`;
    p += `</div>`;
    for (let disco of discos) {
        p += mostrarDisco(disco);
    }
    
    return p;
    }
    
}

let mostrarDisco = function (disco) {
    let p = "";
    let duracionTotalDisco = disco.calcularDuracionTotal();
    
    p += `<h3>Información del disco</h3>`
    p += `<ul>`
    p += `<li>Nombre del disco: <strong>${disco.getNombreDisco}</strong></li>`
    p += `<li>Autor: <strong>${disco.getAutorDisco}</strong></li>`
    p += `<li>Código del disco: <strong>${disco.getCodigoDisco}</strong></li>`
    p += `</ul>`

    p += `<p>El disco <strong>${disco.getNombreDisco}</strong> tiene <strong>${disco.getPistas.length} pistas</strong>.</p>`
    p += "<p>Las pistas son:</p>"
    p += `<ul>`
    for (let pista of disco.getPistas) {
        p += `<li>Nombre: <strong>${pista.getNombrePista}</strong>`;
        if (pista.getDuracionPista > 180) {
            p += ` - Duración: <strong class="rojo">${pista.getDuracionPista}</strong> segundos.</li>`
        } else {
            p += ` - Duración: <strong>${pista.getDuracionPista}</strong> segundos.</li>`
        }
    }
    p += `</ul>`
    p += `<p>La duración total del disco es de <strong>${duracionTotalDisco}</strong> segundos.</p>`

    let maxDuracion = Math.max(...disco.getPistas.map(pista => pista.getDuracionPista));
    let pistaConMaxDuracion = disco.getPistas.find(pista => pista.getDuracionPista === maxDuracion);

    p += `<p>La pista con mayor duración es <strong>${pistaConMaxDuracion.getNombrePista}</strong>, con una duración de <strong>${pistaConMaxDuracion.getDuracionPista}</strong> segundos.</p>`

    let promedio = calcularPromedio(duracionTotalDisco, disco.getPistas.length);

    p += `<p class="ultimo-p">La duración promedio del disco es de <strong>${promedio}</strong> segundos.</p>`

    console.info(`Se mostró en pantalla el disco: ${disco.getNombreDisco}.`);

    return p;
}

//Función Buscar:

const consultar = function () {
    let consultarCodigo;
    do {
        consultarCodigo = prompt("Ingrese el código numerico del disco.");
        if (validarCancelacion(consultarCodigo)) {
            return;
        }
    } while (!validarCodigoDisco(consultarCodigo));

    let discoEncontrado = null;
    for (let disco of discos) {
        if (parseInt(consultarCodigo) === disco.getCodigoDisco) {
            console.info(`Se encontró el disco: ${disco.getNombreDisco}.`);
            alert(`Se encontró el siguiente disco: ${disco.getNombreDisco}.`);
            discoEncontrado = disco;
        }
    }

    if (discoEncontrado != null) {
        let html = mostrarDisco(discoEncontrado);
        document.getElementById('info').innerHTML = html;
    } else {
        console.warn(`No se encontró ningún disco con el código que ingresó el usuario.`);
        alert(`No existe disco cargado con el código ${consultarCodigo}.`);
    }
}
