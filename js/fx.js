function redireccionar(url) {
    const nuevaVentana = window.open(url, '_blank');
    if (nuevaVentana) {
        nuevaVentana.focus();
    } else {
        alert('Por favor, permite las ventanas emergentes para esta página.');
    }
}

function redireccionarLocal(url) {
    window.location.href = url;
}

function pronto() {
    alert("Próximamente");
}