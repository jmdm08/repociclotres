window.onload = function () {
    eventButton();
}


function eventButton() {

    document.getElementById("cargarImagen").addEventListener("click", cargaImagen);
    document.getElementById("cargarImagenDos").addEventListener("click", cargaImagen);
    document.getElementById("cargarHtml").addEventListener("click", cargaHtml);
    //profe que pena esta lento el internet


}


function cargaImagen(evento) {
    fetch("media/img/"+evento.target.value)
        .then(function(respuesta){
            return respuesta.blob();
        })
            .then(function(imgBlob){
                let rutaVirtualImagen = URL.createObjectURL(imgBlob);
                document.getElementById("imagen").src = rutaVirtualImagen;
                if(evento.target.id === "cargarImagen"){
                    document.getElementById("cargarImagenDos").click();
                }else{
                    document.getElementById("cargarImagen").click();
                }
                
            })
        .catch(function(error){
            console.log(error);
        });
}

function cargaHtml(evento) {
    fetch("calculadora.html")
        .then(function(respuesta){
           return respuesta.text(); 
        })
            .then(function(html){
                document.getElementById("divhtml").innerHTML = html;
            })
        .catch(function(error){
            console.log(error);
        })
}

//gracias profe

