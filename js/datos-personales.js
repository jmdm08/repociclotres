window.onload = function(){
    iniciarEventos();
    cargarDatosStorage();
}

function iniciarEventos(){
    document.getElementById("btnGuardar").addEventListener("click", guardarDatos);
}

function cargarDatosStorage(){
    // CARGAR EL STORAGE.
    let datosStorage = localStorage.getItem("datosPersonales");

    // VALIDAR SI EXISTEN DATOS EN EL STORAGE
    if(datosStorage){
        datosStorage = JSON.parse(datosStorage);
    }
    else{
        datosStorage = [];
    }

    datosStorage.forEach( datos =>  {
        adicionarFila(datos);
    });
}

function guardarDatos(event){
    let nombres = document.getElementById("nombres").value;
    let apellidos = document.getElementById("apellidos").value;
    let edad = document.getElementById("edad").value;
    let fechaNacimiento = document.getElementById("fechaNacimiento").value;
    let estadoCivil = document.querySelector("#estadoCivil option:checked").value;
    let telefono = document.getElementById("telefono").value;
    let direccion = document.getElementById("direccion").value;

    let datosPersonales = {
        "nombres": nombres,
        "apellidos": apellidos,
        "edad": edad,
        "telefono": telefono,
        "fechaNacimiento": fechaNacimiento,
        "estadoCivil": estadoCivil,
        "direccion": direccion
    }

    // TRAEMOS LA INFORMACIÓN DEL STORAGE -> ES UN STRING.
    let datosStorage = localStorage.getItem("datosPersonales");

    // SE PREGUNTA SI HAY DATOS EN ESA CADENA O ES NULL
    if(datosStorage){
        // SI HAY DATOS, SE CONVIERTEN A ARRAY/OBJETO (JSON.PARSE)
        datosStorage = JSON.parse(datosStorage);
    }
    else{
        // SI NO HAY DATOS, SE CREA UN ARRAY.
        datosStorage = [];
    }

    // SE ADICIONA LOS NUEVOS DATOS AL ARRAY.
    datosStorage.push(datosPersonales);

    // SE GUARDAN EN EL STOROGE LOS DATOS CONVIERTIENDO UN ARRAY/OBJETO A STRING (JSON.STRINGIFY)
    localStorage.setItem("datosPersonales", JSON.stringify(datosStorage) );

    adicionarFila(datosPersonales);
    
    document.getElementById("btnReset").click();
}

function adicionarFila(datosPersonales){
    let tabla = document.getElementById("datosTabla");

    let html = "";
    html += "<tr>";
    html += "   <td>" + datosPersonales.nombres + "</td>";
    html += "   <td>" + datosPersonales.apellidos + "</td>";
    html += "   <td>" + datosPersonales.edad + "</td>";
    html += "   <td>" + datosPersonales.fechaNacimiento + "</td>";
    html += "   <td>" + datosPersonales.estadoCivil + "</td>";
    html += "   <td>" + datosPersonales.telefono + "</td>";
    html += "   <td>" + datosPersonales.direccion + "</td>";
    html += "</tr>";

    tabla.tBodies[0].innerHTML += html;
}